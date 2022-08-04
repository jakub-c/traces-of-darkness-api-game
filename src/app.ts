import { Application, Router } from "https://deno.land/x/oak/mod.ts";

export const app = new Application();

const corridor = {
  "location": {
    "endpoint": "corridor",
    "name": "corridor",
  },
};

const house = {
  "location": {
    "endpoint": "/old-house",
    "name": "Old House",
    "connections": [corridor],
  },
};

const map = {
  "location": {
    "endpoint": "/",
    "name": "The yard",
    "description": "....",
    "connections": [house],
  },
};

const router = new Router();

const generateLocationEndpoint = (
  location: Record<string, any>,
  urlSlug: string,
) => {
  const connectionsLinks = location.connections.map((nextArea: any) => ({
    "href": `${urlSlug}/${nextArea.location.endpoint}`,
    "type": "GET",
  }));

  router.get(location.endpoint, (context) => {
    context.response.type = "application/json";
    context.response.body = {
      "name": location.name,
      "links": connectionsLinks,
    };
  });
};

const buildApi = (location: Record<string, any>) => {
  generateLocationEndpoint(location, location.endpoint);
  if (location.connections) {
    location.connections.forEach((nextArea: any) => {
      generateLocationEndpoint(nextArea.location, nextArea.location.endpoint);
    });
  }
};

buildApi(map.location);

app.use(router.routes());
app.use(router.allowedMethods());
