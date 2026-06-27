CREATE TABLE universities (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    logo_url VARCHAR(500),
    country VARCHAR(100) NOT NULL DEFAULT 'Morocco',
    city VARCHAR(100) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE majors (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    duration_years INT NOT NULL DEFAULT 3,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    university_id BIGINT NOT NULL REFERENCES universities(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(slug, university_id)
);

CREATE TABLE semesters (
    id BIGSERIAL PRIMARY KEY,
    number INT NOT NULL,
    label VARCHAR(100) NOT NULL,
    academic_year VARCHAR(20),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    major_id BIGINT NOT NULL REFERENCES majors(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE modules (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    "order" INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    cover_image_url VARCHAR(500),
    semester_id BIGINT NOT NULL REFERENCES semesters(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_majors_university ON majors(university_id);
CREATE INDEX idx_semesters_major ON semesters(major_id);
CREATE INDEX idx_modules_semester ON modules(semester_id);
