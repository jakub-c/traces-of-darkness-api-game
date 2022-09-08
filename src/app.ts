import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { mapLocation, yard } from "./map.ts";

export const app = new Application();

const router = new Router();

function findParentLocationEndpoint(
  currentLocation: mapLocation,
  mapToLookThrough: mapLocation,
) {
  const parentFound = mapToLookThrough.connections.some((el) =>
    el.name === currentLocation.name
  );
  if (parentFound && mapToLookThrough.endpoint === "") return "/";
  else if (parentFound) return mapToLookThrough.endpoint;
  return "null";
}

function generateLocationEndpoint(location: mapLocation, slug: string): void {
  function removeRepeatedSlashes(url: string) {
    /* if there's more than one backslash like /// in a url,
    replace it with a single one */
    return url.replace(/\/+/, "/");
  }

  const HATEOASlinks = location.connections.map((nextArea: mapLocation) => {
    /* if there's more than one backslash like /// in a url,
    replace it with a single one */
    const url = removeRepeatedSlashes(
      `/${location.endpoint}/${nextArea.endpoint}`,
    );

    const link = {
      "href": url,
      "type": "GET",
    };

    return link;
  });

  const previousLocationEndpoint = findParentLocationEndpoint(location, yard);
  if (previousLocationEndpoint !== "null") {
    HATEOASlinks.push({
      "href": previousLocationEndpoint,
      "type": "GET",
    });
  }

  const currentUrlEnpoint = removeRepeatedSlashes(
    `${slug}/${location.endpoint}`,
  );

  router.get(currentUrlEnpoint, async (context) => {
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
    generateLocationEndpoint(
      connection,
      currentUrlEnpoint,
    )
  );
}

generateLocationEndpoint(yard, "");

app.use(router.routes());
app.use(router.allowedMethods());
