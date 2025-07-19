# PortfolioPal

PortfolioPal is a full-stack monorepo investment tracker app with AI features. It allows users to track their stock and crypto investments, view insights, and receive AI-generated investment advice. It supports both web and native platforms.

## Features

- Add and track assets (stocks and cryptocurrencies)
- View portfolio value, gain/loss, and distribution
- AI-generated investment suggestions (via OpenRouter)
- User authentication using Clerk (Google/Apple login)
- Cross-platform: Web (Next.js) + Mobile (React Native via Expo)
- Shared backend with Convex (database and server functions)

---

## Tech Stack

- Monorepo management: Turborepo
- Web: Next.js 15
- Mobile: React Native (Expo)
- Backend: Convex (serverless functions and database)
- Authentication: Clerk
- AI Integration: OpenRouter (free access to LLaMA3, GPT-3.5, etc.)
- Linting & formatting: Biome

---

## Getting Started

### 1. Install Dependencies

```bash
npm install -g pnpm
pnpm install
```

### 2. Setup Environment Variables

Create `.env.local` in both `apps/native` and `apps/web`, using `.example.env` as reference:

```env
EXPO_PUBLIC_CONVEX_URL=your_convex_url
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
EXPO_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key
```

Get keys from:

- [OpenRouter API Key](https://openrouter.ai/keys)
- [Clerk Dashboard](https://dashboard.clerk.com/)
- [Convex CLI](https://docs.convex.dev/cli)

---

### 3. Run the Apps

Run both native and web apps:

```bash
npm run dev
```

Run only the native app:

```bash
cd apps/native
npx expo start
```

Run only the web app:

```bash
cd apps/web
pnpm dev
```

---

## Project Structure

```
.
├── apps/
│   ├── native/             # React Native app (Expo)
│   └── web/                # Web app (Next.js)
├── packages/
│   └── backend/            # Convex functions and DB schema
├── shared/
│   └── utils/              # OpenRouter AI functions
├── .env.local              # Root environment config
├── turbo.json              # Turborepo configuration
└── README.md
```

---

## Biome Linting & Formatting

```bash
pnpm run lint        # Check issues
pnpm run lint:fix    # Fix issues
pnpm run format:biome
```

Configuration is defined in `biome.json`.

---

## Deployment

To deploy backend and frontend together:

```bash
cd packages/backend
npx convex deploy --cmd 'cd ../../apps/web && turbo run build' --cmd-url-env-var-name NEXT_PUBLIC_CONVEX_URL
```

You can also deploy `apps/web` to Vercel. See `vercel.json` in that directory.

---

## AI Integration Example (OpenRouter)

```ts
// utils/openrouter.ts

export async function getAIInvestmentAdvice(): Promise<string> {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [
        {
          role: "user",
          content: "Give me one piece of investment advice.",
        },
      ],
    }),
  });

  const result = await response.json();
  return result.choices?.[0]?.message?.content || "No advice received.";
}
```

---

## License

MIT © 2025 manrongmao
