import { Application, Router } from "https://deno.land/x/oak/mod.ts";

export const app = new Application();

type mapLocation = {
  endpoint: string;
  name: string;
  description: string;
  image?: string;
  connections: mapLocation[];
};

const corridor: mapLocation = {
  "endpoint": "corridor",
  "name": "corridor",
  "description": "....",
  "connections": [],
};

const house: mapLocation = {
  "endpoint": "old-house",
  "name": "Old House",
  "description": "....",
  "connections": [corridor],
};

const map: mapLocation = {
  "endpoint": "",
  "name": "The yard",
  "description": "....",
  "image":
    "https://tile.loc.gov/storage-services/service/pnp/habshaer/ca/ca1300/ca1345/photos/020399pv.jpg",
  "connections": [house],
};

const router = new Router();

const generateLocationEndpoint = (
  location: mapLocation,
  urlSlug: string,
) => {
  const connectionsLinks = location.connections.map((
    nextArea: mapLocation,
  ) => {
    /* if there's more than one backslash like /// in a url, replace it with a single one */
    const url = `/${urlSlug}/${nextArea.endpoint}`.replace(/\/+/, "/");

    const link = {
      "href": url,
      "type": "GET",
    };

    return link;
  });

  router.get(`/${location.endpoint}`, async (context) => {
    if (
      context.request.accepts()?.some((el) => el.includes("image/*")) &&
      location.image
    ) {
      const resp = await fetch(location.image);
      context.response.type = "image/jpeg";
      context.response.body = resp.body;
    } else {
      context.response.type = "application/json";
      context.response.body = {
        "name": location.name,
        "links": connectionsLinks,
      };
    }
  });
};

const buildApi = (location: mapLocation) => {
  generateLocationEndpoint(location, location.endpoint);
  if (location.connections) {
    location.connections.forEach((nextArea: mapLocation) => {
      generateLocationEndpoint(nextArea, nextArea.endpoint);
    });
  }
};

buildApi(map);

app.use(router.routes());
app.use(router.allowedMethods());
