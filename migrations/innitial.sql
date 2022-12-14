CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY,
                              username VARCHAR(255) NOT NULL,
                              email VARCHAR(255) NOT NULL,
                              password VARCHAR(255) NOT NULL,
                              name VARCHAR(255) NOT NULL);

CREATE TABLE IF NOT EXISTS Scores(score_id INTEGER PRIMARY KEY,
                    timestamp INTEGER NOT NULL,
                    points INTEGER NOT NULL,
                    user_id INTEGER REFERENCES Users(user_id));