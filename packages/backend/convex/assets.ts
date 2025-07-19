import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const addAsset = mutation({
  args: {
    ticker: v.string(),
    buyPrice: v.number(),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('assets', {
      ticker: args.ticker,
      buyPrice: args.buyPrice,
      quantity: args.quantity,
      createdAt: Date.now(),
    });
  },
});

export const removeAsset = mutation({
  args: { id: v.id('assets') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const listAssets = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('assets').collect();
  },
});

let cachedAdvice = "Diversify your portfolio to reduce risk across sectors.";

export const getAdvice = query({
  args: {},
  handler: async () => {
    return { text: cachedAdvice };
  },
});

export const regenerateAdvice = mutation({
  args: {},
  handler: async () => {
    // 随机选择一个建议（模拟 AI）
    const samples = [
      "Consider dollar-cost averaging into high-quality ETFs.",
      "Rebalance your crypto exposure if it exceeds 20% of total value.",
      "Review your positions quarterly to avoid emotional trading.",
      "Keep some cash ready for buying dips in volatile markets.",
    ];
    cachedAdvice = samples[Math.floor(Math.random() * samples.length)];
    return { ok: true };
  },
});

