DROP TABLE IF EXISTS posts;

CREATE TABLE posts (id SERIAL PRIMARY KEY, sender_id INTEGER REFERENCES students(id) ON DELETE CASCADE, text TEXT NOT NULL, group_id INTEGER REFERENCES groups(id));

INSERT INTO posts (sender_id, text, group_id) VALUES (1, 'Lorem ipsum schabado text, något viktigt här!', 1);
