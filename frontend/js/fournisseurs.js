import {
  getFournisseurs,
  getFournisseur,
  addFournisseur,
  updateFournisseur,
  deleteFournisseur
} from './api.js';

const tbody = document.getElementById('fournisseurs-table-body');
const form = document.getElementById('form-fournisseur');


async function loadFournisseurs() {
  if (!tbody) return;

  try {
    const fournisseurs = await getFournisseurs();
    tbody.innerHTML = '';

    fournisseurs.forEach(frs => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${frs.id}</td>
        <td>${frs.nom}</td>
        <td>${frs.adresse || ''}</td>
        <td>${frs.telephone || ''}</td>
        <td>${frs.email || ''}</td>
        <td>
          <a href="edit.html?id=${frs.id}" class="btn btn-sm btn-primary me-2">Modifier</a>
          <button class="btn btn-sm btn-danger" data-id="${frs.id}">Supprimer</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('button.btn-danger').forEach(button => {
      button.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        if (confirm("Supprimer ce fournisseur ?")) {
          await deleteFournisseur(id);
          loadFournisseurs();
        }
      });
    });
  } catch (error) {
    alert("Erreur lors du chargement des fournisseurs : " + error.message);
  }
}


async function handleAddFournisseur(event) {
  event.preventDefault();

  const nom = document.getElementById('nom').value.trim();
  const adresse = document.getElementById('adresse').value.trim();
  const telephone = document.getElementById('telephone').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nom) {
    alert("Le nom est obligatoire.");
    return;
  }

  try {
    await addFournisseur({ nom, adresse, telephone, email });
    alert("Fournisseur ajouté avec succès !");
    window.location.href = 'list.html';
  } catch (error) {
    alert("Erreur lors de l'ajout : " + error.message);
  }
}


async function loadFournisseurToEdit() {
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  try {
    const frs = await getFournisseur(id);
    document.getElementById('nom').value = frs.nom;
    document.getElementById('adresse').value = frs.adresse || '';
    document.getElementById('telephone').value = frs.telephone || '';
    document.getElementById('email').value = frs.email || '';
  } catch (error) {
    alert("Erreur de chargement du fournisseur : " + error.message);
  }
}

// Modifier un fournisseur
async function handleEditFournisseur(event) {
  event.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return alert("ID du fournisseur manquant.");

  const nom = document.getElementById('nom').value.trim();
  const adresse = document.getElementById('adresse').value.trim();
  const telephone = document.getElementById('telephone').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nom) {
    alert("Le nom est obligatoire.");
    return;
  }

  try {
    await updateFournisseur(id, { nom, adresse, telephone, email });
    alert("Fournisseur mis à jour !");
    window.location.href = 'list.html';
  } catch (error) {
    alert("Erreur de mise à jour : " + error.message);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  loadFournisseurs();

  if (form) {
    if (!new URLSearchParams(window.location.search).get('id')) {
      form.addEventListener('submit', handleAddFournisseur);
    } else {
      loadFournisseurToEdit();
      form.addEventListener('submit', handleEditFournisseur);
    }
  }
});
