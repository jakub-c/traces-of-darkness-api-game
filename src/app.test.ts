import { assertObjectMatch } from "https://deno.land/std@0.144.0/testing/asserts.ts";
import { beforeEach, it } from "https://deno.land/std@0.144.0/testing/bdd.ts";
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

it("/ should point player to the yard", async () => {
  const expected = { "name": "The yard" };

  await request.get("/").expect(200).then((response: IResponse) => {
    assertObjectMatch(response.body, expected);
  });
});

it("/house should return a link to the corridor", async () => {
  const expected = {
    "links": [{ "href": "/old-house/corridor", "type": "GET" }],
  };

  await request.get("/old-house").expect(200).then((response: IResponse) => {
    assertObjectMatch(response.body, expected);
  });
});
