import { getClients, addClient, updateClient, deleteClient, getClient } from './api.js';

const tbody = document.getElementById('clients-table-body');
const form = document.getElementById('form-client');

async function loadClients() {
  if (!tbody) return;
  try {
    const clients = await getClients();
    tbody.innerHTML = '';

    clients.forEach(client => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${client.id}</td>
        <td>${client.nom}</td>
        <td>${client.email}</td>
        <td>${client.telephone || ''}</td>
        <td>
          <a href="edit.html?id=${client.id}" class="btn btn-primary btn-sm me-2">Modifier</a>
          <button class="btn btn-danger btn-sm" data-id="${client.id}">Supprimer</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('button.btn-danger').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        if (confirm("Confirmer la suppression ?")) {
          await deleteClient(id);
          loadClients();
        }
      });
    });
  } catch (error) {
    alert("Erreur lors du chargement des clients : " + error.message);
  }
}

// Gestion ajout client (dans add.html)
async function handleAddClient(event) {
  event.preventDefault();
  const nom = document.getElementById('nom').value.trim();
  const email = document.getElementById('email').value.trim();
  const telephone = document.getElementById('telephone').value.trim();

  if (!nom || !email) {
    alert("Nom et email sont obligatoires.");
    return;
  }

  try {
    await addClient({ nom, email, telephone });
    alert("Client ajouté avec succès !");
    window.location.href = 'list.html';
  } catch (error) {
    alert("Erreur lors de l'ajout : " + error.message);
  }
}

// Gestion édition client (dans edit.html)
async function loadClientToEdit() {
  if (!form) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  try {
    const client = await getClient(id);
    document.getElementById('nom').value = client.nom;
    document.getElementById('email').value = client.email;
    document.getElementById('telephone').value = client.telephone || '';
  } catch (error) {
    alert("Erreur lors du chargement du client : " + error.message);
  }
}

async function handleEditClient(event) {
  event.preventDefault();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return alert("ID client manquant");

  const nom = document.getElementById('nom').value.trim();
  const email = document.getElementById('email').value.trim();
  const telephone = document.getElementById('telephone').value.trim();

  if (!nom || !email) {
    alert("Nom et email sont obligatoires.");
    return;
  }

  try {
    await updateClient(id, { nom, email, telephone });
    alert("Client mis à jour avec succès !");
    window.location.href = 'list.html';
  } catch (error) {
    alert("Erreur lors de la mise à jour : " + error.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadClients();

  if (form) {
    

    if (!new URLSearchParams(window.location.search).get('id')) {
      form.addEventListener('submit', handleAddClient);
    } else {
     
      loadClientToEdit();
      form.addEventListener('submit', handleEditClient);
    }
  }
});
