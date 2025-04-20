import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertTestAttemptSchema 
} from "@shared/schema";
import { setupAuth } from "./auth";
import { z } from "zod";

// Middleware to ensure user is authenticated
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);
  
  // API routes
  const apiRouter = app.route("/api");

  // Exam types routes
  app.get("/api/exam-types", async (_req, res) => {
    try {
      const examTypes = await storage.getExamTypes();
      res.json(examTypes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch exam types" });
    }
  });

  // Subjects routes
  app.get("/api/subjects", async (req, res) => {
    try {
      const examTypeId = req.query.examTypeId ? Number(req.query.examTypeId) : undefined;
      const subjects = await storage.getSubjects(examTypeId);
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });

  // Tests routes
  app.get("/api/tests", async (req, res) => {
    try {
      const examTypeId = req.query.examTypeId ? Number(req.query.examTypeId) : undefined;
      const subjectId = req.query.subjectId ? Number(req.query.subjectId) : undefined;
      
      const tests = await storage.getTests(examTypeId, subjectId);
      res.json(tests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tests" });
    }
  });

  app.get("/api/tests/:id", async (req, res) => {
    try {
      const testId = Number(req.params.id);
      const test = await storage.getTest(testId);
      
      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }
      
      // Get the exam type to include its name
      const examType = test.examTypeId ? await storage.getExamType(test.examTypeId) : null;
      
      // Get subject information if available
      const subject = test.subjectId ? await storage.getSubject(test.subjectId) : null;

      // Return enhanced test data with exam type information
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

  // Test questions route
  app.get("/api/tests/:id/questions", async (req, res) => {
    try {
      const testId = Number(req.params.id);
      const test = await storage.getTest(testId);
      
      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }
      
      // Check if questionIds is an array
      if (!Array.isArray(test.questionIds) || test.questionIds.length === 0) {
        return res.status(404).json({ 
          message: "No questions found for this test",
          questions: []
        });
      }
      
      const questions = await storage.getQuestionsByIds(test.questionIds);
      
      // Remove correct answer from response
      const sanitizedQuestions = questions.map(q => {
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

  // Test attempt routes
  app.post("/api/test-attempts", async (req, res) => {
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

  app.put("/api/test-attempts/:id", requireAuth, async (req, res) => {
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

  app.get("/api/users/:userId/test-attempts", requireAuth, async (req, res) => {
    try {
      const userId = Number(req.params.userId);
      const testAttempts = await storage.getTestAttempts(userId);
      res.json(testAttempts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch test attempts" });
    }
  });

  app.get("/api/test-attempts/:id", async (req, res) => {
    try {
      const testAttemptId = Number(req.params.id);
      const testAttempt = await storage.getTestAttempt(testAttemptId);
      
      if (!testAttempt) {
        return res.status(404).json({ message: "Test attempt not found" });
      }
      
      // Get the test details
      const test = await storage.getTest(testAttempt.testId);
      
      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }
      
      // Get the questions
      const questions = Array.isArray(test.questionIds) 
        ? await storage.getQuestionsByIds(test.questionIds)
        : [];
      
      // Calculate score if not already calculated
      if (testAttempt.isCompleted && !testAttempt.score && testAttempt.answers) {
        let score = 0;
        const answers = testAttempt.answers as number[];
        
        for (let i = 0; i < answers.length; i++) {
          const question = questions[i];
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
        questions
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch test attempt" });
    }
  });

  // Analytics routes
  app.get("/api/users/:userId/stats", requireAuth, async (req, res) => {
    try {
      const userId = Number(req.params.userId);
      const stats = await storage.getUserStats(userId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user stats" });
    }
  });

  app.get("/api/users/:userId/subject-performance", requireAuth, async (req, res) => {
    try {
      const userId = Number(req.params.userId);
      const performance = await storage.getSubjectPerformance(userId);
      res.json(performance);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subject performance" });
    }
  });

  app.get("/api/users/:userId/topic-performance", requireAuth, async (req, res) => {
    try {
      const userId = Number(req.params.userId);
      const subjectId = req.query.subjectId ? Number(req.query.subjectId) : undefined;
      const performance = await storage.getTopicPerformance(userId, subjectId);
      res.json(performance);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch topic performance" });
    }
  });

  app.get("/api/users/:userId/recent-activity", requireAuth, async (req, res) => {
    try {
      const userId = Number(req.params.userId);
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const activity = await storage.getRecentActivity(userId, limit);
      res.json(activity);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent activity" });
    }
  });

  app.get("/api/users/:userId/upcoming-tests", requireAuth, async (req, res) => {
    try {
      const userId = Number(req.params.userId);
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const tests = await storage.getUpcomingTests(userId, limit);
      res.json(tests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch upcoming tests" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
