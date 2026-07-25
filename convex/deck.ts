import { convexToJson, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { defineSchema, paginationOptsValidator } from "convex/server";
import schema from "./schema";

export const createDeck = mutation({
  args: {
    title: v.string(),
    isPublic: v.boolean(),
    isShuffled: v.boolean(),
    numQuizQuestion: v.number(),
    questions: v.array(
      v.object({
        img: v.string(),
        question: v.string(),
        timeLimit: v.number(),
        answer: v.number(),
        options: v.array(v.string()),
      }),
    ),
  },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("unauthorized");

    const { isPublic, isShuffled, numQuizQuestion, title, questions } = args;

    let deckId = await ctx.db.insert("decks", {
      ownerUserId: userId,
      isPublic,
      isShuffled,
      numQuizQuestion,
      title,
    });

    for (let question of questions) {
      await ctx.db.insert("questions", { ...question, deckId });
    }
  },
});

export const getDecks = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, { paginationOpts }) => {
    return await ctx.db.query("decks").order("desc").paginate(paginationOpts);
  },
});

export const getDeck = query({
  args: {
    deckId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("questions")
      .withIndex("by_deck", (q) => q.eq("deckId", args.deckId as v.id("decks"))).collect()
  },
});
