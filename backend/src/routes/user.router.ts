import { Router } from 'express';
import * as User from '../model/user.model';
import { registerUser } from '../model/user.model';

export const userRouter = Router();

userRouter.get('/:id', async (req, res) => {
   const id = parseInt(req.params.id);
   User.findUser(id)
      .then((result) => {
         if (result === -1) {
            res.status(404).send('User not found')
         } else {
            res.status(200).send(result);
         }
      })
      .catch((err) => {
         res.status(500).send('Database query failed');
      });
});

userRouter.post('/:id/modify-user', (req, res) => {
   const id = parseInt(req.params.id);
   User.updateUser(id, req).then((result) => {
      if (result === -1) {
         res.status(404).send(`User information for user with id = ${id} could not be modified`);
      } else {
         res.status(200).send(result);
      }
   }).catch((err) => {
      res.status(500).send('Database query failed');
   });
});

userRouter.post('/login', async (req, res) => {
   const id: number = await User.login(req.body.email, req.body.password).then();
   if (id === -1) {
      res.status(401).send('Invalid credentials');
   } else {
      res.status(200).json({ 'message': 'Login successful!', 'user_id': id });
   }
})

userRouter.post('/register', async (req, res) => {
   const firstName: string = req.body.firstName;
   const lastName: string = req.body.lastName;
   const email: string = req.body.email;
   const password: string = req.body.password;
   const birthdate: Date = new Date(req.body.birthdate);

   const params: any[] = [firstName, lastName, email, password, birthdate];
   registerUser(params).then((result) => {
      res.status(200).json({ 'message': 'Registration successful!', 'user_id': result });
   }).catch((err) => {
      console.log(err);
      res.status(401).json({ message: 'User with this email already exists', error: err });
   });
})

export default userRouter;
