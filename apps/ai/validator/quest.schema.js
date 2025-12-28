import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(3),
  xp: z.number().min(5).max(200),
});

export const LevelSchema = z.object({
  title: z.string().min(3),
  tasks: z.array(TaskSchema).min(1),
});

export const UnitSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  levels: z.array(LevelSchema).min(1),
});

export const QuestSchema = z.object({
  units: z.array(UnitSchema).min(1),
});
