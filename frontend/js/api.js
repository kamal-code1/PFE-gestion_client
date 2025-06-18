const API_BASE_URL = "http://localhost:3000/api"; 

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erreur API: ${errorText}`);
  }
  return response.json();
}



export async function getClients() {
  return fetchJSON(`${API_BASE_URL}/clients`);
}

export async function getClient(id) {
  return fetchJSON(`${API_BASE_URL}/clients/${id}`);
}

export async function addClient(data) {
  return fetchJSON(`${API_BASE_URL}/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateClient(id, data) {
  return fetchJSON(`${API_BASE_URL}/clients/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteClient(id) {
  return fetchJSON(`${API_BASE_URL}/clients/${id}`, {
    method: "DELETE",
  });
}



export async function getProduits() {
  return fetchJSON(`${API_BASE_URL}/produits`);
}

export async function addProduit(data) {
  return fetchJSON(`${API_BASE_URL}/produits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateProduit(id, data) {
  return fetchJSON(`${API_BASE_URL}/produits/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteProduit(id) {
  return fetchJSON(`${API_BASE_URL}/produits/${id}`, {
    method: "DELETE",
  });
}

