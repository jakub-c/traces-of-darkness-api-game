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

import { app } from "./app.ts";

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
      // .set("Accept", "application/json")
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
        ) => el.href === "" || el.href === "/");
        assert(rootLinkExistsInHATEOAS === false);
      });
  });

  it("returns image when requested via content-type", async () => {
    await request.get(endpoint)
      .set("Accept", "image/*")
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
    const expectedHouse = { "href": "/old-house/corridor", "type": "GET" };
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
        ) => el.href === "" || el.href === "/");
        assert(rootLinkExistsInHATEOAS);
      });
  });
});

describe("/corridor enpoint", () => {
  it("returns 200 reponse", async () => {
    await request.get("/corridor")
      .expect(200);
  });
});
