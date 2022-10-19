import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { mapLocation, yard } from "./map.ts";

export const app = new Application();

const router = new Router();

function generateLocationEndpoint(
  location: mapLocation,
  slug: string[],
): void {
  const currentUrlEnpoint = [...slug, location.endpoint].join("/");

  const HATEOASlinks = location.connections.map((nextArea: mapLocation) => {
    const nextAreaUrl = `${currentUrlEnpoint}/${nextArea.endpoint}`;

    const link = {
      "href": nextAreaUrl,
      "type": "GET",
    };

    return link;
  });

  if (slug.length > 0) {
    HATEOASlinks.push({
      "href": `${slug.join("/") || "/"}`,
      "type": "GET",
    });
  }

  router.get(currentUrlEnpoint, async (context) => {
    if (
      context.request.accepts()?.some((el) => el.includes("image/jpeg")) &&
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

  router.options(currentUrlEnpoint, (context) => {
    const allowedRequestHeaders = ["application/json"];
    if (location.image) allowedRequestHeaders.push("image/jpeg");
    context.response.body = allowedRequestHeaders.join(",");
  });

  return location.connections.forEach((connection: mapLocation) =>
    generateLocationEndpoint(
      connection,
      [...slug, location.endpoint],
    )
  );
}

generateLocationEndpoint(yard, []);

app.use(router.routes());
app.use(router.allowedMethods());
