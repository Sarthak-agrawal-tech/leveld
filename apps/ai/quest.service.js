import fetch from "node-fetch";
import { questPrompt } from "./prompts/quest.prompt.js";
import { QuestSchema } from "./validators/quest.schema.js";

export const generateQuest = async (goalTitle) => {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistral",
      prompt: questPrompt(goalTitle),
      stream: false,
    }),
  });

  const data = await response.json();

  const raw = data.response;

  const parsed = JSON.parse(raw);
  return QuestSchema.parse(parsed);
};
