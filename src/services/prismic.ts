import Prismic from "@prismicio/client";

export function getPrismicClient(req = {}) {
  const prismic = Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    ...req,
    accessToken:process.env.PRISMIC_ACCESS_TOKEN
  });
  return prismic
}
