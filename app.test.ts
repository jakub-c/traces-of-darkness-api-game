import { assertObjectMatch } from "https://deno.land/std@0.144.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";

import { app } from "./app.ts";

Deno.test("/ should point player to the yard", async () => {
  const expected = { "name": "The yard" };

  const request = await superoak(app);

  await request.get("/").expect(200).then((rsp) => {
    assertObjectMatch(rsp.body, expected);
  });
});
