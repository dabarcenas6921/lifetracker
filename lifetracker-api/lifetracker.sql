
\echo 'Delete and recreate lifetracker db?'
\prompt 'Return yes or control-C to cancel >' answer

DROP DATABASE lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker;

\i lifetracker-schema.sql