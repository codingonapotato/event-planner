import { Router } from 'express';
import User from '../model/user.model'


export const userRouter = Router();
const user = new User();


userRouter.get('/:id', (req, res) => {
   const id = parseInt(req.params.id);
   user.findUser(id, res);
});

userRouter.post('/:id/:phone_num/:first_name/:last_name/:street/:street_num/:postal_code/:birthdate/:email/:balance', (req, res) => {
   const id = parseInt(req.params.id);
   user.updateUser(id, req, res);
});

export default userRouter;


