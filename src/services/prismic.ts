import * as prismic from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "../../sm.json";

// Update the Link Resolver to match your project's route structure
export function linkResolver(doc) {
  switch (doc.type) {
    case "homepage":
      return "/";
    case "posts":
      return `/${doc.uid}`;
    default:
      return null;
  }
}

// This factory function allows smooth preview setup
// export const repositoryName = prismic.getRepositoryName(
//   process.env.PRISMIC_ENDPOINT
// );

// This factory function allows smooth preview setup
export function getPrismicClient(config?: any) {
  const client = prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    ...config,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  enableAutoPreviews({
    client,
    previewData: config?.previewData,
    req: config?.req,
  });

  return client;
}

/* import Prismic from "@prismicio/client";

export function getPrismicClient(req = {}) {
  const prismic = Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    ...req,
    accessToken:process.env.PRISMIC_ACCESS_TOKEN
  });
  return prismic
} */
