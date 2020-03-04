import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import routes from '../routes';
import { envs, isProd } from '../config/environments';

export default app => {
  app.disable('x-powered-by');

  app.set('port', envs.port);
  app.set('json spaces', 2);

  if (isProd) {
    app.use(compression());
  } else {
    app.use(morgan('dev'));
  }

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/v1', routes);

  app.use('*', (req, res) => {
    res
      .status(404)
      .json({ message: `Route ${req.originalUrl} does not exists.` });
  });

  app.use((err, req, res) => {
    res.json({ message: err.message });
  });
};
