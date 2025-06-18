const db = require("../config/db");

async function getAllFrss() {
  const [rows] = await db.query("SELECT * FROM frss");
  return rows;
}

async function getFrssById(id) {
  const [rows] = await db.query("SELECT * FROM frss WHERE ID = ?", [id]);
  return rows[0];
}

async function createFrss(frss) {
  const { nom, adresse, telephone, email } = frss;
  const [result] = await db.query(
    "INSERT INTO frss (nom, adresse, telephone, email) VALUES (?, ?, ?, ?)",
    [nom, adresse, telephone, email],
  );
  return result.insertId;
}

async function updateFrss(id, frss) {
  const { nom, adresse, telephone, email } = frss;
  await db.query(
    "UPDATE frss SET nom=?, adresse=?, telephone=?, email=? WHERE ID=?",
    [nom, adresse, telephone, email, id],
  );
}

async function deleteFrss(id) {
  await db.query("DELETE FROM frss WHERE ID = ?", [id]);
}

module.exports = {
  getAllFrss,
  getFrssById,
  createFrss,
  updateFrss,
  deleteFrss,
};
