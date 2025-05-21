import { render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { HTMXDocument } from "@/app/HTMXDocument";
import { defineApp } from "rwsdk/worker";
import Home from "./app/Home";

export default defineApp([
  render(Document, [
    route("/", () => {
      return new Response("Hello, world!");
    }),
  ]),
  render(HTMXDocument, [
    route("/htmx", Home),
    route("/fragment", ({request}) => {
      const url = new URL(request.url);
      const component = url.searchParams.get("component");
      return new Response(`<div id="react-root" data-component="${component}"></div>`);
    }),
    route("/server-time", async () => {
      const time = new Date().toISOString();
      return new Response(time);
    }),
  ]),
]);