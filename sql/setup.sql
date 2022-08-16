-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS yawp_users CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS reviews_restaurants CASCADE;

CREATE TABLE yawp_users (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    password_hash VARCHAR NOT NULL
);

CREATE TABLE restaurants (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
name VARCHAR NOT NULL,
cusine VARCHAR NOT NULL
);

CREATE TABLE reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  yawp_user_id INT,
  restaurants_id BIGINT,
  FOREIGN KEY (yawp_user_id) references yawp_users(id),
  stars int not null,
  detail VARCHAR
);

CREATE TABLE reviews_restaurants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
reviews_id int,
restaurants_id int,
FOREIGN KEY (reviews_id) references reviews(id),
FOREIGN KEY (restaurants_id) references restaurants(id)
);

INSERT INTO yawp_users (email, password_hash) VALUES
('bikini@bottom.com', 'fakePasswordHash'),
('jackie@chan.com', 'fakePasswordHash'),
('powerfull@girls.com', 'fakePasswordHash'),
('dexters@lab.com', 'fakePasswordHash'),
('test2@example.com', '$2b$10$ppw7JtE6dIWepG7/a32TsO2icC6/SJX7O3jjzSlFK8zhL4LuYe5AG');

INSERT INTO restaurants (name, cusine) VALUES 
('Cubo', 'Cuban'),
('K-Town', 'Korean'),
('Santorini', 'Greek'),
('QBacano', 'Colombian'),
('Valencia', 'Spanish');

INSERT INTO reviews (stars, detail) VALUES 
(5, 'Best ropa vieja in town'),
(5, 'A little bit to spendy but best korean bbq in pdx'),
(1, 'Tzatziki was really bad'),
(3, 'service is really bad here'),
(5, 'Omg paella here is amazing!');

INSERT INTO reviews_restaurants (restaurants_id, reviews_id) VALUES 
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);


