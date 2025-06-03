const clientModel = require('../models/clientModel');


const getClients = async (req, res) => {
  try {
    const clients = await clientModel.getAllClients();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getClient = async (req, res) => {
  try {
    const client = await clientModel.getClientById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createClient = async (req, res) => {
  try {
    const id = await clientModel.createClient(req.body);
    res.status(201).json({ id, message: 'Client created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateClient = async (req, res) => {
  try {
    await clientModel.updateClient(req.params.id, req.body);
    res.json({ message: 'Client updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    await clientModel.deleteClient(req.params.id);
    res.json({ message: 'Client deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
};
