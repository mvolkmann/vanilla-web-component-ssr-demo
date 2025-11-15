import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { ssr as helloWorldSSR } from "./public/hello-world-html.js";
import { ssr as radioGroupSSR } from "./public/radio-group-html.js";

const app = new Hono();

app.use("/*", serveStatic({ root: "./public" }));

app.get("/hello-world", (c) => {
  const name = c.req.query("name");
  return c.html(`
    <div>The following content was server-side rendered:</div>
    ${helloWorldSSR()}
    ${helloWorldSSR(name)}
  `);
});

app.get("/radio-group", (c) => {
  const labels = c.req.query("labels");
  const name = c.req.query("name");
  const value = c.req.query("value");
  const values = c.req.query("values");
  return c.html(`
    ${radioGroupSSR({ labels, name, value, values })}
  `);
});

serve(app, (info) => {
  console.log(`listing on port ${info.port}`);
});
