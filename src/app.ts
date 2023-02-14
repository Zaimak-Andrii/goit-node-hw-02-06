import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import contactsRouter from 'routes/api/contacts.route';
import usersRouter from 'routes/api/users.route';
import { errorMiddleware } from './middlewares/errors.middleware';
import { responseError } from 'helpers/apiHelpers';
import { RouteNotFoundError } from 'helpers/errors';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use((_, res) => {
  res.status(404).json(responseError(new RouteNotFoundError()));
});

app.use(errorMiddleware);

export default app;
