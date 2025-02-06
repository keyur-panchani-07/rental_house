const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  name: String,
  email: { type: String, unique: true, required: true },
  image: String,
  bookedVisits: [mongoose.Schema.Types.Mixed],
  favResidenciesID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Residency' }],
  ownedResidencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Residency' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
