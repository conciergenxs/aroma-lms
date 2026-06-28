import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { streamText, type ModelMessage } from "ai";

type ChatRequestBody = {
  messages?: unknown;
  product?: string;
};

type IncomingMessage = {
  role?: unknown;
  text?: unknown;
  content?: unknown;
};

function normalizeMessages(messages: unknown): ModelMessage[] {
  if (!Array.isArray(messages)) return [];

  return (messages as IncomingMessage[])
    .map((message) => {
      const role = message.role === "assistant" ? "assistant" : message.role === "system" ? "system" : "user";
      const content = typeof message.text === "string" ? message.text : typeof message.content === "string" ? message.content : "";
      return { role, content } as ModelMessage;
    })
    .filter((message) => typeof message.content === "string" && message.content.trim().length > 0);
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages, product } = (await request.json()) as ChatRequestBody;
        const normalizedMessages = normalizeMessages(messages);
        if (normalizedMessages.length === 0) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system: [
            "You are Aroma Abadi BA-Helper, a concise beauty advisor for Laura Mercier brand ambassadors.",
            "Answer in Indonesian unless the user asks otherwise.",
            "Be practical, friendly, and product-training focused. Use short paragraphs and bullets when useful.",
            product ? `Current product context: ${product}.` : "",
          ].filter(Boolean).join("\n"),
          messages: normalizedMessages,
        });

        return result.toTextStreamResponse();
      },
    },
  },
});