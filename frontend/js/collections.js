import {
  getCollections,
  addCollection,
  updateCollection,
  deleteCollection,
  getCollection
} from './api.js';

const tbody = document.getElementById('collections-table-body');
const form = document.getElementById('form-collection');

// Charger toutes les collections
async function loadCollections() {
  if (!tbody) return;

  try {
    const collections = await getCollections();
    tbody.innerHTML = '';

    collections.forEach(collection => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${collection.id}</td>
        <td>${collection.nom}</td>
        <td>${collection.description || ''}</td>
        <td>
          <a href="edit.html?id=${collection.id}" class="btn btn-sm btn-primary me-2">Modifier</a>
          <button class="btn btn-sm btn-danger" data-id="${collection.id}">Supprimer</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('button.btn-danger').forEach(button => {
      button.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        if (confirm("Confirmer la suppression de cette collection ?")) {
          await deleteCollection(id);
          loadCollections();
        }
      });
    });
  } catch (error) {
    alert("Erreur lors du chargement des collections : " + error.message);
  }
}

// Ajouter une nouvelle collection
async function handleAddCollection(event) {
  event.preventDefault();

  const nom = document.getElementById('nom').value.trim();
  const description = document.getElementById('description').value.trim();

  if (!nom) {
    alert("Le nom est obligatoire.");
    return;
  }

  try {
    await addCollection({ nom, description });
    alert("Collection ajoutée avec succès !");
    window.location.href = 'list.html';
  } catch (error) {
    alert("Erreur lors de l'ajout : " + error.message);
  }
}

// Pré-remplir le formulaire d'édition
async function loadCollectionToEdit() {
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  try {
    const collection = await getCollection(id);
    document.getElementById('nom').value = collection.nom;
    document.getElementById('description').value = collection.description || '';
  } catch (error) {
    alert("Erreur lors du chargement de la collection : " + error.message);
  }
}

// Modifier une collection
async function handleEditCollection(event) {
  event.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return alert("ID de collection manquant.");

  const nom = document.getElementById('nom').value.trim();
  const description = document.getElementById('description').value.trim();

  if (!nom) {
    alert("Le nom est obligatoire.");
    return;
  }

  try {
    await updateCollection(id, { nom, description });
    alert("Collection mise à jour !");
    window.location.href = 'list.html';
  } catch (error) {
    alert("Erreur lors de la mise à jour : " + error.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadCollections();

  if (form) {
    if (!new URLSearchParams(window.location.search).get('id')) {
      form.addEventListener('submit', handleAddCollection);
    } else {
      loadCollectionToEdit();
      form.addEventListener('submit', handleEditCollection);
    }
  }
});
