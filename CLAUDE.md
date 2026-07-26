As the website is updated, make sure to update this document accordingly

# Site Overview

A quizlet clone with the following twist:

- A group based experience where you can compete with your friends, do quizzes together, and see who is the best at a given topic.
- On top of that, we do want to inherit only the core functionality of Quizlet, so you can create decks, add questions, and do quizzes on your own as well.

# Tech Stack

- Convex for backend and database and image uploading
- React/Vite for frontend

# Pages

Public (unauthenticated):

- `/` — Landing page (pitch + sign in/up entry point)
- `/about` — About page
- `/signin` — Sign in / sign up

Authenticated, under `/app`:

- `/app` — **Dashboard**: your decks, your groups, and recent activity at a glance
- `/app/manage-decks` — **Deck Management**: list of your decks
  - `/app/manage-decks/new` — Create a new deck
  - `/app/manage-decks/:deckId` — Edit a deck (manage its questions)
- `/app/play` — **Quiz / Play**: discover decks to play (yours + public)
  - `/app/play/:deckId` — Solo quiz for a deck
  - `/app/play/:deckId/results` — Solo quiz results
- `/app/groups` — **Group page**: list of your groups
  - `/app/groups/new` — Create a group
  - `/app/groups/:groupId` — Group home: members, shared decks, leaderboard
  - `/app/groups/:groupId/quiz/:deckId` — Group competitive quiz session
  - `/app/groups/:groupId/quiz/:deckId/results` — Group quiz results / leaderboard
- `/app/profile` — Profile & stats, sign out

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
