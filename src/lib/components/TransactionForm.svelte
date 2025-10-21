<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Transaction } from '../types';
  import { validateTransaction } from '../server/transactions';

  const dispatch = createEventDispatcher();
  
  let transaction: Transaction = {
    amount: 0,
    category: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  };
  
  let errors: Record<string, string> = {};
  let isSubmitting = false;

  function validateForm(): boolean {
    errors = {};
    
    if (!transaction.amount || transaction.amount <= 0) {
      errors.amount = 'El monto debe ser mayor a 0';
    }
    
    if (!transaction.category || transaction.category.trim().length === 0) {
      errors.category = 'La categoría es requerida';
    }
    
    if (!transaction.date) {
      errors.date = 'La fecha es requerida';
    }
    
    return Object.keys(errors).length === 0;
  }

  async function submit() {
    if (!validateForm() || isSubmitting) return;
    
    isSubmitting = true;
    
    try {
      const validatedTransaction = validateTransaction(transaction);
      if (validatedTransaction) {
        dispatch('submit', validatedTransaction);
        // Reset form
        transaction = {
          amount: 0,
          category: '',
          type: 'expense',
          date: new Date().toISOString().split('T')[0]
        };
        errors = {};
      } else {
        errors.general = 'Datos de transacción inválidos';
      }
    } catch (error) {
      errors.general = 'Error al procesar la transacción';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form class="space-y-4" on:submit|preventDefault={submit}>
  {#if errors.general}
    <div class="p-3 bg-red-100 border border-red-300 text-red-700 rounded">
      {errors.general}
    </div>
  {/if}
  
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Monto *</label>
    <input 
      type="number" 
      step="0.01"
      min="0"
      bind:value={transaction.amount} 
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      class:border-red-500={errors.amount}
      placeholder="0.00"
      required
    />
    {#if errors.amount}
      <p class="mt-1 text-sm text-red-600">{errors.amount}</p>
    {/if}
  </div>
  
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
    <input 
      type="text" 
      bind:value={transaction.category} 
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      class:border-red-500={errors.category}
      placeholder="Ej: Alimentación, Transporte, Salario"
      maxlength="50"
      required
    />
    {#if errors.category}
      <p class="mt-1 text-sm text-red-600">{errors.category}</p>
    {/if}
  </div>
  
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
    <select 
      bind:value={transaction.type} 
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      required
    >
      <option value="expense">Gasto</option>
      <option value="income">Ingreso</option>
    </select>
  </div>
  
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
    <input 
      type="date" 
      bind:value={transaction.date} 
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      class:border-red-500={errors.date}
      required
    />
    {#if errors.date}
      <p class="mt-1 text-sm text-red-600">{errors.date}</p>
    {/if}
  </div>
  
  <button 
    type="submit" 
    disabled={isSubmitting}
    class="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {isSubmitting ? 'Guardando...' : 'Guardar Transacción'}
  </button>
  
  <p class="text-xs text-gray-500">* Campos obligatorios</p>
</form>
