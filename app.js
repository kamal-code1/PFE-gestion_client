const express = require('express');
const app = express();
require('dotenv').config();

// استيراد كل الراوترات
const catalogueRoutes = require('./routes/catalogueRoutes');
const clientRoutes = require('./routes/clientRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const collectionProduitsRoutes = require('./routes/collectionProduitsRoutes');
const frssRoutes = require('./routes/frssRoutes');
const ligneOffreRoutes = require('./routes/ligneOffreRoutes');
const offresRoutes = require('./routes/offresRoutes');
const produitsRoutes = require('./routes/produitsRoutes');
const secteurActiviteRoutes = require('./routes/secteurActiviteRoutes');

app.use(express.json());

// ربط الراوترات بالمسارات المناسبة
app.use('/api/catalogue', catalogueRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/collection', collectionRoutes);
app.use('/api/collection_produits', collectionProduitsRoutes);
app.use('/api/frss', frssRoutes);
app.use('/api/ligneoffre', ligneOffreRoutes);
app.use('/api/offres', offresRoutes);
app.use('/api/produits', produitsRoutes);
app.use('/api/secteur_activite', secteurActiviteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
