import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    assets: defineTable({
    ticker: v.string(),
    quantity: v.number(),
    buyPrice: v.number(),
    createdAt: v.number(),
  }),
});
