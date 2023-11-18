import {
  assert,
  assertArrayIncludes,
  assertEquals,
  AssertionError,
  assertObjectMatch,
  assertStringIncludes,
} from "https://deno.land/std@0.153.0/testing/asserts.ts";
import {
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.153.0/testing/bdd.ts";
import {
  IResponse,
  SuperDeno,
  superoak,
} from "https://deno.land/x/superoak@4.7.0/mod.ts";

import { app } from "./../../app.ts";

let request: SuperDeno;

beforeEach(async () => {
  request = await superoak(app);
});

describe("root endpoint /", () => {
  const endpoint = "/";

  it("has the right 'links' response", async () => {
    const expected = {
      "name": "The yard",
      "links": [{ "href": "/old-house", "type": "GET" }],
    };

    await request.get(endpoint)
      .expect(200)
      .then((response: IResponse) => {
        assertStringIncludes(
          String(response.header["content-type"]),
          "application/json",
        );
        assertObjectMatch(response.body, expected);
        assert(response.body.description.length > 0);
      });
  });

  it("doesn't have HATEOAS root link, because it is a root endpoint itself", async () => {
    await request.get(endpoint)
      .expect(200)
      .then((response: IResponse) => {
        const rootLinkExistsInHATEOAS = response.body.links.some((
          el: { href: string },
        ) => el.href === "/");
        assert(rootLinkExistsInHATEOAS === false);
      });
  });

  it("responds to OPTIONS request with image/ and application/json", async () => {
    await request.options(endpoint)
      .expect(200)
      .then((response: IResponse) => {
        assertStringIncludes(
          String(response.header["allow"]),
          "image/",
        );
        assertStringIncludes(
          String(response.header["allow"]),
          "application/json",
        );
      });
  });

  it("returns image when requested via content-type", async () => {
    await request.get(endpoint)
      .set("Accept", "image/jpeg")
      .expect(200)
      .then((response: IResponse) => {
        if (response.text.length < 1000) {
          new AssertionError(
            "response text is shorter than 1000 characters, most likely it's not a binary",
          );
        }
        assertStringIncludes(
          String(response.header["content-type"]),
          "image/",
        );
      });
  });
});

describe("/old-house enpoint", () => {
  const endpoint = "/old-house";

  it("has Old house name property", async () => {
    await request.get(endpoint)
      .expect(200)
      .then((response: IResponse) => {
        assertEquals(response.body.name, "Old House");
      });
  });

  it("has the right 'links' response", async () => {
    const expectedHouse = { "href": "/old-house/hallway", "type": "GET" };
    const expectedYard = { "href": "/", "type": "GET" };

    await request.get(endpoint)
      .expect(200)
      .then((response: IResponse) => {
        assertArrayIncludes(response.body.links, [expectedHouse]);
        assertArrayIncludes(response.body.links, [expectedYard]);
      });
  });

  it("contains HATEOAS link to the previous root location", async () => {
    await request.get(endpoint)
      .expect(200)
      .then((response: IResponse) => {
        const rootLinkExistsInHATEOAS = response.body.links.some((
          el: { href: string },
        ) => el.href === "/");
        assert(rootLinkExistsInHATEOAS);
      });
  });
});

describe("/hallway enpoint", () => {
  const expectedDiningRoom = {
    "href": "/old-house/hallway/dining-room",
    "type": "GET",
  };
  const expectedOldHouse = { "href": "/old-house", "type": "GET" };

  it("has the right 'links' response", async () => {
    await request.get("/old-house/hallway")
      .expect(200)
      .then((response: IResponse) => {
        assertArrayIncludes(response.body.links, [expectedDiningRoom]);
        assertArrayIncludes(response.body.links, [expectedOldHouse]);
      });
  });
});

describe("/fireplace enpoint", () => {
  const endpoint = "/old-house/hallway/dining-room/fireplace";

  it("receives response when posting the right value", async () => {
    const expected = {
      "name": "The void",
    };

    await request.put(endpoint)
      .expect(200)
      .set("content-type", "text/plain")
      .send("7")
      .then((response: IResponse) => {
        assertObjectMatch(response.body, expected);
      });
  });

  it("receives 403 when posting wrong value", async () => {
    await request.put(endpoint)
      .send("1")
      .expect(403);
  });

  it("contains POST HATEOAS link", async () => {
    await request.get(endpoint)
      .then((response: IResponse) => {
        const postLinkExistsInHATEOAS = response.body.links.some((
          el: { type: string },
        ) => el.type === "POST");
        assert(postLinkExistsInHATEOAS);
      });
  });
});
