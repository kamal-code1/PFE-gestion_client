import {
  getCatalogues,
  addCatalogue,
  updateCatalogue,
  deleteCatalogue,
  getCatalogue
} from './api.js';

const tbody = document.getElementById('catalogues-table-body');
const form = document.getElementById('form-catalogue');

// Afficher tous les catalogues
async function loadCatalogues() {
  if (!tbody) return;

  try {
    const catalogues = await getCatalogues();
    tbody.innerHTML = '';

    catalogues.forEach(catalogue => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${catalogue.id}</td>
        <td>${catalogue.titre}</td>
        <td>${catalogue.description || ''}</td>
        <td>${catalogue.date_creation}</td>
        <td>${catalogue.frssID || ''}</td>
        <td>
          <a href="edit.html?id=${catalogue.id}" class="btn btn-primary btn-sm me-2">Modifier</a>
          <button class="btn btn-danger btn-sm" data-id="${catalogue.id}">Supprimer</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('button.btn-danger').forEach(button => {
      button.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        if (confirm("Confirmer la suppression de ce catalogue ?")) {
          await deleteCatalogue(id);
          loadCatalogues();
        }
      });
    });
  } catch (error) {
    alert("Erreur de chargement : " + error.message);
  }
}

// Ajouter un catalogue
async function handleAddCatalogue(event) {
  event.preventDefault();

  const titre = document.getElementById('titre').value.trim();
  const description = document.getElementById('description').value.trim();
  const frssID = document.getElementById('frssID').value;

  if (!titre) {
    alert("Le titre est obligatoire.");
    return;
  }

  try {
    await addCatalogue({ titre, description, frssID });
    alert("Catalogue ajouté avec succès !");
    window.location.href = 'list.html';
  } catch (error) {
    alert("Erreur d'ajout : " + error.message);
  }
}

// Charger les données pour édition
async function loadCatalogueToEdit() {
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  try {
    const catalogue = await getCatalogue(id);
    document.getElementById('titre').value = catalogue.titre;
    document.getElementById('description').value = catalogue.description || '';
    document.getElementById('frssID').value = catalogue.frssID || '';
  } catch (error) {
    alert("Erreur de chargement : " + error.message);
  }
}

// Modifier un catalogue
async function handleEditCatalogue(event) {
  event.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  const titre = document.getElementById('titre').value.trim();
  const description = document.getElementById('description').value.trim();
  const frssID = document.getElementById('frssID').value;

  if (!titre) {
    alert("Le titre est obligatoire.");
    return;
  }

  try {
    await updateCatalogue(id, { titre, description, frssID });
    alert("Catalogue mis à jour !");
    window.location.href = 'list.html';
  } catch (error) {
    alert("Erreur lors de la mise à jour : " + error.message);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  loadCatalogues();

  if (form) {
    if (!new URLSearchParams(window.location.search).get('id')) {
      form.addEventListener('submit', handleAddCatalogue);
    } else {
      loadCatalogueToEdit();
      form.addEventListener('submit', handleEditCatalogue);
    }
  }
});
