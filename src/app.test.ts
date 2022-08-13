import {
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
  it("has a right 'links' response", async () => {
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
      });
  });

});

it("/old-house", async () => {
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
