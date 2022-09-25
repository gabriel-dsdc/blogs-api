const express = require('express');
require('express-async-errors');
const loginRoutes = require('./routers/login.router');
const userRoutes = require('./routers/user.router');
const errorMiddleware = require('./middlewares/error.middleware');
// ...

const app = express();

app.use(express.json());

// ...

app.use('/login', loginRoutes);
app.use('/user', userRoutes);

app.use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
