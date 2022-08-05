import { Application, Router } from "https://deno.land/x/oak/mod.ts";

export const app = new Application();

type mapLocation = {
  endpoint: string;
  name: string;
  description: string;
  connections: mapLocationContainer[];
};

type mapLocationContainer = {
  location: mapLocation;
};

const corridor: mapLocationContainer = {
  "location": {
    "endpoint": "corridor",
    "name": "corridor",
    "description": "....",
    "connections": [],
  },
};

const house: mapLocationContainer = {
  "location": {
    "endpoint": "/old-house",
    "name": "Old House",
    "description": "....",
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
  location: mapLocation,
  urlSlug: string,
) => {
  const connectionsLinks = location.connections.map((
    nextArea: mapLocationContainer,
  ) => ({
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

const buildApi = (location: mapLocation) => {
  generateLocationEndpoint(location, location.endpoint);
  if (location.connections) {
    location.connections.forEach((nextArea: mapLocationContainer) => {
      generateLocationEndpoint(nextArea.location, nextArea.location.endpoint);
    });
  }
};

buildApi(map.location);

app.use(router.routes());
app.use(router.allowedMethods());
