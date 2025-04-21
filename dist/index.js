var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  examTypes: () => examTypes,
  examTypesRelations: () => examTypesRelations,
  insertExamTypeSchema: () => insertExamTypeSchema,
  insertQuestionSchema: () => insertQuestionSchema,
  insertSubjectSchema: () => insertSubjectSchema,
  insertTestAttemptSchema: () => insertTestAttemptSchema,
  insertTestSchema: () => insertTestSchema,
  insertTopicSchema: () => insertTopicSchema,
  insertUserSchema: () => insertUserSchema,
  questions: () => questions,
  questionsRelations: () => questionsRelations,
  subjects: () => subjects,
  subjectsRelations: () => subjectsRelations,
  testAttempts: () => testAttempts,
  testAttemptsRelations: () => testAttemptsRelations,
  tests: () => tests,
  testsRelations: () => testsRelations,
  topics: () => topics,
  topicsRelations: () => topicsRelations,
  users: () => users,
  usersRelations: () => usersRelations
});
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
  profileImage: true
});
var examTypes = pgTable("exam_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  icon: text("icon").notNull()
});
var insertExamTypeSchema = createInsertSchema(examTypes).pick({
  name: true,
  description: true,
  icon: true
});
var subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  examTypeId: integer("exam_type_id").notNull()
});
var insertSubjectSchema = createInsertSchema(subjects).pick({
  name: true,
  icon: true,
  examTypeId: true
});
var topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  subjectId: integer("subject_id").notNull()
});
var insertTopicSchema = createInsertSchema(topics).pick({
  name: true,
  subjectId: true
});
var questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  options: jsonb("options").notNull(),
  correctOption: integer("correct_option").notNull(),
  explanation: text("explanation").notNull(),
  topicId: integer("topic_id").notNull(),
  difficultyLevel: integer("difficulty_level").notNull(),
  diagram: text("diagram")
});
var insertQuestionSchema = createInsertSchema(questions).pick({
  text: true,
  options: true,
  correctOption: true,
  explanation: true,
  topicId: true,
  difficultyLevel: true,
  diagram: true
});
var tests = pgTable("tests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  examTypeId: integer("exam_type_id").notNull(),
  subjectId: integer("subject_id"),
  duration: integer("duration").notNull(),
  // in minutes
  totalQuestions: integer("total_questions").notNull(),
  questionIds: jsonb("question_ids").notNull()
});
var insertTestSchema = createInsertSchema(tests).pick({
  name: true,
  description: true,
  examTypeId: true,
  subjectId: true,
  duration: true,
  totalQuestions: true,
  questionIds: true
});
var testAttempts = pgTable("test_attempts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  testId: integer("test_id").notNull(),
  startTime: timestamp("start_time").defaultNow(),
  endTime: timestamp("end_time"),
  isCompleted: boolean("is_completed").default(false),
  answers: jsonb("answers"),
  // Array of selected options
  score: integer("score"),
  markedForReview: jsonb("marked_for_review"),
  // Array of question indices marked for review
  timeSpent: integer("time_spent")
  // in seconds
});
var insertTestAttemptSchema = createInsertSchema(testAttempts).pick({
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
var usersRelations = relations(users, ({ many }) => ({
  testAttempts: many(testAttempts)
}));
var examTypesRelations = relations(examTypes, ({ many }) => ({
  subjects: many(subjects),
  tests: many(tests)
}));
var subjectsRelations = relations(subjects, ({ one, many }) => ({
  examType: one(examTypes, { fields: [subjects.examTypeId], references: [examTypes.id] }),
  topics: many(topics),
  tests: many(tests)
}));
var topicsRelations = relations(topics, ({ one, many }) => ({
  subject: one(subjects, { fields: [topics.subjectId], references: [subjects.id] }),
  questions: many(questions)
}));
var questionsRelations = relations(questions, ({ one }) => ({
  topic: one(topics, { fields: [questions.topicId], references: [topics.id] })
}));
var testsRelations = relations(tests, ({ one, many }) => ({
  examType: one(examTypes, { fields: [tests.examTypeId], references: [examTypes.id] }),
  subject: one(subjects, { fields: [tests.subjectId], references: [subjects.id] }),
  testAttempts: many(testAttempts)
}));
var testAttemptsRelations = relations(testAttempts, ({ one }) => ({
  user: one(users, { fields: [testAttempts.userId], references: [users.id] }),
  test: one(tests, { fields: [testAttempts.testId], references: [tests.id] })
}));

// server/db.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
var client = postgres(process.env.DATABASE_URL);
var db = drizzle(client, { schema: schema_exports });
console.log("Database connection established");

// server/storage.ts
import { eq, inArray, desc } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import createMemoryStore from "memorystore";
var DatabaseStorage = class {
  sessionStore;
  constructor() {
    const PostgresStore = connectPg(session);
    this.sessionStore = new PostgresStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true
    });
  }
  // User Operations
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  // Exam Type Operations
  async getExamTypes() {
    return db.select().from(examTypes);
  }
  async getExamType(id) {
    const [examType] = await db.select().from(examTypes).where(eq(examTypes.id, id));
    return examType;
  }
  async createExamType(examType) {
    const [newExamType] = await db.insert(examTypes).values(examType).returning();
    return newExamType;
  }
  // Subject Operations
  async getSubjects(examTypeId) {
    if (examTypeId) {
      return db.select().from(subjects).where(eq(subjects.examTypeId, examTypeId));
    }
    return db.select().from(subjects);
  }
  async getSubject(id) {
    const [subject] = await db.select().from(subjects).where(eq(subjects.id, id));
    return subject;
  }
  async createSubject(subject) {
    const [newSubject] = await db.insert(subjects).values(subject).returning();
    return newSubject;
  }
  // Topic Operations
  async getTopics(subjectId) {
    if (subjectId) {
      return db.select().from(topics).where(eq(topics.subjectId, subjectId));
    }
    return db.select().from(topics);
  }
  async getTopic(id) {
    const [topic] = await db.select().from(topics).where(eq(topics.id, id));
    return topic;
  }
  async createTopic(topic) {
    const [newTopic] = await db.insert(topics).values(topic).returning();
    return newTopic;
  }
  // Question Operations
  async getQuestions(topicId) {
    if (topicId) {
      return db.select().from(questions).where(eq(questions.topicId, topicId));
    }
    return db.select().from(questions);
  }
  async getQuestion(id) {
    const [question] = await db.select().from(questions).where(eq(questions.id, id));
    return question;
  }
  async getQuestionsByIds(ids) {
    return db.select().from(questions).where(inArray(questions.id, ids));
  }
  async createQuestion(question) {
    const [newQuestion] = await db.insert(questions).values(question).returning();
    return newQuestion;
  }
  // Test Operations
  async getTests(examTypeId, subjectId) {
    let query = db.select().from(tests);
    if (examTypeId) {
      query = query.where(eq(tests.examTypeId, examTypeId));
    }
    if (subjectId) {
      query = query.where(eq(tests.subjectId, subjectId));
    }
    return query;
  }
  async getTest(id) {
    const [test] = await db.select().from(tests).where(eq(tests.id, id));
    return test;
  }
  async createTest(test) {
    const [newTest] = await db.insert(tests).values(test).returning();
    return newTest;
  }
  // Test Attempt Operations
  async getTestAttempts(userId) {
    return db.select().from(testAttempts).where(eq(testAttempts.userId, userId));
  }
  async getTestAttempt(id) {
    const [testAttempt] = await db.select().from(testAttempts).where(eq(testAttempts.id, id));
    return testAttempt;
  }
  async createTestAttempt(testAttempt) {
    const [newTestAttempt] = await db.insert(testAttempts).values(testAttempt).returning();
    return newTestAttempt;
  }
  async updateTestAttempt(id, testAttempt) {
    const [updatedTestAttempt] = await db.update(testAttempts).set(testAttempt).where(eq(testAttempts.id, id)).returning();
    return updatedTestAttempt;
  }
  // Analytics Operations
  async getUserStats(userId) {
    const attempts = await this.getTestAttempts(userId);
    const completedAttempts = attempts.filter((attempt) => attempt.isCompleted);
    if (completedAttempts.length === 0) {
      return {
        testsTaken: 0,
        avgScore: 0,
        completion: 0
      };
    }
    const avgScore = completedAttempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / completedAttempts.length;
    const completion = completedAttempts.length / attempts.length * 100;
    return {
      testsTaken: completedAttempts.length,
      avgScore,
      completion
    };
  }
  async getSubjectPerformance(userId) {
    const attempts = await this.getTestAttempts(userId);
    const completedAttempts = attempts.filter((attempt) => attempt.isCompleted);
    if (completedAttempts.length === 0) {
      return [];
    }
    const subjectPerformanceMap = /* @__PURE__ */ new Map();
    for (const attempt of completedAttempts) {
      const test = await this.getTest(attempt.testId);
      if (!test || !test.subjectId) continue;
      const subject = await this.getSubject(test.subjectId);
      if (!subject) continue;
      const performance = subjectPerformanceMap.get(subject.id) || { correct: 0, total: 0, completion: 0 };
      if (attempt.score) {
        performance.correct += attempt.score;
      }
      performance.total += test.totalQuestions;
      performance.completion += 1;
      subjectPerformanceMap.set(subject.id, performance);
    }
    const result = [];
    for (const [subjectId, performance] of [...subjectPerformanceMap.entries()]) {
      const subject = await this.getSubject(subjectId);
      if (!subject) continue;
      result.push({
        name: subject.name,
        icon: subject.icon,
        accuracy: performance.correct / performance.total * 100,
        completion: performance.completion / completedAttempts.length * 100
      });
    }
    return result;
  }
  async getTopicPerformance(userId, subjectId) {
    const attempts = await this.getTestAttempts(userId);
    const completedAttempts = attempts.filter((attempt) => attempt.isCompleted);
    if (completedAttempts.length === 0) {
      return [];
    }
    return [
      {
        name: "Newton's Laws of Motion",
        correct: 17,
        total: 20,
        percentage: 85,
        timeSpent: 24
      },
      {
        name: "Rotational Dynamics",
        correct: 13,
        total: 20,
        percentage: 65,
        timeSpent: 28
      },
      {
        name: "Gravitation",
        correct: 15,
        total: 20,
        percentage: 75,
        timeSpent: 32
      },
      {
        name: "Simple Harmonic Motion",
        correct: 12,
        total: 20,
        percentage: 60,
        timeSpent: 29
      }
    ];
  }
  async getRecentActivity(userId, limit = 3) {
    const attempts = await db.select().from(testAttempts).where(eq(testAttempts.userId, userId)).orderBy(desc(testAttempts.startTime)).limit(limit);
    const result = [];
    for (const attempt of attempts) {
      const test = await this.getTest(attempt.testId);
      if (test) {
        result.push({ ...attempt, test });
      }
    }
    return result;
  }
  async getUpcomingTests(userId, limit = 3) {
    const userAttempts = await this.getTestAttempts(userId);
    const attemptedTestIds = new Set(userAttempts.map((a) => a.testId));
    const allTests = await this.getTests();
    const upcomingTests = allTests.filter((test) => !attemptedTestIds.has(test.id));
    return upcomingTests.slice(0, limit);
  }
};
var storage = new DatabaseStorage();

