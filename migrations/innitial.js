const sqlite3 = require("sqlite3");

//Connecting to database
const db = new sqlite3.Database("./db/geoguessr.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
});


//Create table
let sql = [`CREATE TABLE Users(user_id INTEGER PRIMARY KEY,
                              username VARCHAR(255) NOT NULL,
                              email VARCHAR(255) NOT NULL,
                              password VARCHAR(255) NOT NULL,
                              name VARCHAR(255) NOT NULL)`,

           `CREATE TABLE Scores(score_id INTEGER PRIMARY KEY,
                               timestamp INTEGER NOT NULL,
                               points INTEGER NOT NULL,
                               user_id INTEGER REFERENCES Users(user_id))`
];

for(let query of sql) {
    db.run(query);
}


