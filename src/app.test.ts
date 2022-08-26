import {
  assert,
  AssertionError,
  assertObjectMatch,
  assertStringIncludes,
} from "https://deno.land/std@0.144.0/testing/asserts.ts";
import {
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.144.0/testing/bdd.ts";
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
  it("has the right 'links' response", async () => {
    const expected = {
      "name": "The yard",
      "links": [{ "href": "/old-house", "type": "GET" }],
    };

    await request.get("/")
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

  it("returns image when requested via content-type", async () => {
    await request.get("/")
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
  it("has the right 'links' response", async () => {
    const expected = {
      "name": "Old House",
      "links": [{ "href": "/old-house/corridor", "type": "GET" }],
    };

    await request.get("/old-house")
      .expect(200)
      .then((response: IResponse) => {
        assertObjectMatch(response.body, expected);
      });
  });
});

describe("/corridor enpoint", () => {
  it("returns 200 reponse", async () => {
    await request.get("/corridor")
      .expect(200);
  });
});
