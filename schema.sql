-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  profile_image TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create exam_types table
CREATE TABLE IF NOT EXISTS exam_types (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT NOT NULL
);

-- Create subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  exam_type_id INTEGER NOT NULL REFERENCES exam_types(id)
);

-- Create topics table
CREATE TABLE IF NOT EXISTS topics (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  subject_id INTEGER NOT NULL REFERENCES subjects(id)
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_option INTEGER NOT NULL,
  explanation TEXT NOT NULL,
  topic_id INTEGER NOT NULL REFERENCES topics(id),
  difficulty_level INTEGER NOT NULL,
  diagram TEXT
);

-- Create tests table
CREATE TABLE IF NOT EXISTS tests (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  exam_type_id INTEGER NOT NULL REFERENCES exam_types(id),
  subject_id INTEGER REFERENCES subjects(id),
  duration INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  question_ids JSONB NOT NULL
);

-- Create test_attempts table
CREATE TABLE IF NOT EXISTS test_attempts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  test_id INTEGER NOT NULL REFERENCES tests(id),
  start_time TIMESTAMP DEFAULT NOW(),
  end_time TIMESTAMP,
  is_completed BOOLEAN DEFAULT FALSE,
  answers JSONB,
  score INTEGER,
  marked_for_review JSONB,
  time_spent INTEGER
);

-- Create session table for auth
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL,
  CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");

-- Seed initial data
-- Insert a default admin user
INSERT INTO users (username, password, email, name) 
VALUES ('admin', 'admin.password', 'admin@example.com', 'Administrator')
ON CONFLICT (username) DO NOTHING;

-- Insert exam types
INSERT INTO exam_types (name, description, icon)
VALUES 
  ('IIT JEE', 'Engineering entrance examination', 'atom'),
  ('NEET', 'Medical entrance examination', 'heartbeat'),
  ('CAT', 'Management entrance examination', 'chart-line'),
  ('UPSC', 'Civil services examination', 'landmark')
ON CONFLICT (name) DO NOTHING;