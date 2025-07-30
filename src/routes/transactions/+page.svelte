<script>
  import Card from '$lib/components/shared/Card.svelte';
  import Button from '$lib/components/shared/Button.svelte';

  export let data;
  
  let { transactions, categories } = data;
  
  let filteredTransactions = transactions;
  let filters = {
    category: 'all',
    type: 'all',
    startDate: '',
    endDate: ''
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  const applyFilters = () => {
    filteredTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      
      const categoryMatch = filters.category === 'all' || t.category === filters.category;
      const typeMatch = filters.type === 'all' || (filters.type === 'income' && t.amount > 0) || (filters.type === 'expense' && t.amount < 0);
      const startDateMatch = !filters.startDate || transactionDate >= new Date(filters.startDate);
      const endDateMatch = !filters.endDate || transactionDate <= new Date(filters.endDate);
      
      return categoryMatch && typeMatch && startDateMatch && endDateMatch;
    });
  };
  
  const resetFilters = () => {
    filters = {
      category: 'all',
      type: 'all',
      startDate: '',
      endDate: ''
    };
    applyFilters();
  };
  
  $: applyFilters(filters);
</script>

<div class="page-container">
  <header class="page-header">
    <h1>Transacciones</h1>
    <p>Revisa y gestiona todos tus movimientos.</p>
  </header>

  <Card>
    <div class="filters-container">
      <div class="filter-group">
        <label for="category">Categoría</label>
        <select id="category" bind:value={filters.category} on:change={applyFilters}>
          <option value="all">Todas</option>
          {#each categories as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
      </div>
      <div class="filter-group">
        <label for="type">Tipo</label>
        <select id="type" bind:value={filters.type} on:change={applyFilters}>
          <option value="all">Todos</option>
          <option value="income">Ingreso</option>
          <option value="expense">Gasto</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="startDate">Fecha Inicio</label>
        <input type="date" id="startDate" bind:value={filters.startDate} on:change={applyFilters} />
      </div>
      <div class="filter-group">
        <label for="endDate">Fecha Fin</label>
        <input type="date" id="endDate" bind:value={filters.endDate} on:change={applyFilters} />
      </div>
      <div class="filter-actions">
        <Button variant="secondary" onClick={resetFilters}>Limpiar Filtros</Button>
      </div>
    </div>
  </Card>

  <Card>
    <div class="transactions-list-full">
      {#each filteredTransactions as transaction (transaction._id)}
        <div class="transaction-item">
          <div class="transaction-info">
            <span class="transaction-category">{transaction.category}</span>
            <span class="transaction-description">{transaction.description || 'Sin descripción'}</span>
          </div>
          <div class="transaction-details">
            <span class="transaction-amount" class:positive={transaction.amount > 0} class:negative={transaction.amount < 0}>
              {formatCurrency(Math.abs(transaction.amount))}
            </span>
            <span class="transaction-date">{formatDate(transaction.date)}</span>
          </div>
        </div>
      {:else}
        <p class="no-results">No se encontraron transacciones con los filtros seleccionados.</p>
      {/each}
    </div>
  </Card>
</div>

<style>
  .page-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
  }
  
  .page-header p {
    color: #6b7280;
    margin-top: 0.25rem;
  }
  
  .filters-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: flex-end;
  }
  
  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .filter-group label {
    font-weight: 500;
    font-size: 0.875rem;
    color: #374151;
  }
  
  .filter-group select, .filter-group input {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #d1d5db;
  }
  
  .filter-actions {
    margin-left: auto;
  }
  
  .transactions-list-full {
    margin-top: 1rem;
  }
  
  /* Estilos de transaction-item reutilizados del dashboard */
  .transaction-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #f3f4f6;
  }

  .transaction-item:hover {
    background-color: #f9fafb;
  }
  
  .transaction-item:last-child {
    border-bottom: none;
  }
  
  .transaction-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .transaction-category {
    font-weight: 500;
    color: #1f2937;
  }
  
  .transaction-description {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .transaction-details {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
  }
  
  .transaction-amount {
    font-weight: 600;
  }
  
  .transaction-amount.positive {
    color: #2ecc71;
  }
  
  .transaction-amount.negative {
    color: #e74c3c;
  }
  
  .transaction-date {
    font-size: 0.75rem;
    color: #9ca3af;
  }

  .no-results {
    padding: 2rem;
    text-align: center;
    color: #6b7280;
  }

  :global(.dark) .filter-group label {
    color: #e5e7eb;
  }

  :global(.dark) .filter-group select, 
  :global(.dark) .filter-group input {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }

  :global(.dark) .transaction-item:hover {
    background-color: #1f2937;
  }

  :global(.dark) .transaction-category, 
  :global(.dark) .transaction-description {
    color: #f9fafb;
  }

  :global(.dark) .no-results {
    color: #9ca3af;
  }
</style>
