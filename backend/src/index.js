import logger from './logger';
import app from './app';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  logger.info(`App is listening on ${PORT}`);
});
