-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS yawp_users;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE yawp_users (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    password_hash VARCHAR NOT NULL
);

CREATE TABLE restaurants (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
name VARCHAR NOT NULL,
cusine VARCHAR
);

CREATE TABLE reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ranking SMALLINT CONSTRAINT five_start_scale CHECK(ranking BETWEEN 1 AND 5),
  content VARCHAR NOT NULL,
  user_id BIGINT,
  restaurants_id BIGINT,
  FOREIGN KEY (user_id) REFERENCES yawp_users(id),
  FOREIGN KEY (restaurants_id) REFERENCES restaurants(id)
);

INSERT INTO yawp_users (email, password_hash) VALUES
('bikini@bottom.com', 'fakePassword_hash'),
('jackie@chan.com', 'fakePassword_hash'),
('powerfull@girls.com', 'fakePassword_hash'),
('dexters@lab.com', 'fakePassword_hash'),
('test@example.com', '$2b$10$ppw7JtE6dIWepG7/a32TsO2icC6/SJX7O3jjzSlFK8zhL4LuYe5AG');

INSERT INTO restaurants (name, cusine) VALUES 
('Cubo', 'Cuban'),
('K-Town', 'Korean'),
('Santorini', 'Greek'),
('QBacano', 'Colombian'),
('Valencia', 'Spanish');

INSERT INTO reviews (ranking, content, user_id, restaurants_id) VALUES 
(5, 'Best ropa vieja in town', 1, 1),
(5, 'A little bit to spendy but best korean bbq in pdx', 2, 2),
(1, 'Tzatziki was really bad', 3, 3),
(3, 'service is really bad here', 4, 4),
(5, 'Omg paella here is amazing!', 5, 5);


