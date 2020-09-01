import mongoose from 'mongoose';
import { CreatureInterface } from './creature-creator';

const creatureSchema = new mongoose.Schema({
   name: String,
   email: String,
   type: String,
   temperament: String,
   date_created: { type: Date, default: Date.now() },
   features: [{ type: String, _id: false }],
   favorite_foods: [{ type: String, _id: false }],
   hobbies: [{ type: String, _id: false }],
   friends: [{ type: mongoose.Types.ObjectId, ref: 'Creature' }],
});

//Second generic is query helpers
const Creature = mongoose.model<CreatureInterface & mongoose.Document>(
   'Creature',
   creatureSchema
);

export default Creature;
