import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { mapLocation, yard } from "./map.ts";

export const app = new Application();

const router = new Router();

function generateLocationEndpoint(location: mapLocation): void {
  const HATEOASlinks = location.connections.map((nextArea: mapLocation) => {
    /* if there's more than one backslash like /// in a url,
    replace it with a single one */
    const url = `/${location.endpoint}/${nextArea.endpoint}`.replace(
      /\/+/,
      "/",
    );

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
        "description": location.description,
        "links": HATEOASlinks,
      };
    }
  });

  return location.connections.forEach((connection: mapLocation) =>
    generateLocationEndpoint(connection)
  );
}

generateLocationEndpoint(yard);

app.use(router.routes());
app.use(router.allowedMethods());
