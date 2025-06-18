import {
  getProduits,
  getProduit,
  addProduit,
  updateProduit,
  deleteProduit
} from './api.js';

const tbody = document.getElementById('produits-table-body');
const form = document.getElementById('form-produit');


async function loadProduits() {
  if (!tbody) return;

  try {
    const produits = await getProduits();
    tbody.innerHTML = '';

    produits.forEach(produit => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${produit.id}</td>
        <td>${produit.nom}</td>
        <td>${produit.description || ''}</td>
        <td>${produit.prix ? produit.prix.toFixed(2) : ''} €</td>
        <td>${produit.image_url ? `<img src="${produit.image_url}" alt="${produit.nom}" style="height:50px;">` : ''}</td>
        <td>${produit.catalogue_id || ''}</td>
        <td>
          <a href="edit.html?id=${produit.id}" class="btn btn-primary btn-sm me-2">Modifier</a>
          <button class="btn btn-danger btn-sm" data-id="${produit.id}">Supprimer</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('button.btn-danger').forEach(button => {
      button.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        if (confirm("Confirmer la suppression de ce produit ?")) {
          await deleteProduit(id);
          loadProduits();
        }
      });
    });
  } catch (error) {
    alert("Erreur lors du chargement des produits : " + error.message);
  }
}


async function handleAddProduit(event) {
  event.preventDefault();

  const nom = document.getElementById('nom').value.trim();
  const description = document.getElementById('description').value.trim();
  const prix = parseFloat(document.getElementById('prix').value);
  const image_url = document.getElementById('image_url').value.trim();
  const catalogue_id = parseInt(document.getElementById('catalogue_id').value);

  if (!nom) {
    alert("Le nom est obligatoire.");
    return;
  }

  if (isNaN(prix) || prix < 0) {
    alert("Le prix doit être un nombre positif.");
    return;
  }

  try {
    await addProduit({ nom, description, prix, image_url, catalogue_id });
    alert("Produit ajouté avec succès !");
    window.location.href = 'list.html';
  } catch (error) {
    alert("Erreur lors de l'ajout : " + error.message);
  }
}


async function loadProduitToEdit() {
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  try {
    const produit = await getProduit(id);
    document.getElementById('nom').value = produit.nom;
    document.getElementById('description').value = produit.description || '';
    document.getElementById('prix').value = produit.prix || '';
    document.getElementById('image_url').value = produit.image_url || '';
    document.getElementById('catalogue_id').value = produit.catalogue_id || '';
  } catch (error) {
    alert("Erreur de chargement du produit : " + error.message);
  }
}


async function handleEditProduit(event) {
  event.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return alert("ID du produit manquant.");

  const nom = document.getElementById('nom').value.trim();
  const description = document.getElementById('description').value.trim();
  const prix = parseFloat(document.getElementById('prix').value);
  const image_url = document.getElementById('image_url').value.trim();
  const catalogue_id = parseInt(document.getElementById('catalogue_id').value);

  if (!nom) {
    alert("Le nom est obligatoire.");
    return;
  }

  if (isNaN(prix) || prix < 0) {
    alert("Le prix doit être un nombre positif.");
    return;
  }

  try {
    await updateProduit(id, { nom, description, prix, image_url, catalogue_id });
    alert("Produit mis à jour !");
    window.location.href = 'list.html';
  } catch (error) {
    alert("Erreur lors de la mise à jour : " + error.message);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  loadProduits();

  if (form) {
    if (!new URLSearchParams(window.location.search).get('id')) {
      form.addEventListener('submit', handleAddProduit);
    } else {
      loadProduitToEdit();
      form.addEventListener('submit', handleEditProduit);
    }
  }
});
