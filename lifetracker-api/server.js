const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRouter = require("./routes/auth");
const { NotFoundError } = require("./utils/errors");
const { PORT } = require("./config");
const security = require("./middleware/security");
const app = express();

app.use(cors());

app.use(morgan("tiny"));

app.use(express.json());

/** Convenience middleware to handle common auth cases in routes. */

// extract user from jwt token sent in authorization header
// attach credentials to res.locals.user
app.use(security.extractUserFromJwt);

app.use("/auth", authRouter);

app.use((req, res, next) => {
  return next(new NotFoundError());
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running http://localhost:${PORT}`);
});
