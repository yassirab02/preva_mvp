-- Seed universities
INSERT INTO universities (name, slug, country, city, is_active, created_at, updated_at) VALUES
    ('Université Mohammed V de Rabat', 'um5-rabat', 'Morocco', 'Rabat', TRUE, NOW(), NOW()),
    ('Université Hassan II de Casablanca', 'uh2-casablanca', 'Morocco', 'Casablanca', TRUE, NOW(), NOW()),
    ('Université Cadi Ayyad de Marrakech', 'uca-marrakech', 'Morocco', 'Marrakech', TRUE, NOW(), NOW()),
    ('Université Sidi Mohamed Ben Abdellah de Fès', 'usmba-fes', 'Morocco', 'Fès', TRUE, NOW(), NOW());

-- Seed majors for UM5 Rabat
INSERT INTO majors (name, slug, duration_years, is_active, university_id, created_at, updated_at)
SELECT
    'Licence Sciences Économiques et Gestion',
    'licence-seg',
    3,
    TRUE,
    id,
    NOW(),
    NOW()
FROM universities WHERE slug = 'um5-rabat';

INSERT INTO majors (name, slug, duration_years, is_active, university_id, created_at, updated_at)
SELECT
    'Licence Droit Privé',
    'licence-droit-prive',
    3,
    TRUE,
    id,
    NOW(),
    NOW()
FROM universities WHERE slug = 'um5-rabat';

INSERT INTO majors (name, slug, duration_years, is_active, university_id, created_at, updated_at)
SELECT
    'Licence Informatique',
    'licence-informatique',
    3,
    TRUE,
    id,
    NOW(),
    NOW()
FROM universities WHERE slug = 'uh2-casablanca';

-- Seed semesters for SEG major
INSERT INTO semesters (number, label, academic_year, is_active, major_id, created_at, updated_at)
SELECT num, lbl, '2024-2025', TRUE, id, NOW(), NOW()
FROM majors, (VALUES (1, 'S1'), (2, 'S2'), (3, 'S3'), (4, 'S4'), (5, 'S5'), (6, 'S6')) AS s(num, lbl)
WHERE majors.slug = 'licence-seg';

-- Seed a sample module for S1
INSERT INTO modules (name, description, "order", is_active, semester_id, created_at, updated_at)
SELECT
    'Mathématiques pour l''économie',
    'Algèbre linéaire, analyse et statistiques pour économistes',
    1,
    TRUE,
    s.id,
    NOW(),
    NOW()
FROM semesters s
JOIN majors m ON s.major_id = m.id
WHERE m.slug = 'licence-seg' AND s.number = 1
LIMIT 1;

INSERT INTO modules (name, description, "order", is_active, semester_id, created_at, updated_at)
SELECT
    'Microéconomie I',
    'Théorie du consommateur et du producteur',
    2,
    TRUE,
    s.id,
    NOW(),
    NOW()
FROM semesters s
JOIN majors m ON s.major_id = m.id
WHERE m.slug = 'licence-seg' AND s.number = 1
LIMIT 1;
