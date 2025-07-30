<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Transaction } from '../types';

  const dispatch = createEventDispatcher();
  let transaction: Transaction = {
    amount: 0,
    category: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  };

  function submit() {
    dispatch('submit', transaction);
  }
</script>

<form class="space-y-2" on:submit|preventDefault={submit}>
  <div>
    <label class="block text-sm">Monto</label>
    <input type="number" bind:value={transaction.amount} class="input" />
  </div>
  <div>
    <label class="block text-sm">Categoría</label>
    <input type="text" bind:value={transaction.category} class="input" />
  </div>
  <div>
    <label class="block text-sm">Tipo</label>
    <select bind:value={transaction.type} class="input">
      <option value="expense">Gasto</option>
      <option value="income">Ingreso</option>
    </select>
  </div>
  <div>
    <label class="block text-sm">Fecha</label>
    <input type="date" bind:value={transaction.date} class="input" />
  </div>
  <button type="submit" class="btn">Guardar</button>
</form>
