export const questPrompt = (goalTitle) => `
You are a JSON-only generator.

STRICT RULES:
- Output ONLY valid JSON
- No explanations
- No markdown
- No extra text

Generate a structured learning quest for the goal:
"${goalTitle}"

FORMAT:
{
  "units": [
    {
      "title": "Unit name",
      "description": "Short description",
      "levels": [
        {
          "title": "Level name",
          "tasks": [
            { "title": "Task description", "xp": 20 }
          ]
        }
      ]
    }
  ]
}

CONSTRAINTS:
- 3 to 5 units
- 3 to 5 levels per unit
- 3 to 6 tasks per level
- XP between 10 and 100
`;
