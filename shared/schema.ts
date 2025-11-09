import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const plasticTypes = {
  1: { code: 1, name: "PET", fullName: "Polyethylene Terephthalate", recyclable: true },
  2: { code: 2, name: "HDPE", fullName: "High-Density Polyethylene", recyclable: true },
  3: { code: 3, name: "PVC", fullName: "Polyvinyl Chloride", recyclable: false },
  4: { code: 4, name: "LDPE", fullName: "Low-Density Polyethylene", recyclable: true },
  5: { code: 5, name: "PP", fullName: "Polypropylene", recyclable: true },
  6: { code: 6, name: "PS", fullName: "Polystyrene", recyclable: false },
  7: { code: 7, name: "Other", fullName: "Other Plastics", recyclable: false },
} as const;

export type PlasticType = typeof plasticTypes[keyof typeof plasticTypes];
export type ResinCode = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface DetectionResult {
  resinCode: ResinCode;
  confidence: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  timestamp: number;
}
