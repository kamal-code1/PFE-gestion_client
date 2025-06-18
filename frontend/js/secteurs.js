import { getSecteurs, addSecteur, updateSecteur, deleteSecteur, getSecteur } from './api.js';

const tbody = document.getElementById('secteurs-table-body');
const form = document.getElementById('form-secteur');

// Charger et afficher la liste des secteurs
async function loadSecteurs() {
  if (!tbody) return;
  try {
    const secteurs = await getSecteurs();
    tbody.innerHTML = '';

    secteurs.forEach(secteur => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${secteur.id}</td>
        <td>${secteur.nom}</td>
        <td>
          <a href="edit.html?id=${secteur.id}" class="btn btn-primary btn-sm me-2">Modifier</a>
          <button class="btn btn-danger btn-sm" data-id="${secteur.id}">Supprimer</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('button.btn-danger').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        if (confirm("Confirmer la suppression de ce secteur ?")) {
          await deleteSecteur(id);
          loadSecteurs();
        }
      });
    });
  } catch (error) {
    alert("Erreur lors du chargement des secteurs : " + error.message);
  }
}

// Gestion ajout secteur
async function handleAddSecteur(event) {
  event.preventDefault();

  const nom = document.getElementById('nom').value.trim();

  if (!nom) {
    alert("Le nom du secteur est obligatoire.");
    return;
  }

  try {
    await addSecteur({ nom });
    alert("Secteur ajouté avec succès !");
    window.location.href = 'list.html';
  } catch (error) {
    alert("Erreur lors de l'ajout : " + error.message);
  }
}

// Chargement secteur pour édition
async function loadSecteurToEdit() {
  if (!form) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  try {
    const secteur = await getSecteur(id);
    document.getElementById('nom').value = secteur.nom;
  } catch (error) {
    alert("Erreur lors du chargement du secteur : " + error.message);
  }
}

// Gestion édition secteur
async function handleEditSecteur(event) {
  event.preventDefault();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return alert("ID secteur manquant");

  const nom = document.getElementById('nom').value.trim();

  if (!nom) {
    alert("Le nom du secteur est obligatoire.");
    return;
  }

  try {
    await updateSecteur(id, { nom });
    alert("Secteur mis à jour avec succès !");
    window.location.href = 'list.html';
  } catch (error) {
    alert("Erreur lors de la mise à jour : " + error.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadSecteurs();

  if (form) {
    if (!new URLSearchParams(window.location.search).get('id')) {
      form.addEventListener('submit', handleAddSecteur);
    } else {
      loadSecteurToEdit();
      form.addEventListener('submit', handleEditSecteur);
    }
  }
});
