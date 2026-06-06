import { convexToJson, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { defineSchema, paginationOptsValidator } from "convex/server";
import schema from "./schema";

export const createDeck = mutation({
  args: schema.tables.decks.validator,
  async handler(ctx, args) {
    await ctx.db.insert("decks", args);
  },
});
export const createQuestion = mutation({
  args: schema.tables.questions.validator,
  async handler(ctx, args) {
    await ctx.db.insert("questions", args);
  },
});
