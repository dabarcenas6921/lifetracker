const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRouter = require("./routes/auth");
const topicRouter = require("./routes/topics");
const { NotFoundError } = require("./utils/errors");
const { PORT } = require("./config");
const security = require("./middleware/security");
const app = express();

app.use(cors());

app.use(morgan("tiny"));

app.use(express.json());

/** Convenience middleware to handle common auth cases in routes. */

//middleware that checks if JWT token exists and verifies it if it does exist.
//if they exist, it extracts the user from the jwt token
//In all the future routes, this helps to know if the request is authenticated or not.
app.use(security.extractUserFromJwt);

app.use("/auth", authRouter);
app.use("/topics/", topicRouter);

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running http://localhost:${PORT}`);
});
