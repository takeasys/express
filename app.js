var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var http = require("http");
var socketio = require("socket.io");
var app = express();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// Create the http server
const server = http.createServer(app);

// Create the Socket IO server on
// the top of http server
const io = socketio(server);

// socket IO
io.on("connection", function (socket) {
  console.log(`${socket.id} is connected`);
});

// view engine setup
// Set directory to contain the templates ('views')
app.set("views", path.join(__dirname, "views"));
// Set view engine to use, jade
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routers middleware
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = { app: app, server: server };
