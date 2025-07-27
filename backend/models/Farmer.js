import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  location: String,
});

const Farmer = mongoose.model('Farmer', farmerSchema);

export default Farmer;
