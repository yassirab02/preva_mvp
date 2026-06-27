CREATE TABLE students (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id),
    university_id BIGINT REFERENCES universities(id),
    major_id BIGINT REFERENCES majors(id),
    requested_university VARCHAR(255),
    requested_major VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE enrollment_officers (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id),
    staff_code VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE officer_universities (
    officer_id BIGINT NOT NULL REFERENCES enrollment_officers(id),
    university_id BIGINT NOT NULL REFERENCES universities(id),
    PRIMARY KEY (officer_id, university_id)
);

CREATE INDEX idx_students_user ON students(user_id);
CREATE INDEX idx_students_university ON students(university_id);
CREATE INDEX idx_officers_user ON enrollment_officers(user_id);
