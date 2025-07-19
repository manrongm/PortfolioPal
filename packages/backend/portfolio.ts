import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const schema = {
  portfolios: {
    userId: v.string(),
    assets: v.array(
      v.object({
        ticker: v.string(),
        quantity: v.number(),
        buyPrice: v.number(),
      })
    ),
    createdAt: v.int64(),
  },
};

// 添加资产
export const addAsset = mutation({
  args: {
    userId: v.string(),
    ticker: v.string(),
    quantity: v.number(),
    buyPrice: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("portfolios").filter((q) => q.eq(q.field("userId"), args.userId)).first();
    if (existing) {
      await ctx.db.patch(existing._id, {
        assets: [...existing.assets, {
          ticker: args.ticker,
          quantity: args.quantity,
          buyPrice: args.buyPrice,
        }],
      });
    } else {
      await ctx.db.insert("portfolios", {
        userId: args.userId,
        assets: [{
          ticker: args.ticker,
          quantity: args.quantity,
          buyPrice: args.buyPrice,
        }],
        createdAt: Date.now(),
      });
    }
  },
});
