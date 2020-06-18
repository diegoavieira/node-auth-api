import { Router } from 'express';
import { check } from 'express-validator';
import { parentController } from '../controllers';
import { validate, jwtCheck, wrapAsync } from '../middlewares';

const parentRoute = Router();

parentRoute
  .route('/')
  .all(jwtCheck())
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
  .all(jwtCheck())
  .get(wrapAsync(parentController.getById))
  .put(wrapAsync(parentController.update))
  .delete(wrapAsync(parentController.delete));

parentRoute.route('/name/:name').get(wrapAsync(parentController.getByName));

export { parentRoute };
