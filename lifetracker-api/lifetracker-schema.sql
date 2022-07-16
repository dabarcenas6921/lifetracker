CREATE TABLE users(
    id              SERIAL PRIMARY KEY,
    username        TEXT NOT NULL,
    password        TEXT NOT NULL,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE nutrition (
    id              SERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    category        TEXT NOT NULL,
    quantity        INTEGER NOT NULL DEFAULT 0,
    calories        INTEGER NOT NULL DEFAULT 0,
    image_url       TEXT NOT NULL,
    user_id         INTEGER NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE exercise (
    id              SERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    category        TEXT NOT NULL,
    duration        INTEGER NOT NULL DEFAULT 0,
    intensity       INTEGER NOT NULL DEFAULT 0,
    user_id         INTEGER NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE sleep (
  id                SERIAL PRIMARY KEY,
  start_time        TIMESTAMP NOT NULL,
  end_time          TIMESTAMP NOT NULL,
  created_at        TIMESTAMP NOT NULL DEFAULT NOW(),
  user_id           INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);