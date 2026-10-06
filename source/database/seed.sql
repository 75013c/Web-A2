-- ============================================================
-- PROG2002 Web Development II - Charity Events website
-- A2 project: D / A2-1  (Bright Path - scholarship theme)
-- Sample data for charityevents_db
--
-- Run schema.sql first, then this file.
--   mysql -u root -p < source/database/seed.sql
--
-- Contents: 4 categories, 3 charity organisations, 8 events.
-- ============================================================

USE charityevents_db;

SET NAMES utf8mb4;

-- Cleared child-first so the foreign keys stay valid on a re-import.
DELETE FROM events;
DELETE FROM categories;
DELETE FROM charities;

-- ------------------------------------------------------------
-- categories
-- ------------------------------------------------------------
INSERT INTO categories (id, name, description) VALUES
  (1, 'Tutoring', 'Small-group and one-to-one tutoring that keeps learners confident in class.'),
  (2, 'Reading', 'Reading circles and literacy support for primary and lower-secondary learners.'),
  (3, 'Supplies', 'Learning kits and classroom materials packed for partner schools.'),
  (4, 'Scholarship', 'Scholarship guidance and mentoring so learners can stay in school.');

-- ------------------------------------------------------------
-- charities
-- ------------------------------------------------------------
INSERT INTO charities (id, name, slug, focus, email, city) VALUES
  (1, 'Bright Path Learning Fund', 'bright-path-learning-fund', 'Scholarship funding', 'fund@brightpath.example', 'Northside'),
  (2, 'Bright Path Mentor Network', 'bright-path-mentor-network', 'Tutoring', 'mentors@brightpath.example', 'Eastfield'),
  (3, 'Bright Path Supplies Circle', 'bright-path-supplies-circle', 'Learning supplies', 'supplies@brightpath.example', 'Pine Ridge');

-- ------------------------------------------------------------
-- events
-- category_id references categories.id, charity_id references charities.id
-- ------------------------------------------------------------
INSERT INTO events
  (id, title, category_id, charity_id, event_date, location, status, image, description, purpose, price, service_type)
VALUES
  (1, 'Scholarship Application Clinic', 4, 1, '2026-10-12', 'Bright Path Learning Hub', 'upcoming', 'L-01.jpg',
   'Help learners understand eligibility, gather documents and plan a strong application.',
   'Guide first-generation learners to complete scholarship applications so they can stay in school.',
   'Free entry', NULL),
  (2, 'School Supply Packing Day', 3, 3, '2026-10-19', 'Northside School Store', 'upcoming', 'L-02.jpg',
   'Assemble practical classroom kits for partner schools before the new term begins.',
   'Give every pupil a ready classroom kit so no child starts the term without the basics.',
   'Free · donations welcome', NULL),
  (3, 'Teacher Resource Exchange', 3, 3, '2026-11-02', 'Pine Ridge School', 'upcoming', 'L-05.jpg',
   'Sort and share reusable teaching resources with local educators.',
   'Keep quality teaching materials in circulation so underfunded schools can reuse them.',
   'Free entry', NULL),
  (4, 'Family Learning Planning', 1, 2, '2026-11-09', 'East Campus', 'upcoming', 'L-08.jpg',
   'Plan a realistic home learning routine with families and school support staff.',
   'Support families to build a steady home learning routine together with school staff.',
   'Free entry', NULL),
  (5, 'Reading Circle Launch', 2, 2, '2026-11-16', 'Northside Library', 'upcoming', 'L-03.jpg',
   'Start a weekly reading circle where primary learners practise reading aloud.',
   'Start a weekly reading circle so primary learners can practise reading aloud in company.',
   'Free entry', NULL),
  (6, 'Scholarship Renewal Workshop', 4, 1, '2026-11-23', 'Bright Path Learning Hub', 'upcoming', 'L-04.jpg',
   'Guide current scholars through renewal paperwork so their funding continues uninterrupted.',
   'Guide current scholars through renewal paperwork so their funding continues without a gap.',
   'Suggested donation 50', NULL),
  (7, 'Homework Club Mentors', 1, 2, '2026-12-05', 'Pine Ridge School', 'upcoming', 'L-06.jpg',
   'Match volunteer tutors with pupils who need steady weekly homework support.',
   'Match volunteer tutors with pupils who need steady weekly homework support.',
   'Free · donations welcome', NULL),
  (8, 'Learning Kit Assembly', 3, 3, '2026-12-12', 'Eastfield Community Hall', 'suspended', 'L-07.jpg',
   'Assemble take-home learning kits for families who have no quiet study space at home.',
   'Assemble take-home learning kits for families who have no quiet study space at home.',
   'Free entry', NULL);
