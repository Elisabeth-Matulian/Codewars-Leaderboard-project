
import test from "node:test";
import assert from "node:assert";
import { getUniqLanguages } from "./additionals.mjs";

test("getUniqLanguages returns unique languages from multiple users", () => {
  const users = [
    { ranks: { languages: { python: { score: 10 } } } },
    { ranks: { languages: { python: { score: 20 }, javascript: { score: 5 } } } }
  ];

  const result = getUniqLanguages(users);

  assert.deepEqual(result, ["python", "javascript"]);
});

test("getUniqLanguages returns single language when all users have same language", () => {
  const users = [
    { ranks: { languages: { python: { score: 10 } } } },
    { ranks: { languages: { python: { score: 20 } } } }
  ];

  const result = getUniqLanguages(users);

  assert.deepEqual(result, ["python"]);
});