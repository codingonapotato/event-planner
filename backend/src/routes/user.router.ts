import { Router } from 'express';
// import { User, registerUser } from '../model/user.model'
import User from '../model/user.model';
import { registerUser } from '../model/user.model';


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

userRouter.post('/login', async (req, res) => {
   const id: number = await user.login(req.body.email, req.body.password).then();
   if (id === -1) {
      res.status(401).send('Invalid credentials');
   } else {
      res.status(200).json({'message': 'Login successful!', 'user_id': id});
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
      res.status(200).json({'message': 'Registration successful!', 'user_id': result});
   }).catch((err) => {
      console.log(err);
      res.status(401).json({message: 'User with this email already exists', error: err});
   });
})

export default userRouter;

