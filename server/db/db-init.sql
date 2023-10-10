DROP TABLE IF EXISTS "LinksUser"        CASCADE;
DROP TABLE IF EXISTS "LinksTutorial"    CASCADE;
DROP TABLE IF EXISTS "LinksFile"        CASCADE;

CREATE TABLE "LinksUser" (
    username        VARCHAR(30)     PRIMARY KEY,
    email           VARCHAR(40),
    password        VARCHAR(60),
    last_tutorial   INTEGER,
    is_admin        BOOLEAN         DEFAULT false
);

CREATE TABLE "LinksTutorial" (
    tutorial_id     SERIAL          PRIMARY KEY,
    title           VARCHAR(50),
    description     VARCHAR(10000),
    source          VARCHAR(10000)
);

CREATE TABLE "LinksFile" (
    data            VARCHAR(10000),
    tutorial_id     INTEGER         REFERENCES "LinksTutorial" (tutorial_id)    ON DELETE CASCADE,
    username        VARCHAR(30)     REFERENCES "LinksUser" (username)           ON DELETE CASCADE,
    PRIMARY KEY (tutorial_id, username)
);