import { questPrompt } from "./prompts/quest.prompt.js";
import { QuestSchema } from "./validator/quest.schema.js";

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

  if (!response.ok) {
    throw new Error("Ollama inference failed");
  }

  const data = await response.json();
  const raw = data.response;

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Ollama returned invalid JSON");
  }

  return QuestSchema.parse(parsed);
};