// server/auth.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session2 from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
var scryptAsync = promisify(scrypt);
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}
async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}
function setupAuth(app2) {
  const sessionSettings = {
    secret: process.env.SESSION_SECRET || "mock-prep-session-secret",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore
  };
  app2.set("trust proxy", 1);
  app2.use(session2(sessionSettings));
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await storage.getUserByUsername(username);
      if (!user || !await comparePasswords(password, user.password)) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await storage.getUser(id);
    done(null, user);
  });
  app2.post("/api/register", async (req, res, next) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
      const existingEmail = await storage.getUserByEmail(req.body.email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }
      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password)
      });
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (error) {
      next(error);
    }
  });
  app2.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user);
  });
  app2.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });
  app2.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
}

// server/routes.ts
import { z } from "zod";
var requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
async function registerRoutes(app2) {
  setupAuth(app2);
  const apiRouter = app2.route("/api");
  app2.get("/api/exam-types", async (_req, res) => {
    try {
      const examTypes2 = await storage.getExamTypes();
      res.json(examTypes2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch exam types" });
    }
  });
  app2.get("/api/subjects", async (req, res) => {
    try {
      const examTypeId = req.query.examTypeId ? Number(req.query.examTypeId) : void 0;
      const subjects2 = await storage.getSubjects(examTypeId);
      res.json(subjects2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });
  app2.get("/api/tests", async (req, res) => {
    try {
      const examTypeId = req.query.examTypeId ? Number(req.query.examTypeId) : void 0;
      const subjectId = req.query.subjectId ? Number(req.query.subjectId) : void 0;
      const tests2 = await storage.getTests(examTypeId, subjectId);
      res.json(tests2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tests" });
    }
  });
  app2.get("/api/tests/:id", async (req, res) => {
    try {
      const testId = Number(req.params.id);
      const test = await storage.getTest(testId);
      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }
      const examType = test.examTypeId ? await storage.getExamType(test.examTypeId) : null;
      const subject = test.subjectId ? await storage.getSubject(test.subjectId) : null;
      const enhancedTest = {
        ...test,
        examTypeName: examType?.name || "General",
        subjectName: subject?.name || "General",
        // Add sections data for the test
        sections: [
          {
            name: subject?.name || "General",
            questions: Array.isArray(test.questionIds) ? test.questionIds.length : 0,
            marksPerQuestion: 4,
            negativeMarks: 1
          }
        ]
      };
      res.json(enhancedTest);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch test" });
    }
  });
  app2.get("/api/tests/:id/questions", async (req, res) => {
    try {
      const testId = Number(req.params.id);
      const test = await storage.getTest(testId);
      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }
      if (!Array.isArray(test.questionIds) || test.questionIds.length === 0) {
        return res.status(404).json({
          message: "No questions found for this test",
          questions: []
        });
      }
      const questions2 = await storage.getQuestionsByIds(test.questionIds);
      const sanitizedQuestions = questions2.map((q) => {
        const { correctOption, explanation, ...rest } = q;
        return {
          ...rest,
          options: Array.isArray(rest.options) ? rest.options : ["Option A", "Option B", "Option C", "Option D"]
        };
      });
      res.json(sanitizedQuestions);
    } catch (error) {
      console.error("Error fetching test questions:", error);
      res.status(500).json({
        message: "Failed to fetch test questions",
        questions: []
      });
    }
  });
  app2.post("/api/test-attempts", async (req, res) => {
    try {
      const testAttemptData = insertTestAttemptSchema.parse(req.body);
      const testAttempt = await storage.createTestAttempt(testAttemptData);
      res.status(201).json(testAttempt);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create test attempt" });
      }
    }
  });
  app2.put("/api/test-attempts/:id", requireAuth, async (req, res) => {
    try {
      const testAttemptId = Number(req.params.id);
      const updateData = req.body;
      const updatedAttempt = await storage.updateTestAttempt(testAttemptId, updateData);
      if (!updatedAttempt) {
        return res.status(404).json({ message: "Test attempt not found" });
      }
      res.json(updatedAttempt);
    } catch (error) {
      res.status(500).json({ message: "Failed to update test attempt" });
    }
  });
  app2.get("/api/users/:userId/test-attempts", requireAuth, async (req, res) => {
    try {
      const userId = Number(req.params.userId);
      const testAttempts2 = await storage.getTestAttempts(userId);
      res.json(testAttempts2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch test attempts" });
    }
  });
  app2.get("/api/test-attempts/:id", async (req, res) => {
    try {
      const testAttemptId = Number(req.params.id);
      const testAttempt = await storage.getTestAttempt(testAttemptId);
      if (!testAttempt) {
        return res.status(404).json({ message: "Test attempt not found" });
      }
      const test = await storage.getTest(testAttempt.testId);
      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }
      const questions2 = Array.isArray(test.questionIds) ? await storage.getQuestionsByIds(test.questionIds) : [];
      if (testAttempt.isCompleted && !testAttempt.score && testAttempt.answers) {
        let score = 0;
        const answers = testAttempt.answers;
        for (let i = 0; i < answers.length; i++) {
          const question = questions2[i];
          if (question && answers[i] === question.correctOption) {
            score += 1;
          }
        }
        testAttempt.score = score;
        await storage.updateTestAttempt(testAttemptId, { score });
      }
      res.json({
        testAttempt,
        test,
        questions: questions2
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch test attempt" });
    }
  });
  app2.get("/api/users/:userId/stats", requireAuth, async (req, res) => {
    try {
      const userId = Number(req.params.userId);
      const stats = await storage.getUserStats(userId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user stats" });
    }
  });
  app2.get("/api/users/:userId/subject-performance", requireAuth, async (req, res) => {
    try {
      const userId = Number(req.params.userId);
      const performance = await storage.getSubjectPerformance(userId);
      res.json(performance);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subject performance" });
    }
  });
  app2.get("/api/users/:userId/topic-performance", requireAuth, async (req, res) => {
    try {
      const userId = Number(req.params.userId);
      const subjectId = req.query.subjectId ? Number(req.query.subjectId) : void 0;
      const performance = await storage.getTopicPerformance(userId, subjectId);
      res.json(performance);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch topic performance" });
    }
  });
  app2.get("/api/users/:userId/recent-activity", requireAuth, async (req, res) => {
    try {
      const userId = Number(req.params.userId);
      const limit = req.query.limit ? Number(req.query.limit) : void 0;
      const activity = await storage.getRecentActivity(userId, limit);
      res.json(activity);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent activity" });
    }
  });
  app2.get("/api/users/:userId/upcoming-tests", requireAuth, async (req, res) => {
    try {
      const userId = Number(req.params.userId);
      const limit = req.query.limit ? Number(req.query.limit) : void 0;
      const tests2 = await storage.getUpcomingTests(userId, limit);
      res.json(tests2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch upcoming tests" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  base: "./",
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "127.0.0.1"
    //reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
