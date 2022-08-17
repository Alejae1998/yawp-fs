-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS yawp_users CASCADE;
DROP TABLE IF EXISTS yawp_restaurants CASCADE;
DROP TABLE IF EXISTS yawp_reviews CASCADE;


CREATE TABLE yawp_users (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    password_hash VARCHAR NOT NULL
);

CREATE TABLE yawp_restaurants (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
name VARCHAR NOT NULL,
type TEXT
);

CREATE TABLE yawp_reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT,
  restaurant_id BIGINT,
  stars INT,
  detail VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) references yawp_users(id),
  FOREIGN KEY (restaurant_id) references yawp_restaurants(id)
);



INSERT INTO yawp_users (email, password_hash) VALUES
('bikini@bottom.com', 'fakePasswordHash'),
('jackie@chan.com', 'fakePasswordHash'),
('powerfull@girls.com', 'fakePasswordHash'),
('dexters@lab.com', 'fakePasswordHash'),
('test2@example.com', '$2b$10$ppw7JtE6dIWepG7/a32TsO2icC6/SJX7O3jjzSlFK8zhL4LuYe5AG');

INSERT INTO yawp_restaurants (name, type) VALUES 
('Cubo', 'Cuban'),
('K-Town', 'Korean'),
('Santorini', 'Greek'),
('QBacano', 'Colombian'),
('Valencia', 'Spanish');

INSERT INTO yawp_reviews (restaurant_id, user_id, stars, detail) VALUES 
(1, 1, 5, 'Best ropa vieja in town'),
(2, 2, 5, 'A little bit to spendy but best korean bbq in pdx'),
(3, 3, 1, 'Tzatziki was really bad'),
(4, 4, 3, 'service is really bad here'),
(5, 5, 5, 'Omg paella here is amazing!');




