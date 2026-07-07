import { test } from "node:test";
import assert from "node:assert";
import http from "node:http";
import app from "../server.js";

function makeRequest(server, path, method = "GET", body) {
  return new Promise((resolve, reject) => {
    const { port } = server.address();
    const data = body ? JSON.stringify(body) : null;
    const req = http.request(
      {
        hostname: "localhost",
        port,
        path,
        method,
        headers: data ? { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) } : {},
      },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => (raw += chunk));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, body: raw ? JSON.parse(raw) : null });
          } catch {
            resolve({ status: res.statusCode, body: raw });
          }
        });
      }
    );
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

test("GET /api/schemes returns a list of schemes", async () => {
  const server = app.listen(0);
  const res = await makeRequest(server, "/api/schemes");
  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(res.body));
  assert.ok(res.body.length > 0);
  server.close();
});

test("GET /api/schemes/:id returns 404 for unknown scheme", async () => {
  const server = app.listen(0);
  const res = await makeRequest(server, "/api/schemes/does-not-exist");
  assert.strictEqual(res.status, 404);
  server.close();
});

test("POST /api/complaints rejects empty description", async () => {
  const server = app.listen(0);
  const res = await makeRequest(server, "/api/complaints", "POST", {
    name: "Test User",
    category: "Road Damage",
    location: "Test Area",
    description: "",
  });
  assert.strictEqual(res.status, 400);
  server.close();
});

test("POST /api/complaints creates a complaint with valid data", async () => {
  const server = app.listen(0);
  const res = await makeRequest(server, "/api/complaints", "POST", {
    name: "Test User",
    category: "Road Damage",
    location: "Test Area",
    description: "There is a large pothole on the main road.",
  });
  assert.strictEqual(res.status, 200);
  assert.ok(res.body.id.startsWith("CIV"));
  assert.strictEqual(res.body.status, "Registered");
  server.close();
});

test("POST /api/chat rejects empty message", async () => {
  const server = app.listen(0);
  const res = await makeRequest(server, "/api/chat", "POST", { message: "" });
  assert.strictEqual(res.status, 400);
  server.close();
});