DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
    id INTEGER PRIMARY KEY,
    category TEXT,
    startDate TEXT,
    endDate TEXT,
    needleSize TEXT,
    yarn TEXT,
    designer TEXT,
    thumbnail TEXT,
    image TEXT,
    castOn INT
);