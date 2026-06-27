CREATE TYPE exam_status AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE question_type AS ENUM ('QCM', 'OPEN');

CREATE TABLE exams (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    year INT NOT NULL,
    duration_minutes INT NOT NULL,
    total_points DECIMAL(10,2) NOT NULL,
    passing_score DECIMAL(10,2) NOT NULL,
    status exam_status NOT NULL DEFAULT 'DRAFT',
    module_id BIGINT NOT NULL REFERENCES modules(id),
    source_pdf_url VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE questions (
    id BIGSERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    points DECIMAL(10,2) NOT NULL,
    "order" INT NOT NULL DEFAULT 0,
    correct_answer TEXT,
    explanation TEXT,
    question_type question_type NOT NULL DEFAULT 'QCM',
    exam_id BIGINT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE choices (
    id BIGSERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    "order" INT NOT NULL DEFAULT 0,
    question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_exams_module ON exams(module_id);
CREATE INDEX idx_exams_status ON exams(status);
CREATE INDEX idx_questions_exam ON questions(exam_id);
CREATE INDEX idx_choices_question ON choices(question_id);
