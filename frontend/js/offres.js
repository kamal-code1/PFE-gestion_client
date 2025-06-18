import { getOffres, addOffre, updateOffre, deleteOffre, getOffre } from './api.js';

const tbody = document.getElementById('offres-table-body');
const form = document.getElementById('form-offre');

// Charger et afficher la liste des offres
async function loadOffres() {
  if (!tbody) return;
  try {
    const offres = await getOffres();
    tbody.innerHTML = '';

    offres.forEach(offre => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${offre.id}</td>
        <td>${offre.description}</td>
        <td>${offre.dateoffre}</td>
        <td>${offre.client_id}</td>
        <td>
          <a href="edit.html?id=${offre.id}" class="btn btn-primary btn-sm me-2">Modifier</a>
          <button class="btn btn-danger btn-sm" data-id="${offre.id}">Supprimer</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('button.btn-danger').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        if (confirm("Confirmer la suppression de cette offre ?")) {
          await deleteOffre(id);
          loadOffres();
        }
      });
    });
  } catch (error) {
    alert("Erreur lors du chargement des offres : " + error.message);
  }
}

// Gestion ajout offre
async function handleAddOffre(event) {
  event.preventDefault();

  const description = document.getElementById('description').value.trim();
  const dateoffre = document.getElementById('dateoffre').value;
  const client_id = document.getElementById('client_id').value;

  if (!description || !dateoffre || !client_id) {
    alert("Tous les champs sont obligatoires.");
    return;
  }

  try {
    await addOffre({ description, dateoffre, client_id });
    alert("Offre ajoutée avec succès !");
    window.location.href = 'list.html';
  } catch (error) {
    alert("Erreur lors de l'ajout : " + error.message);
  }
}

// Chargement offre pour édition
async function loadOffreToEdit() {
  if (!form) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  try {
    const offre = await getOffre(id);
    document.getElementById('description').value = offre.description;
    document.getElementById('dateoffre').value = offre.dateoffre;
    document.getElementById('client_id').value = offre.client_id;
  } catch (error) {
    alert("Erreur lors du chargement de l'offre : " + error.message);
  }
}

// Gestion édition offre
async function handleEditOffre(event) {
  event.preventDefault();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return alert("ID de l'offre manquant");

  const description = document.getElementById('description').value.trim();
  const dateoffre = document.getElementById('dateoffre').value;
  const client_id = document.getElementById('client_id').value;

  if (!description || !dateoffre || !client_id) {
    alert("Tous les champs sont obligatoires.");
    return;
  }

  try {
    await updateOffre(id, { description, dateoffre, client_id });
    alert("Offre mise à jour avec succès !");
    window.location.href = 'list.html';
  } catch (error) {
    alert("Erreur lors de la mise à jour : " + error.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadOffres();

  if (form) {
    if (!new URLSearchParams(window.location.search).get('id')) {
      form.addEventListener('submit', handleAddOffre);
    } else {
      loadOffreToEdit();
      form.addEventListener('submit', handleEditOffre);
    }
  }
});
