import {
  users,
  examTypes,
  subjects,
  topics,
  questions,
  tests,
  testAttempts,
  type User,
  type InsertUser,
  type ExamType,
  type InsertExamType,
  type Subject,
  type InsertSubject,
  type Topic,
  type InsertTopic,
  type Question,
  type InsertQuestion,
  type Test,
  type InsertTest,
  type TestAttempt,
  type InsertTestAttempt,
  type SubjectPerformance,
  type TopicPerformance,
  type UserStats
} from "@shared/schema";
import { db } from "./db";
import { eq, inArray, desc } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import createMemoryStore from "memorystore";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Exam Type operations
  getExamTypes(): Promise<ExamType[]>;
  getExamType(id: number): Promise<ExamType | undefined>;
  createExamType(examType: InsertExamType): Promise<ExamType>;
  
  // Subject operations
  getSubjects(examTypeId?: number): Promise<Subject[]>;
  getSubject(id: number): Promise<Subject | undefined>;
  createSubject(subject: InsertSubject): Promise<Subject>;
  
  // Topic operations
  getTopics(subjectId?: number): Promise<Topic[]>;
  getTopic(id: number): Promise<Topic | undefined>;
  createTopic(topic: InsertTopic): Promise<Topic>;
  
  // Question operations
  getQuestions(topicId?: number): Promise<Question[]>;
  getQuestion(id: number): Promise<Question | undefined>;
  getQuestionsByIds(ids: number[]): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  
  // Test operations
  getTests(examTypeId?: number, subjectId?: number): Promise<Test[]>;
  getTest(id: number): Promise<Test | undefined>;
  createTest(test: InsertTest): Promise<Test>;
  
  // Test Attempt operations
  getTestAttempts(userId: number): Promise<TestAttempt[]>;
  getTestAttempt(id: number): Promise<TestAttempt | undefined>;
  createTestAttempt(testAttempt: InsertTestAttempt): Promise<TestAttempt>;
  updateTestAttempt(id: number, testAttempt: Partial<InsertTestAttempt>): Promise<TestAttempt | undefined>;
  
  // Analytics operations
  getUserStats(userId: number): Promise<UserStats>;
  getSubjectPerformance(userId: number): Promise<SubjectPerformance[]>;
  getTopicPerformance(userId: number, subjectId?: number): Promise<TopicPerformance[]>;
  getRecentActivity(userId: number, limit?: number): Promise<(TestAttempt & { test: Test })[]>;
  getUpcomingTests(userId: number, limit?: number): Promise<Test[]>;
  
  // Session store for auth
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    // Create PostgreSQL session store
    const PostgresStore = connectPg(session);
    this.sessionStore = new PostgresStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true
    });
  }
  
  // User Operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Exam Type Operations
  async getExamTypes(): Promise<ExamType[]> {
    return db.select().from(examTypes);
  }
  
  async getExamType(id: number): Promise<ExamType | undefined> {
    const [examType] = await db.select().from(examTypes).where(eq(examTypes.id, id));
    return examType;
  }
  
  async createExamType(examType: InsertExamType): Promise<ExamType> {
    const [newExamType] = await db.insert(examTypes).values(examType).returning();
    return newExamType;
  }
  
  // Subject Operations
  async getSubjects(examTypeId?: number): Promise<Subject[]> {
    if (examTypeId) {
      return db.select().from(subjects).where(eq(subjects.examTypeId, examTypeId));
    }
    return db.select().from(subjects);
  }
  
  async getSubject(id: number): Promise<Subject | undefined> {
    const [subject] = await db.select().from(subjects).where(eq(subjects.id, id));
    return subject;
  }
  
  async createSubject(subject: InsertSubject): Promise<Subject> {
    const [newSubject] = await db.insert(subjects).values(subject).returning();
    return newSubject;
  }
  
  // Topic Operations
  async getTopics(subjectId?: number): Promise<Topic[]> {
    if (subjectId) {
      return db.select().from(topics).where(eq(topics.subjectId, subjectId));
    }
    return db.select().from(topics);
  }
  
  async getTopic(id: number): Promise<Topic | undefined> {
    const [topic] = await db.select().from(topics).where(eq(topics.id, id));
    return topic;
  }
  
  async createTopic(topic: InsertTopic): Promise<Topic> {
    const [newTopic] = await db.insert(topics).values(topic).returning();
    return newTopic;
  }
  
  // Question Operations
  async getQuestions(topicId?: number): Promise<Question[]> {
    if (topicId) {
      return db.select().from(questions).where(eq(questions.topicId, topicId));
    }
    return db.select().from(questions);
  }
  
  async getQuestion(id: number): Promise<Question | undefined> {
    const [question] = await db.select().from(questions).where(eq(questions.id, id));
    return question;
  }
  
  async getQuestionsByIds(ids: number[]): Promise<Question[]> {
    return db.select().from(questions).where(inArray(questions.id, ids));
  }
  
  async createQuestion(question: InsertQuestion): Promise<Question> {
    const [newQuestion] = await db.insert(questions).values(question).returning();
    return newQuestion;
  }
  
  // Test Operations
  async getTests(examTypeId?: number, subjectId?: number): Promise<Test[]> {
    let query = db.select().from(tests);
    
    if (examTypeId) {
      query = query.where(eq(tests.examTypeId, examTypeId));
    }
    
    if (subjectId) {
      query = query.where(eq(tests.subjectId, subjectId));
    }
    
    return query;
  }
  
  async getTest(id: number): Promise<Test | undefined> {
    const [test] = await db.select().from(tests).where(eq(tests.id, id));
    return test;
  }
  
  async createTest(test: InsertTest): Promise<Test> {
    const [newTest] = await db.insert(tests).values(test).returning();
    return newTest;
  }
  
  // Test Attempt Operations
  async getTestAttempts(userId: number): Promise<TestAttempt[]> {
    return db.select().from(testAttempts).where(eq(testAttempts.userId, userId));
  }
  
  async getTestAttempt(id: number): Promise<TestAttempt | undefined> {
    const [testAttempt] = await db.select().from(testAttempts).where(eq(testAttempts.id, id));
    return testAttempt;
  }
  
  async createTestAttempt(testAttempt: InsertTestAttempt): Promise<TestAttempt> {
    const [newTestAttempt] = await db.insert(testAttempts).values(testAttempt).returning();
    return newTestAttempt;
  }
  
  async updateTestAttempt(id: number, testAttempt: Partial<InsertTestAttempt>): Promise<TestAttempt | undefined> {
    const [updatedTestAttempt] = await db
      .update(testAttempts)
      .set(testAttempt)
      .where(eq(testAttempts.id, id))
      .returning();
    
    return updatedTestAttempt;
  }
  
  // Analytics Operations
  async getUserStats(userId: number): Promise<UserStats> {
    const attempts = await this.getTestAttempts(userId);
    const completedAttempts = attempts.filter(attempt => attempt.isCompleted);
    
    if (completedAttempts.length === 0) {
      return {
        testsTaken: 0,
        avgScore: 0,
        completion: 0
      };
    }
    
    const avgScore = completedAttempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / completedAttempts.length;
    const completion = (completedAttempts.length / attempts.length) * 100;
    
    return {
      testsTaken: completedAttempts.length,
      avgScore,
      completion
    };
  }
  
  async getSubjectPerformance(userId: number): Promise<SubjectPerformance[]> {
    // Get all test attempts for the user
    const attempts = await this.getTestAttempts(userId);
    const completedAttempts = attempts.filter(attempt => attempt.isCompleted);
    
    if (completedAttempts.length === 0) {
      return [];
    }
    
    // Group attempts by subject
    const subjectPerformanceMap = new Map<number, { correct: number; total: number; completion: number; }>();
    
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
    
    // Convert map to array of SubjectPerformance
    const result: SubjectPerformance[] = [];
    for (const [subjectId, performance] of [...subjectPerformanceMap.entries()]) {
      const subject = await this.getSubject(subjectId);
      if (!subject) continue;
      
      result.push({
        name: subject.name,
        icon: subject.icon,
        accuracy: (performance.correct / performance.total) * 100,
        completion: (performance.completion / completedAttempts.length) * 100
      });
    }
    
    return result;
  }
  
  async getTopicPerformance(userId: number, subjectId?: number): Promise<TopicPerformance[]> {
    // Get all test attempts for the user
    const attempts = await this.getTestAttempts(userId);
    const completedAttempts = attempts.filter(attempt => attempt.isCompleted);
    
    if (completedAttempts.length === 0) {
      return [];
    }
    
    // In a real app with proper topic-level tracking, we'd calculate this from the database
    // For now, we'll return some sample data
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
  
  async getRecentActivity(userId: number, limit = 3): Promise<(TestAttempt & { test: Test })[]> {
    // Get all test attempts for the user
    const attempts = await db
      .select()
      .from(testAttempts)
      .where(eq(testAttempts.userId, userId))
      .orderBy(desc(testAttempts.startTime))
      .limit(limit);
    
    const result: (TestAttempt & { test: Test })[] = [];
    
    for (const attempt of attempts) {
      const test = await this.getTest(attempt.testId);
      if (test) {
        result.push({ ...attempt, test });
      }
    }
    
    return result;
  }
  
  async getUpcomingTests(userId: number, limit = 3): Promise<Test[]> {
    // In a real app, we'd have a proper scheduling system
    // For now, get the latest tests the user hasn't attempted
    const userAttempts = await this.getTestAttempts(userId);
    const attemptedTestIds = new Set(userAttempts.map(a => a.testId));
    
    const allTests = await this.getTests();
    const upcomingTests = allTests.filter(test => !attemptedTestIds.has(test.id));
    
    return upcomingTests.slice(0, limit);
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private examTypes: Map<number, ExamType> = new Map();
  private subjects: Map<number, Subject> = new Map();
  private topics: Map<number, Topic> = new Map();
  private questions: Map<number, Question> = new Map();
  private tests: Map<number, Test> = new Map();
  private testAttempts: Map<number, TestAttempt> = new Map();
  
  private currentUserId = 1;
  private currentExamTypeId = 1;
  private currentSubjectId = 1;
  private currentTopicId = 1;
  private currentQuestionId = 1;
  private currentTestId = 1;
  private currentTestAttemptId = 1;
  sessionStore: session.Store;

  constructor() {
    // Create memory session store
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    // Initialize with sample data
    this.seedInitialData();
  }

  // User Operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      profileImage: insertUser.profileImage || null 
    };
    this.users.set(id, user);
    return user;
  }
  
  // Exam Type Operations
  async getExamTypes(): Promise<ExamType[]> {
    return Array.from(this.examTypes.values());
  }
  
  async getExamType(id: number): Promise<ExamType | undefined> {
    return this.examTypes.get(id);
  }
  
  async createExamType(examType: InsertExamType): Promise<ExamType> {
    const id = this.currentExamTypeId++;
    const newExamType: ExamType = { ...examType, id };
    this.examTypes.set(id, newExamType);
    return newExamType;
  }
  
  // Subject Operations
  async getSubjects(examTypeId?: number): Promise<Subject[]> {
    if (examTypeId) {
      return Array.from(this.subjects.values()).filter(
        (subject) => subject.examTypeId === examTypeId
      );
    }
    return Array.from(this.subjects.values());
  }
  
  async getSubject(id: number): Promise<Subject | undefined> {
    return this.subjects.get(id);
  }
  
  async createSubject(subject: InsertSubject): Promise<Subject> {
    const id = this.currentSubjectId++;
    const newSubject: Subject = { ...subject, id };
    this.subjects.set(id, newSubject);
    return newSubject;
  }
  
  // Topic Operations
  async getTopics(subjectId?: number): Promise<Topic[]> {
    if (subjectId) {
      return Array.from(this.topics.values()).filter(
        (topic) => topic.subjectId === subjectId
      );
    }
    return Array.from(this.topics.values());
  }
  
  async getTopic(id: number): Promise<Topic | undefined> {
    return this.topics.get(id);
  }
  
  async createTopic(topic: InsertTopic): Promise<Topic> {
    const id = this.currentTopicId++;
    const newTopic: Topic = { ...topic, id };
    this.topics.set(id, newTopic);
    return newTopic;
  }
  
  // Question Operations
  async getQuestions(topicId?: number): Promise<Question[]> {
    if (topicId) {
      return Array.from(this.questions.values()).filter(
        (question) => question.topicId === topicId
      );
    }
    return Array.from(this.questions.values());
  }
  
  async getQuestion(id: number): Promise<Question | undefined> {
    return this.questions.get(id);
  }
  
  async getQuestionsByIds(ids: number[]): Promise<Question[]> {
    return ids.map(id => this.questions.get(id)).filter(Boolean) as Question[];
  }
  
  async createQuestion(question: InsertQuestion): Promise<Question> {
    const id = this.currentQuestionId++;
    const newQuestion: Question = { 
      ...question, 
      id,
      diagram: question.diagram || null
    };
    this.questions.set(id, newQuestion);
    return newQuestion;
  }
  
  // Test Operations
  async getTests(examTypeId?: number, subjectId?: number): Promise<Test[]> {
    let tests = Array.from(this.tests.values());
    
    if (examTypeId) {
      tests = tests.filter(test => test.examTypeId === examTypeId);
    }
    
    if (subjectId) {
      tests = tests.filter(test => test.subjectId === subjectId);
    }
    
    return tests;
  }
  
  async getTest(id: number): Promise<Test | undefined> {
    return this.tests.get(id);
  }
  
  async createTest(test: InsertTest): Promise<Test> {
    const id = this.currentTestId++;
    const newTest: Test = { 
      ...test, 
      id,
      subjectId: test.subjectId || null
    };
    this.tests.set(id, newTest);
    return newTest;
  }
  
  // Test Attempt Operations
  async getTestAttempts(userId: number): Promise<TestAttempt[]> {
    return Array.from(this.testAttempts.values()).filter(
      (attempt) => attempt.userId === userId
    );
  }
  
  async getTestAttempt(id: number): Promise<TestAttempt | undefined> {
    return this.testAttempts.get(id);
  }
  
  async createTestAttempt(testAttempt: InsertTestAttempt): Promise<TestAttempt> {
    const id = this.currentTestAttemptId++;
    const newTestAttempt: TestAttempt = { 
      ...testAttempt, 
      id, 
      startTime: testAttempt.startTime || new Date(),
      endTime: testAttempt.endTime || null,
      isCompleted: testAttempt.isCompleted || false,
      answers: testAttempt.answers || null,
      score: testAttempt.score || null,
      markedForReview: testAttempt.markedForReview || null,
      timeSpent: testAttempt.timeSpent || null
    };
    this.testAttempts.set(id, newTestAttempt);
    return newTestAttempt;
  }
  
  async updateTestAttempt(id: number, testAttempt: Partial<InsertTestAttempt>): Promise<TestAttempt | undefined> {
    const existingAttempt = this.testAttempts.get(id);
    
    if (!existingAttempt) {
      return undefined;
    }
    
    const updatedAttempt = { ...existingAttempt, ...testAttempt };
    this.testAttempts.set(id, updatedAttempt);
    return updatedAttempt;
  }
  
  // Analytics Operations
  async getUserStats(userId: number): Promise<UserStats> {
    const attempts = await this.getTestAttempts(userId);
    const completedAttempts = attempts.filter(attempt => attempt.isCompleted);
    
    if (completedAttempts.length === 0) {
      return {
        testsTaken: 0,
        avgScore: 0,
        completion: 0
      };
    }
    
    const avgScore = completedAttempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / completedAttempts.length;
    const completion = (completedAttempts.length / attempts.length) * 100;
    
    return {
      testsTaken: completedAttempts.length,
      avgScore,
      completion
    };
  }
  
  async getSubjectPerformance(userId: number): Promise<SubjectPerformance[]> {
    const attempts = await this.getTestAttempts(userId);
    const completedAttempts = attempts.filter(attempt => attempt.isCompleted);
    
    if (completedAttempts.length === 0) {
      return [];
    }
    
    // Group attempts by subject
    const subjectPerformanceMap = new Map<number, { correct: number; total: number; completion: number; }>();
    
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
    
    // Convert map to array of SubjectPerformance
    const result: SubjectPerformance[] = [];
    for (const [subjectId, performance] of [...subjectPerformanceMap.entries()]) {
      const subject = await this.getSubject(subjectId);
      if (!subject) continue;
      
      result.push({
        name: subject.name,
        icon: subject.icon,
        accuracy: (performance.correct / performance.total) * 100,
        completion: (performance.completion / completedAttempts.length) * 100
      });
    }
    
    return result;
  }
  
  async getTopicPerformance(userId: number, subjectId?: number): Promise<TopicPerformance[]> {
    const attempts = await this.getTestAttempts(userId);
    const completedAttempts = attempts.filter(attempt => attempt.isCompleted);
    
    if (completedAttempts.length === 0) {
      return [];
    }
    
    // This is a simplified implementation since we don't track performance by topic in our model
    // In a real application, this would require a more complex implementation
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
      },
      {
        name: "Fluid Mechanics",
        correct: 14,
        total: 20,
        percentage: 70,
        timeSpent: 26
      }
    ];
  }
  
  async getRecentActivity(userId: number, limit = 3): Promise<(TestAttempt & { test: Test })[]> {
    const attempts = await this.getTestAttempts(userId);
    const sortedAttempts = attempts.sort((a, b) => {
      const dateA = a.endTime || a.startTime;
      const dateB = b.endTime || b.startTime;
      return dateB.getTime() - dateA.getTime();
    });
    
    const result: (TestAttempt & { test: Test })[] = [];
    
    for (let i = 0; i < Math.min(sortedAttempts.length, limit); i++) {
      const attempt = sortedAttempts[i];
      const test = await this.getTest(attempt.testId);
      
      if (test) {
        result.push({ ...attempt, test });
      }
    }
    
    return result;
  }
  
  async getUpcomingTests(userId: number, limit = 3): Promise<Test[]> {
    // In a real app, this would filter tests based on scheduling
    // For our demo, we'll just return some random tests
    const allTests = await this.getTests();
    return allTests.slice(0, limit);
  }
  
  // Helper method to seed initial data
  private seedInitialData() {
    // Seed users
    this.createUser({
      username: "ajay.kumar",
      password: "password",
      email: "ajay.kumar@example.com",
      name: "Ajay Kumar",
      profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80"
    });
    
    // Seed exam types
    const jeeExam = this.createExamType({
      name: "IIT JEE",
      description: "Engineering entrance examination",
      icon: "atom"
    });
    
    const neetExam = this.createExamType({
      name: "NEET",
      description: "Medical entrance examination",
      icon: "heartbeat"
    });
    
    const catExam = this.createExamType({
      name: "CAT",
      description: "Management entrance examination",
      icon: "chart-line"
    });
    
    const upscExam = this.createExamType({
      name: "UPSC",
      description: "Civil services examination",
      icon: "landmark"
    });
    
    // Seed subjects
    const physics = this.createSubject({
      name: "Physics",
      icon: "atom",
      examTypeId: 1 // JEE
    });
    
    const chemistry = this.createSubject({
      name: "Chemistry",
      icon: "flask",
      examTypeId: 1 // JEE
    });
    
    const mathematics = this.createSubject({
      name: "Mathematics",
      icon: "square-root-alt",
      examTypeId: 1 // JEE
    });
    
    const biology = this.createSubject({
      name: "Biology",
      icon: "dna",
      examTypeId: 2 // NEET
    });
    
    // Seed topics for Physics
    const mechanics = this.createTopic({
      name: "Mechanics",
      subjectId: 1 // Physics
    });
    
    const thermodynamics = this.createTopic({
      name: "Thermodynamics",
      subjectId: 1 // Physics
    });
    
    // Seed questions
    this.createQuestion({
      text: "A particle moves under the influence of a force F = -kx, where k is a positive constant and x is the displacement from the origin. The particle is released from rest at x = A. The time period of oscillation is:",
      options: ["T = 2π√(m/k)", "T = π√(m/k)", "T = 2π√(k/m)", "T = π√(k/m)"],
      correctOption: 0,
      explanation: "For a simple harmonic oscillator with force F = -kx, the time period is given by T = 2π√(m/k) where m is the mass of the particle and k is the spring constant.",
      topicId: 1, // Mechanics
      difficultyLevel: 2
    });
    
    this.createQuestion({
      text: "A ball is thrown vertically upward with an initial velocity of 20 m/s. If g = 10 m/s², what is the maximum height reached by the ball?",
      options: ["10 m", "40 m", "20 m", "15 m"],
      correctOption: 2,
      explanation: "Using the equation v² = u² - 2gh, where v is the final velocity (0 at maximum height), u is the initial velocity (20 m/s), g is the acceleration due to gravity (10 m/s²), and h is the height. 0 = 20² - 2 × 10 × h, solving for h gives 20 meters.",
      topicId: 1, // Mechanics
      difficultyLevel: 1
    });
    
    // Seed more questions...
    for (let i = 0; i < 18; i++) {
      this.createQuestion({
        text: `Sample Physics Question ${i+3}`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctOption: i % 4,
        explanation: "This is a sample explanation.",
        topicId: 1, // Mechanics
        difficultyLevel: Math.floor(Math.random() * 3) + 1
      });
    }
    
    // Seed tests
    this.createTest({
      name: "JEE Physics Mock Test 1",
      description: "Test your knowledge of basic physics concepts",
      examTypeId: 1, // JEE
      subjectId: 1, // Physics
      duration: 60, // 60 minutes
      totalQuestions: 20,
      questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    });
    
    this.createTest({
      name: "JEE Chemistry Mock Test 1",
      description: "Practice with organic and inorganic chemistry questions",
      examTypeId: 1, // JEE
      subjectId: 2, // Chemistry
      duration: 60, // 60 minutes
      totalQuestions: 20,
      questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    });
    
    this.createTest({
      name: "JEE Mathematics Mock Test 1",
      description: "Algebra, calculus and geometry problems",
      examTypeId: 1, // JEE
      subjectId: 3, // Mathematics
      duration: 60, // 60 minutes
      totalQuestions: 20,
      questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    });
    
    this.createTest({
      name: "NEET Biology Mock Test 1",
      description: "Test covering anatomy, physiology and zoology",
      examTypeId: 2, // NEET
      subjectId: 4, // Biology
      duration: 60, // 60 minutes
      totalQuestions: 20,
      questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    });
    
    // Seed a test attempt
    this.createTestAttempt({
      userId: 1,
      testId: 1,
      startTime: new Date(Date.now() - 3600000), // 1 hour ago
      endTime: new Date(Date.now() - 3000000), // 50 minutes ago
      isCompleted: true,
      answers: [0, 2, 1, 3, 0, 2, 1, 3, 0, 2, 1, 3, 0, 2, 1, 3, 0, 2, 1, 3],
      score: 16,
      markedForReview: [4, 9, 14],
      timeSpent: 45 * 60 // 45 minutes
    });
  }
}

// Export instance of the storage implementation
// export const storage = new MemStorage(); // In-memory storage
export const storage = new DatabaseStorage(); // Database storage