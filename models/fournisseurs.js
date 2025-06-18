// models/fournisseur.js
const mongoose = require('mongoose');

const fournisseurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  adresse: String,
  telephone: String,
  email: String
});

module.exports = mongoose.model('Fournisseur', fournisseurSchema);
