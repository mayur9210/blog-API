DROP DATABASE IF EXISTS blog;
CREATE DATABASE blog;

\c blog;


CREATE TABLE post (
  post_id SERIAL PRIMARY KEY,
  title VARCHAR,
  body VARCHAR,
  username VARCHAR,
  date DATE
);

INSERT INTO post (title, body, username, date) VALUES
('This is simple post', 'This is a body text. This is sample text. ', 'admin', 'Sep 25 2009 11:54:33'),
('Another Post', 'This is another post', 'admin', 'Sep 27 2013 06:09:32'),
('Test', 'RSS test', 'admin', 'Sep 27 2009 10:09:22'),
('Test', 'Test', 'admin', 'Sep 27 2009 11:09:39');
