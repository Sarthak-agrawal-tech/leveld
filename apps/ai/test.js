import { generateQuest } from "./index.js";

(async () => {
  try {
    const quest = await generateQuest("Become a full stack developer");
    console.log(JSON.stringify(quest, null, 2));
  } catch (err) {
    console.error("AI TEST FAILED:", err.message);
  }
})();
