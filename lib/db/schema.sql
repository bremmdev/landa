DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    category TEXT,
    owner TEXT,
    startDate TEXT,
    endDate TEXT,
    needleSize TEXT,
    yarn TEXT,
    designer TEXT,
    imageUrl TEXT,
    castOn INT
);