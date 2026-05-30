import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  decks: defineTable({
    ownerUserId: v.string(),
    isPublic: v.boolean(),
    isShuffled: v.boolean(),
    numQuizQuestion: v.number(),
  }).index("by_owner", ["ownerUserId"]),
  questions: defineTable({
    deckId: v.id("decks"),
    img: v.string(),
    question: v.string(),
    timeLimit: v.number(),
    answer: v.number(),
    options: v.array(v.string()),
  }).index("by_deck", ["deckId"]),
  playRecords: defineTable({
    userId: v.id("users"),
    deckId: v.id("decks"),
    numQuestions: v.number(),
    numCorrects: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_deck", ["deckId"]),
});
