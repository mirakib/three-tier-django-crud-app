const API_BASE = `${location.protocol}//api.${location.hostname.split('.').slice(1).join('.')}`;
// The above attempts to map frontend.local.test -> api.local.test by replacing subdomain

async function fetchList() {
  const res = await fetch(`${API_BASE}/api/users/`);
  if (!res.ok) throw new Error('Failed to fetch list');
  return res.json();
}

async function submitForm(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('msg');
  try {
    const res = await fetch(`${API_BASE}/api/users/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
    if (!res.ok) throw new Error('Submit failed');
    msg.innerHTML = '<div class="alert alert-success">Submitted</div>';
    document.getElementById('submitForm').reset();
  } catch (err) {
    msg.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
  }
}

async function renderList() {
  const tbody = document.querySelector('#dataTable tbody');
  tbody.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';
  try {
    const data = await fetchList();
    tbody.innerHTML = '';
    data.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>
          <button class="btn btn-sm btn-primary edit" data-id="${item.id}">Edit</button>
          <button class="btn btn-sm btn-danger delete" data-id="${item.id}">Delete</button>
        </td>`;
      tbody.appendChild(tr);
    });
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="4">Error loading: ${err.message}</td></tr>`;
  }
}

async function deleteItem(id) {
  if(!confirm('Delete this entry?')) return;
  const res = await fetch(`${API_BASE}/api/users/${id}/`, { method: 'DELETE' });
  if (res.ok) renderList();
  else alert('Delete failed');
}

function openEditModal(item) {
  document.getElementById('editId').value = item.id;
  document.getElementById('editName').value = item.name;
  document.getElementById('editEmail').value = item.email;
  document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('editModal').style.display = 'none';
}

async function saveEdit(e) {
  e.preventDefault();
  const id = document.getElementById('editId').value;
  const name = document.getElementById('editName').value;
  const email = document.getElementById('editEmail').value;
  const res = await fetch(`${API_BASE}/api/users/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });
  if (res.ok) {
    closeModal();
    renderList();
  } else {
    alert('Save failed');
  }
}

// Init event listeners
document.addEventListener('DOMContentLoaded', () => {
  const submitFormEl = document.getElementById('submitForm');
  if (submitFormEl) submitFormEl.addEventListener('submit', submitForm);

  const editForm = document.getElementById('editForm');
  if (editForm) editForm.addEventListener('submit', saveEdit);

  const closeBtn = document.getElementById('closeModal');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  const cancelBtn = document.getElementById('cancelModal');
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  // For list page
  if (document.querySelector('#dataTable')) {
    renderList();

    document.querySelector('#dataTable').addEventListener('click', async (e) => {
      const target = e.target;
      if (target.classList.contains('delete')) {
        const id = target.dataset.id;
        await deleteItem(id);
      } else if (target.classList.contains('edit')) {
        const id = target.dataset.id;
        // fetch item
        const res = await fetch(`${API_BASE}/api/users/${id}/`);
        const item = await res.json();
        openEditModal(item);
      }
    });
  }
});
