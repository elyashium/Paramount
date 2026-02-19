/*
  # Paramount Coaching Institute Database Schema

  ## Overview
  Complete database schema for the educational platform including user profiles,
  courses, study materials, tests, and quiz functionality.

  ## New Tables

  ### `profiles`
  - `id` (uuid, primary key, references auth.users)
  - `username` (text, unique) - Unique username for the platform
  - `full_name` (text) - User's display name
  - `avatar_url` (text) - Profile picture URL
  - `role` (text) - User role: 'user' or 'admin'
  - `theme_preference` (text) - 'light', 'dark', or 'system'
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `courses`
  - `id` (uuid, primary key)
  - `title` (text) - Course title
  - `description` (text) - Course description
  - `price` (numeric) - Course price (0 for free)
  - `thumbnail_url` (text) - Course thumbnail
  - `category` (text) - Course category
  - `is_published` (boolean) - Visibility status
  - `created_by` (uuid, references profiles)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `materials`
  - `id` (uuid, primary key)
  - `type` (text) - Type: 'ebook', 'paper', 'syllabus', 'current_affairs'
  - `title` (text) - Material title
  - `description` (text) - Material description
  - `file_url` (text) - File download URL
  - `category` (text) - Material category
  - `is_published` (boolean) - Visibility status
  - `created_by` (uuid, references profiles)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `tests`
  - `id` (uuid, primary key)
  - `title` (text) - Test title
  - `description` (text) - Test description
  - `duration` (integer) - Duration in minutes
  - `total_marks` (integer) - Total marks
  - `is_free` (boolean) - Free or paid test
  - `is_published` (boolean) - Visibility status
  - `created_by` (uuid, references profiles)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `questions`
  - `id` (uuid, primary key)
  - `test_id` (uuid, references tests)
  - `question_text` (text) - Question content
  - `options` (jsonb) - Question options array
  - `correct_answer` (text) - Correct option key
  - `explanation` (text) - Answer explanation
  - `marks` (integer) - Marks for this question
  - `order_index` (integer) - Question order
  - `created_at` (timestamptz)

  ### `quiz_results`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `test_id` (uuid, references tests)
  - `answers` (jsonb) - User's answers
  - `score` (numeric) - Final score
  - `total_marks` (integer) - Total possible marks
  - `completed_at` (timestamptz)

  ### `user_purchases`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `course_id` (uuid, references courses)
  - `amount_paid` (numeric) - Amount paid
  - `purchased_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Users can read their own profile
  - Users can update their own profile
  - Only admins can create/update/delete courses, materials, and tests
  - Users can view published content
  - Users can view their own purchases and quiz results
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  theme_preference text DEFAULT 'system' CHECK (theme_preference IN ('light', 'dark', 'system')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric DEFAULT 0,
  thumbnail_url text,
  category text,
  is_published boolean DEFAULT false,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create materials table
CREATE TABLE IF NOT EXISTS materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('ebook', 'paper', 'syllabus', 'current_affairs')),
  title text NOT NULL,
  description text,
  file_url text,
  category text,
  is_published boolean DEFAULT false,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tests table
CREATE TABLE IF NOT EXISTS tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  duration integer DEFAULT 60,
  total_marks integer DEFAULT 100,
  is_free boolean DEFAULT false,
  is_published boolean DEFAULT false,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id uuid REFERENCES tests(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  options jsonb NOT NULL,
  correct_answer text NOT NULL,
  explanation text,
  marks integer DEFAULT 1,
  order_index integer,
  created_at timestamptz DEFAULT now()
);

-- Create quiz_results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  test_id uuid REFERENCES tests(id) ON DELETE CASCADE,
  answers jsonb NOT NULL,
  score numeric,
  total_marks integer,
  completed_at timestamptz DEFAULT now()
);

-- Create user_purchases table
CREATE TABLE IF NOT EXISTS user_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  amount_paid numeric,
  purchased_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_purchases ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Courses policies
CREATE POLICY "Anyone can view published courses"
  ON courses FOR SELECT
  TO authenticated
  USING (is_published = true OR created_by = auth.uid());

CREATE POLICY "Admins can insert courses"
  ON courses FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update courses"
  ON courses FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete courses"
  ON courses FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Materials policies
CREATE POLICY "Anyone can view published materials"
  ON materials FOR SELECT
  TO authenticated
  USING (is_published = true OR created_by = auth.uid());

CREATE POLICY "Admins can insert materials"
  ON materials FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update materials"
  ON materials FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete materials"
  ON materials FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Tests policies
CREATE POLICY "Anyone can view published tests"
  ON tests FOR SELECT
  TO authenticated
  USING (is_published = true OR created_by = auth.uid());

CREATE POLICY "Admins can insert tests"
  ON tests FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update tests"
  ON tests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete tests"
  ON tests FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Questions policies
CREATE POLICY "Users can view questions for published tests"
  ON questions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tests
      WHERE tests.id = questions.test_id
      AND (tests.is_published = true OR tests.created_by = auth.uid())
    )
  );

CREATE POLICY "Admins can insert questions"
  ON questions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update questions"
  ON questions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete questions"
  ON questions FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Quiz results policies
CREATE POLICY "Users can view own quiz results"
  ON quiz_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz results"
  ON quiz_results FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- User purchases policies
CREATE POLICY "Users can view own purchases"
  ON user_purchases FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own purchases"
  ON user_purchases FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(is_published);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_materials_type ON materials(type);
CREATE INDEX IF NOT EXISTS idx_materials_published ON materials(is_published);
CREATE INDEX IF NOT EXISTS idx_tests_published ON tests(is_published);
CREATE INDEX IF NOT EXISTS idx_questions_test_id ON questions(test_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_user_purchases_user_id ON user_purchases(user_id);