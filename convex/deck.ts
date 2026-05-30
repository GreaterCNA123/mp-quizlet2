import { convexToJson, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { defineSchema, paginationOptsValidator } from "convex/server";
import schema from "./schema";

export const createQuestion = mutation({
  args: schema.tables.decks.validator,
  async handler(ctx, args) {
    await ctx.db.insert("decks", args);
  },
});
