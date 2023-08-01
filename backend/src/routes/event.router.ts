import { Router, response } from 'express';
import * as Event from '../model/event.model'


export const eventRouter = Router();

eventRouter.get('/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   Event.findEvent(id)
   .then((result) => {
      if (result.rows.length === 0) {
         res.status(404).send('event not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      console.log(err);
      res.status(500).send('Database query failed');
   });
}); 

eventRouter.get('/', async (req, response) => {
   if (req.query.city) {
      console.log(req.query.city);
      const city: string = req.query.city as string;
      Event.findEventByCity(city).then(res => {
         response.status(200).send(res);
      }).catch((err) => {
         console.log(err);
         response.status(500).send('Database error')   
      });
   } else if (req.query.province) {
      console.log(req.query.province);
      const province: string = req.query.province as string;
      Event.findEventByProvince(province).then((res) => {
         response.status(200).send(res);
      }).catch((err) => {
         console.log(err);
         response.status(500).send('Database error')   
      });
   } else {
      response.send(404).send('No query specified');
   }
});

eventRouter.post('/', async (req, response) => {

});

export default eventRouter;


