DROP TABLE Users;
DROP TABLE Matches;
DROP TABLE Responses;

CREATE TABLE Users (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  agreed boolean default false,
  sex CHAR(1),
  pref CHAR(1),
  ctype CHAR(1),
  contact VARCHAR(255)
);

CREATE TABLE Responses (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  res1 CHAR(1),
  res2 CHAR(1),
  res3 CHAR(1),
  res4 CHAR(1),
  res5 CHAR(1),
  res6 CHAR(1),
  res7 CHAR(1),
  res8 CHAR(1),
  res9 CHAR(1),
  res10 CHAR(1),
  res11 CHAR(1),
  res12 CHAR(1),
  res13 CHAR(1),
  res14 CHAR(1),
  res15 CHAR(1),
  res16 CHAR(1),
  res17 CHAR(1),
  res18 CHAR(1),
  res19 CHAR(1),
  res20 CHAR(1),
  res21 CHAR(1)
);

CREATE TABLE Matches (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user1 VARCHAR(50) NOT NULL,
  user2 VARCHAR(50) NOT NULL
);