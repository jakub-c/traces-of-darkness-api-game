import { assertObjectMatch } from "https://deno.land/std@0.144.0/testing/asserts.ts";
import { beforeEach, it } from "https://deno.land/std@0.144.0/testing/bdd.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";

import { app } from "./app.ts";

let request: any;
beforeEach(async () => {
  request = await superoak(app);
});

it("/ should point player to the yard", async () => {
  const expected = { "name": "The yard" };

  await request.get("/").expect(200).then((response: any) => {
    assertObjectMatch(response.body, expected);
  });
});
