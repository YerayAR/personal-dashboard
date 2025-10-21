<script lang="ts">
  import type { Transaction } from '../types';
  import { formatCurrency, formatDate, getTransactionTypeClass } from '../utils/common';
  
  export let items: Transaction[] = [];
</script>

<div class="overflow-x-auto">
  <table class="min-w-full text-sm border-collapse border border-gray-300">
    <thead class="bg-gray-50">
      <tr>
        <th class="border border-gray-300 px-4 py-2 text-left">Fecha</th>
        <th class="border border-gray-300 px-4 py-2 text-left">Categoría</th>
        <th class="border border-gray-300 px-4 py-2 text-left">Tipo</th>
        <th class="border border-gray-300 px-4 py-2 text-right">Monto</th>
      </tr>
    </thead>
    <tbody>
      {#each items as transaction (transaction._id)}
        <tr class="hover:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2">
            {formatDate(transaction.date)}
          </td>
          <td class="border border-gray-300 px-4 py-2">
            {transaction.category}
          </td>
          <td class="border border-gray-300 px-4 py-2">
            <span class="px-2 py-1 rounded-full text-xs {getTransactionTypeClass(transaction.type)}">
              {transaction.type === 'income' ? 'Ingreso' : 'Gasto'}
            </span>
          </td>
          <td class="border border-gray-300 px-4 py-2 text-right font-mono">
            <span class="{transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}">
              {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
            </span>
          </td>
        </tr>
      {/each}
      {#if items.length === 0}
        <tr>
          <td colspan="4" class="border border-gray-300 px-4 py-8 text-center text-gray-500">
            No hay transacciones para mostrar
          </td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>
