import express from 'express';
import User from '../models/user/user.model';

//Utils
import { hmm } from '../utils/walrus-tools';
import { lowercaseProps } from '../utils/utils';

//Types
import { UserReqBody } from './user-req-res.types';

const router = express.Router({ mergeParams: true });

//Get all users
router.get('/users', (req, res) => {
   try {
      User.find()
         .sort({ date_created: 'desc' })
         .then((users) => res.json({ users }));
   } catch (error) {
      const { name, message }: Error = error;
      res.status(400).send({ error: { name, message } });
   }
});

//Create User
router.post('/users/new', async (req, res) => {
   try {
      const body: UserReqBody = req.body;
      const newUser = await User.create(lowercaseProps(body));
      res.json({ message: 'User Created', newUser });
   } catch (error) {
      const { name, message }: Error = error;
      res.status(400).send({ error: { name, message } });
   }
});

export default router;
