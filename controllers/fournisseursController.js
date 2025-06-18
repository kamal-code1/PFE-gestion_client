const Fournisseur = require('../models/fournisseurs');

exports.listerFournisseurs = async (req, res) => {
  try {
    const fournisseurs = await Fournisseur.find();
    res.json(fournisseurs);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getFournisseur = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findById(req.params.id);
    if (!fournisseur) return res.status(404).json({ message: 'Fournisseur non trouvé' });
    res.json(fournisseur);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.ajouterFournisseur = async (req, res) => {
  try {
    const fournisseur = new Fournisseur(req.body);
    await fournisseur.save();
    res.status(201).json(fournisseur);
  } catch (err) {
    res.status(400).json({ message: 'Données invalides', error: err.message });
  }
};

exports.modifierFournisseur = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fournisseur) return res.status(404).json({ message: 'Fournisseur non trouvé' });
    res.json(fournisseur);
  } catch (err) {
    res.status(400).json({ message: 'Erreur de modification' });
  }
};

exports.supprimerFournisseur = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findByIdAndDelete(req.params.id);
    if (!fournisseur) return res.status(404).json({ message: 'Fournisseur non trouvé' });
    res.json({ message: 'Fournisseur supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

