<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';
  import Card from './Card.svelte';

  const dispatch = createEventDispatcher();

  export let isOpen = false;

  let formData = {
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  };

  const categories = {
    expense: ['Alimentación', 'Transporte', 'Vivienda', 'Entretenimiento', 'Salud', 'Educación', 'Compras', 'Otros'],
    income: ['Salario', 'Freelance', 'Inversiones', 'Ventas', 'Otros']
  };

  const handleSubmit = async () => {
    if (!formData.amount || !formData.category) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const transaction = {
      ...formData,
      amount: parseFloat(formData.amount) * (formData.type === 'expense' ? -1 : 1),
      date: new Date(formData.date)
    };

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
      });

      if (response.ok) {
        dispatch('transactionAdded');
        closeModal();
        resetForm();
      } else {
        alert('Error al guardar la transacción');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar la transacción');
    }
  };

  const closeModal = () => {
    isOpen = false;
    dispatch('close');
  };

  const resetForm = () => {
    formData = {
      type: 'expense',
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    };
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
</script>

{#if isOpen}
<div class="modal-backdrop" on:click={handleBackdropClick} on:keydown={(e) => e.key === 'Escape' && closeModal()} role="dialog" aria-modal="true">
    <div class="modal-content">
      <Card>
        <div class="modal-header">
          <h2>Nueva Transacción</h2>
          <button class="close-btn" on:click={closeModal}>&times;</button>
        </div>

        <form on:submit|preventDefault={handleSubmit}>
          <div class="form-group">
            <label for="type">Tipo</label>
            <select id="type" bind:value={formData.type} class="form-control type-{formData.type}">
              <option value="income">Ingreso</option>
              <option value="expense">Gasto</option>
            </select>
          </div>

          <div class="form-group">
            <label for="amount">Cantidad *</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              bind:value={formData.amount}
              class="form-control"
              placeholder="0.00"
              required
            />
          </div>

          <div class="form-group">
            <label for="category">Categoría *</label>
            <select id="category" bind:value={formData.category} class="form-control" required>
              <option value="">Selecciona una categoría</option>
              {#each categories[formData.type] as category}
                <option value={category}>{category}</option>
              {/each}
            </select>
          </div>

          <div class="form-group">
            <label for="date">Fecha</label>
            <input
              id="date"
              type="date"
              bind:value={formData.date}
              class="form-control"
              required
            />
          </div>

          <div class="form-group">
            <label for="description">Descripción</label>
            <input
              id="description"
              type="text"
              bind:value={formData.description}
              class="form-control"
              placeholder="Descripción opcional"
            />
          </div>

          <div class="form-actions">
            <Button variant="secondary" onClick={closeModal}>Cancelar</Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </Card>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a202c;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-btn:hover {
    color: #374151;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
  }

  .form-control {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .form-control:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }

  .form-control.type-income {
    border-color: #2ecc71;
  }

  .form-control.type-expense {
    border-color: #e74c3c;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
  }

  :global(.dark) .modal-header h2 {
    color: #f9fafb;
  }

  :global(.dark) .form-group label {
    color: #e5e7eb;
  }

  :global(.dark) .form-control {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }

  :global(.dark) .close-btn {
    color: #9ca3af;
  }

  :global(.dark) .close-btn:hover {
    color: #d1d5db;
  }
</style>
