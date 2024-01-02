/**
 * article controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::article.article",
  ({ strapi }) => ({
    async healthcheck(ctx) {
      ctx.body = "OK"; // we could also send a JSON.
    },
  })
);
