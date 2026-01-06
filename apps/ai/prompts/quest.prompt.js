export const questPrompt = (goalTitle) => `
You are a system that generates structured learning quests.

RULES (VERY IMPORTANT):
- Output ONLY valid JSON
- No explanations
- No markdown
- No extra text

GOAL:
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

IMPORTANT:
- Every level MUST have at least 3 tasks
- Tasks must be physical, actionable (e.g. workouts, reps, habits)
- Do NOT return empty arrays

`;
