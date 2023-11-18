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

  if (location.input) {
    HATEOASlinks.push({
      "href": currentUrlEnpoint,
      "type": "POST",
    });
  }

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
    const acceptedContentTypes = ["application/json"];
    if (location.image) acceptedContentTypes.push("image/jpeg");
    context.response.body = `Accepted Content-Type values: ${acceptedContentTypes.join(",")}`

    const allowRequestHeaders = ["GET"];
    if (location.input) allowRequestHeaders.push("POST");
    context.response.headers.set("Allow", allowRequestHeaders.join(","));

    context.response.status = 200;

  });

  if (location.input && location.input_response) {
    router.put(currentUrlEnpoint, async (context) => {
      const reqBody = await context.request.body().value;
      if (reqBody === location.input) {
        context.response.body = location.input_response;
      } else {
        context.response.status = 403;
        context.response.type = "application/json";
        context.response.body = {
          "name": location.name,
          "description": "Your action doesn't produce any result.",
          "links": HATEOASlinks,
        };
      }
    });
  }

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
