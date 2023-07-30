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

userRouter.post('/login', async (req, res) => {
   const id: number = await User.login(req.body.email, req.body.password).then();
   if (id === -1) {
      res.status(401).send('Invalid credentials');
   } else {
      res.status(200).json({'message': 'Login successful!', 'user_id': id});
   }
})

export default userRouter;


