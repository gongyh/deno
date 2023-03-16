import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

const { instance, module } = await WebAssembly.instantiateStreaming(
  fetch("https://wpt.live/wasm/incrementer.wasm"),
);

const increment = instance.exports.increment as (input: number) => number;
console.log(increment(41));

serve((_req) => {
  return new Response("Hello World! " + increment(41), {
    headers: { "content-type": "text/plain" },
  });
});
