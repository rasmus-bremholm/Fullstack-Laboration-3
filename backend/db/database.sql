DROP TABLE IF EXISTS users;
CREATE TABLE users (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, is_admin BOOLEAN, email TEXT, password TEXT);
INSERT INTO users (first_name, last_name, is_admin, email, password) VALUES ('rasmus', 'bremholm', true, 'rasmus.bremholm@gmail.com', 'abc123');
