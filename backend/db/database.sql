DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS weekly_schedule;
DROP TABLE IF EXISTS group_members;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS events;


CREATE TABLE students (id SERIAL PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, profile_picture TEXT DEFAULT '/images/default_avatar.png');

CREATE TABLE weekly_schedule (id SERIAL PRIMARY KEY, student_id INTEGER REFERENCES students(id) ON DELETE CASCADE, weekday TEXT CHECK (weekday IN ('Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday')), start_time TIME NOT NULL, end_time TIME NOT NULL);

CREATE TABLE groups (id SERIAL PRIMARY KEY, name TEXT NOT NULL, description TEXT);

CREATE TABLE group_members (id SERIAL PRIMARY KEY, student_id INTEGER REFERENCES students(id) ON DELETE CASCADE, group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE);

CREATE TABLE events (id SERIAL PRIMARY KEY, group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE, title TEXT NOT NULL, description TEXT, weekday TEXT CHECK (weekday IN ('Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday')), start_time TIME NOT NULL, end_time TIME NOT NULL);

INSERT INTO students (first_name, last_name, email, password) VALUES ('rasmus', 'bremholm', 'rasmus.bremholm@gmail.com', 'abc123'), ('alexander', 'petersson', 'alexp@gmail.com', 'abc123');

INSERT INTO weekly_schedule (student_id, weekday, start_time, end_time) VALUES (1, 'Monday', '08:00', '16:00'), (1, 'Wednesday', '08:00','16:00'), (1, 'Friday', '08:00', '16:00'), (2, 'Tuesday', '09:00', '12:00'), (2, 'Thursday', '09:00', '12:00'), (2, 'Friday', '08:00', '11:00');

INSERT INTO groups (name, description) VALUES ('Programmering', 'Programmeringsgruppen på tisdagar vid 10:00 sammlas vi i Tetris och går igenom almäna programmeringskoncept'), ('UX Design', 'I UX gruppen pratar vi om UX Design och läran om användarvänlighet.');

INSERT INTO group_members(student_id, group_id) VALUES (1,1), (2,1),(2,2);

INSERT INTO events (group_id, title, description, weekday, start_time, end_time) VALUES (1, 'Programmering', 'Programmeringsgruppen', 'Tuesday', '10:00', '11:00' ), (2, 'UX', 'UX Design', 'Thursday', '09:00', '11:30' ) ;
