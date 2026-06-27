CREATE TYPE registration_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE access_type AS ENUM ('TRIAL', 'FULL');

CREATE TABLE registration_requests (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL REFERENCES students(id),
    requested_university VARCHAR(255) NOT NULL,
    requested_major VARCHAR(255) NOT NULL,
    status registration_status NOT NULL DEFAULT 'PENDING',
    rejection_reason TEXT,
    reviewed_by BIGINT REFERENCES users(id),
    submitted_at TIMESTAMP NOT NULL DEFAULT NOW(),
    reviewed_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE access_controls (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL REFERENCES students(id),
    semester_id BIGINT NOT NULL REFERENCES semesters(id),
    access_type access_type NOT NULL DEFAULT 'TRIAL',
    granted_by BIGINT NOT NULL REFERENCES users(id),
    granted_at TIMESTAMP NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_registration_requests_student ON registration_requests(student_id);
CREATE INDEX idx_registration_requests_status ON registration_requests(status);
CREATE INDEX idx_access_controls_student ON access_controls(student_id);
CREATE INDEX idx_access_controls_semester ON access_controls(semester_id);
