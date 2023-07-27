import { Router } from 'express';
import * as User from '../model/user.model'

export const userRouter = Router();

userRouter.get('/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   User.findUser(id)
   .then((result) => {
      if (result.rows.length === 0) {
         res.status(404).send('User not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 

export default userRouter;


