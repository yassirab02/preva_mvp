CREATE TYPE session_status AS ENUM ('IN_PROGRESS', 'COMPLETED', 'ABANDONED');

CREATE TABLE exam_sessions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    exam_id BIGINT NOT NULL REFERENCES exams(id),
    status session_status NOT NULL DEFAULT 'IN_PROGRESS',
    score DECIMAL(10,2),
    percentage_score DECIMAL(5,2),
    is_passed BOOLEAN,
    started_at TIMESTAMP NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE user_answers (
    id BIGSERIAL PRIMARY KEY,
    session_id BIGINT NOT NULL REFERENCES exam_sessions(id),
    question_id BIGINT NOT NULL REFERENCES questions(id),
    choice_id BIGINT REFERENCES choices(id),
    text_answer TEXT,
    is_correct BOOLEAN,
    points_earned DECIMAL(10,2),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(session_id, question_id)
);

CREATE INDEX idx_exam_sessions_user ON exam_sessions(user_id);
CREATE INDEX idx_exam_sessions_exam ON exam_sessions(exam_id);
CREATE INDEX idx_exam_sessions_status ON exam_sessions(status);
CREATE INDEX idx_user_answers_session ON user_answers(session_id);
