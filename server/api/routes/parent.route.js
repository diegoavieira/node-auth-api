import { Router } from 'express';
import wrapAsync from './middlewares/wrap-async';
import { parentController } from '../controllers';
import validate from './middlewares/validate';
import { check } from 'express-validator';
import keycloak from '../../config/keycloak';

const parentRoute = Router();

parentRoute
  .route('/')
  .all(keycloak.protect())
  .post(
    validate([
      check('name')
        .not()
        .isEmpty(),
      check('theme')
        .not()
        .isEmpty(),
      check('auth_url')
        .not()
        .isEmpty(),
      check('realm')
        .not()
        .isEmpty(),
      check('client_id')
        .not()
        .isEmpty()
    ]),
    wrapAsync(parentController.create)
  )
  .get(wrapAsync(parentController.getAll));

parentRoute
  .route('/:id')
  .all(keycloak.protect())
  .get(wrapAsync(parentController.getById))
  .put(wrapAsync(parentController.update))
  .delete(wrapAsync(parentController.delete));

parentRoute.route('/name/:name').get(wrapAsync(parentController.getByName));

export { parentRoute };
