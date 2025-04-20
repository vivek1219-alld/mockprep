import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

// User Schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
  profileImage: true
});

// Exam Schema
export const examTypes = pgTable("exam_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  icon: text("icon").notNull()
});

export const insertExamTypeSchema = createInsertSchema(examTypes).pick({
  name: true,
  description: true,
  icon: true
});

// Subject Schema
export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  examTypeId: integer("exam_type_id").notNull()
});

export const insertSubjectSchema = createInsertSchema(subjects).pick({
  name: true,
  icon: true,
  examTypeId: true
});

// Topic Schema
export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  subjectId: integer("subject_id").notNull()
});

export const insertTopicSchema = createInsertSchema(topics).pick({
  name: true,
  subjectId: true
});

// Question Schema
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  options: jsonb("options").notNull(),
  correctOption: integer("correct_option").notNull(),
  explanation: text("explanation").notNull(),
  topicId: integer("topic_id").notNull(),
  difficultyLevel: integer("difficulty_level").notNull(),
  diagram: text("diagram")
});

export const insertQuestionSchema = createInsertSchema(questions).pick({
  text: true,
  options: true,
  correctOption: true,
  explanation: true,
  topicId: true,
  difficultyLevel: true,
  diagram: true
});

// Test Schema
export const tests = pgTable("tests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  examTypeId: integer("exam_type_id").notNull(),
  subjectId: integer("subject_id"),
  duration: integer("duration").notNull(), // in minutes
  totalQuestions: integer("total_questions").notNull(),
  questionIds: jsonb("question_ids").notNull()
});

export const insertTestSchema = createInsertSchema(tests).pick({
  name: true,
  description: true,
  examTypeId: true,
  subjectId: true,
  duration: true,
  totalQuestions: true,
  questionIds: true
});

// User Test Attempts
export const testAttempts = pgTable("test_attempts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  testId: integer("test_id").notNull(),
  startTime: timestamp("start_time").defaultNow(),
  endTime: timestamp("end_time"),
  isCompleted: boolean("is_completed").default(false),
  answers: jsonb("answers"), // Array of selected options
  score: integer("score"),
  markedForReview: jsonb("marked_for_review"), // Array of question indices marked for review
  timeSpent: integer("time_spent") // in seconds
});

export const insertTestAttemptSchema = createInsertSchema(testAttempts).pick({
  userId: true,
  testId: true,
  startTime: true,
  endTime: true,
  isCompleted: true,
  answers: true,
  score: true,
  markedForReview: true,
  timeSpent: true
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  testAttempts: many(testAttempts)
}));

export const examTypesRelations = relations(examTypes, ({ many }) => ({
  subjects: many(subjects),
  tests: many(tests)
}));

export const subjectsRelations = relations(subjects, ({ one, many }) => ({
  examType: one(examTypes, { fields: [subjects.examTypeId], references: [examTypes.id] }),
  topics: many(topics),
  tests: many(tests)
}));

export const topicsRelations = relations(topics, ({ one, many }) => ({
  subject: one(subjects, { fields: [topics.subjectId], references: [subjects.id] }),
  questions: many(questions)
}));

export const questionsRelations = relations(questions, ({ one }) => ({
  topic: one(topics, { fields: [questions.topicId], references: [topics.id] })
}));

export const testsRelations = relations(tests, ({ one, many }) => ({
  examType: one(examTypes, { fields: [tests.examTypeId], references: [examTypes.id] }),
  subject: one(subjects, { fields: [tests.subjectId], references: [subjects.id] }),
  testAttempts: many(testAttempts)
}));

export const testAttemptsRelations = relations(testAttempts, ({ one }) => ({
  user: one(users, { fields: [testAttempts.userId], references: [users.id] }),
  test: one(tests, { fields: [testAttempts.testId], references: [tests.id] })
}));

// Type Definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ExamType = typeof examTypes.$inferSelect;
export type InsertExamType = z.infer<typeof insertExamTypeSchema>;

export type Subject = typeof subjects.$inferSelect;
export type InsertSubject = z.infer<typeof insertSubjectSchema>;

export type Topic = typeof topics.$inferSelect;
export type InsertTopic = z.infer<typeof insertTopicSchema>;

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;

export type Test = typeof tests.$inferSelect;
export type InsertTest = z.infer<typeof insertTestSchema>;

export type TestAttempt = typeof testAttempts.$inferSelect;
export type InsertTestAttempt = z.infer<typeof insertTestAttemptSchema>;

// Client Models (for API responses)
export interface SubjectPerformance {
  name: string;
  icon: string;
  accuracy: number;
  completion: number;
}

export interface TopicPerformance {
  name: string;
  correct: number;
  total: number;
  percentage: number;
  timeSpent: number; // in minutes
}

export interface UserStats {
  testsTaken: number;
  avgScore: number;
  completion: number;
}
