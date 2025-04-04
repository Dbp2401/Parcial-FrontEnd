import { Handlers, PageProps } from "$fresh/server.ts";
import Axios from "axios";

type Data = {
  phone: string;
  country: string;
};

export const handler: Handlers<Data> = {
  GET: async (_req, ctx) => {
    const api_key = Deno.env.get("API_KEY");
    if (!api_key) {
      return new Response("Falta la Api key");
    }
    const url = new URL(_req.url);
    const datos = url.searchParams.get("name");
    try {
      const resp = await Axios.get(
        `https://api.api-ninjas.com/v1/country?name=${datos}`,
        {
          headers: {
            "X-Api-Key": api_key,
          },
        }
      );
      return ctx.render(resp.data[0]);
    } catch (_e) {
      return new Response("Error con la API");
    }
  },
};

export default function Country(props: PageProps) {
  return (
    <div class="content">
      <p>Capital: {props.data.capital}</p>
      <a href={`/country?name=${props.data.name}`}>Ciudad: {props.data.name}</a>
    </div>
  );
}
