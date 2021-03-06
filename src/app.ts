import { Application, Router } from "https://deno.land/x/oak/mod.ts";

export const app = new Application();

const router = new Router();
router.get("/", (context) => {
  context.response.type = "application/json";
  context.response.body = {
    "name": "The yard",
    "description":
      "You are standing in the yard of an old house located on the outsikrts of the city of Shelboune somewhere in New England. It's autumn o 1923.",
    "links": [{ "href": "/old-house", "type": "GET" }],
  };
});

router.get("/old-house", (context) => {
  context.response.type = "application/json";
  context.response.body = {
    "name": "The old house",
    "description": "The house looks abandoned",
    "links": [{ "href": "/old-house/corridor", "type": "GET" }],
  };
});

app.use(router.routes());
app.use(router.allowedMethods());
