-- Migration to update courses table to match UI requirements and mock data structure

-- 1. Rename thumbnail_url to image_url for consistency (SAFE RENAME)
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name='courses' AND column_name='thumbnail_url') THEN
        ALTER TABLE courses RENAME COLUMN thumbnail_url TO image_url;
    END IF;
END $$;

-- 2. Add missing columns
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS image_url text, -- Fallback if thumbnail_url didn't exist
ADD COLUMN IF NOT EXISTS features text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS rating numeric DEFAULT 4.8,
ADD COLUMN IF NOT EXISTS students integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS duration text DEFAULT 'Variable',
ADD COLUMN IF NOT EXISTS enroll_link text;

-- 3. Update RLS policies (re-verifying existing ones)
-- We don't need to change policies as they apply to the table rows/columns generally

-- 4. Comment on columns for clarity
COMMENT ON COLUMN courses.features IS 'List of highlights/learnings for the course';
COMMENT ON COLUMN courses.rating IS 'User rating for social proof';
COMMENT ON COLUMN courses.students IS 'Total enrollment count';
COMMENT ON COLUMN courses.duration IS 'Display text for course length (e.g., 6 Months)';
