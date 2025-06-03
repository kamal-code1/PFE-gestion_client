

let offres = [
  { id: 1, titre: 'Offre 1', prix: 100 },
  { id: 2, titre: 'Offre 2', prix: 200 }
];

module.exports = {
  getAll: async () => offres,
  getById: async (id) => offres.find(o => o.id === parseInt(id)),
  create: async (data) => {
    const newId = offres.length + 1;
    const newOffre = { id: newId, ...data };
    offres.push(newOffre);
    return newId;
  },
  update: async (id, data) => {
    const index = offres.findIndex(o => o.id === parseInt(id));
    if (index !== -1) offres[index] = { ...offres[index], ...data };
  },
  delete: async (id) => {
    offres = offres.filter(o => o.id !== parseInt(id));
  }
};
