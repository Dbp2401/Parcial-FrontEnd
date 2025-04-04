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
    const datos = url.searchParams.get("phone");

    try {
      const resp = await Axios.get(
        `https://api.api-ninjas.com/v1/validatephone?number=${datos}`,
        {
          headers: {
            "X-Api-Key": api_key,
          },
        }
      );
      return ctx.render(resp.data);
    } catch (_e) {
      return new Response("Error con la API");
    }
  },
};

const Page = (props: PageProps) => {
  return (
    <div class="content">
      <div>{props.data.format_international}</div>
      <a href={`/country?name=${props.data.country}`}>{props.data.country}</a>
    </div>
  );
};
export default Page;
