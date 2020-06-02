import express from 'express';
import path from 'path';
import ItemsController from './controller/ItemsController';
import PointsController from './controller/PointsController';

const routes = express.Router();

const itemsController = new ItemsController();
const pointsController = new PointsController();

routes.get('/', (req, resp) => {
  return resp.json({message: 'Server Ok'});
});

routes.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;