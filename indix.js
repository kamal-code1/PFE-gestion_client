const express = require('express');
const app = express();
const port = 4000;

app.get('/test', (req, res) => {
  res.send('✅ Route /test fonctionnelle !');
});

app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
});
