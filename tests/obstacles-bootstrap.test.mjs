import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  LEGACY_OBSTACLES_PATH,
  createLegacyObstaclesFrame,
  mountLegacyObstaclesFrame,
} from "../static/client/obstacles/legacy-frame.mjs";

const createFakeDocument = () => {
  const htmlStyle = {};
  const bodyStyle = {};
  const body = {
    style: bodyStyle,
    children: [],
    replaceChildren(...children) {
      this.children = children;
    },
  };

  return {
    documentElement: { style: htmlStyle },
    body,
    createElement(tagName) {
      return {
        tagName,
        style: {},
        attributes: {},
        setAttribute(name, value) {
          this.attributes[name] = value;
        },
      };
    },
  };
};

test("createLegacyObstaclesFrame builds a full-page iframe", () => {
  const fakeDocument = createFakeDocument();
  const frame = createLegacyObstaclesFrame(fakeDocument);

  assert.equal(frame.tagName, "iframe");
  assert.equal(frame.src, LEGACY_OBSTACLES_PATH);
  assert.equal(frame.title, "Legacy obstacles simulation");
  assert.equal(frame.attributes.loading, "eager");
  assert.equal(frame.style.border, "0");
  assert.equal(frame.style.width, "100vw");
  assert.equal(frame.style.height, "100vh");
});

test("mountLegacyObstaclesFrame replaces the body with the legacy iframe", () => {
  const fakeDocument = createFakeDocument();
  const frame = mountLegacyObstaclesFrame(fakeDocument);

  assert.equal(fakeDocument.documentElement.style.height, "100%");
  assert.equal(fakeDocument.body.style.margin, "0");
  assert.equal(fakeDocument.body.style.height, "100vh");
  assert.deepEqual(fakeDocument.body.children, [ frame ]);
});

test("main entrypoint mounts the legacy obstacles frame", async () => {
  const source = await readFile(new URL("../static/client/obstacles/main.js", import.meta.url), "utf8");

  assert.match(source, /mountLegacyObstaclesFrame/);
  assert.match(source, /mountLegacyObstaclesFrame\(document\)/);
});
