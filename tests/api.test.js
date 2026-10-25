const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
const { createApp, RESOURCES } = require('../app');

let mongod;
let client;
let app;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  client = new MongoClient(mongod.getUri());
  await client.connect();
  app = createApp(client.db('gestion_client_test'));
});

afterAll(async () => {
  await client.close();
  await mongod.stop();
});

describe('API Gestion Clients', () => {
  test('GET /health répond ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test.each(RESOURCES.map((r) => r.path))('GET /api/%s répond une liste', async (path) => {
    const res = await request(app).get(`/api/${path}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('cycle CRUD complet sur /api/clients', async () => {
    const created = await request(app)
      .post('/api/clients')
      .send({ nom: 'Client Test', email: 'client@test.local', telephone: '0600000000' });
    expect(created.status).toBe(201);
    const id = created.body._id;
    expect(id).toBeDefined();

    const read = await request(app).get(`/api/clients/${id}`);
    expect(read.status).toBe(200);
    expect(read.body.nom).toBe('Client Test');

    const updated = await request(app).put(`/api/clients/${id}`).send({ telephone: '0611111111', _id: 'ignore' });
    expect(updated.status).toBe(200);
    expect(updated.body.telephone).toBe('0611111111');
    expect(updated.body._id).toBe(id);

    const list = await request(app).get('/api/clients');
    expect(list.body.map((c) => c._id)).toContain(id);

    const deleted = await request(app).delete(`/api/clients/${id}`);
    expect(deleted.status).toBe(204);

    const gone = await request(app).get(`/api/clients/${id}`);
    expect(gone.status).toBe(404);
  });

  test('champs obligatoires manquants : 400', async () => {
    const res = await request(app).post('/api/fournisseurs').send({ adresse: 'Casablanca' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/nom/);
  });

  test('identifiant invalide : 400 au lieu d\'une erreur serveur', async () => {
    const res = await request(app).get('/api/produits/pas-un-id');
    expect(res.status).toBe(400);
  });

  test('identifiant inexistant : 404', async () => {
    const res = await request(app).delete('/api/produits/507f1f77bcf86cd799439011');
    expect(res.status).toBe(404);
  });

  test('JSON invalide : 400', async () => {
    const res = await request(app)
      .post('/api/secteurs')
      .set('Content-Type', 'application/json')
      .send('{"nom":');
    expect(res.status).toBe(400);
  });

  test('route inconnue : 404', async () => {
    const res = await request(app).get('/api/inconnu');
    expect(res.status).toBe(404);
  });
});
