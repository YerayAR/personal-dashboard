<script lang="ts">
  import type { Transaction } from '../types';
  export let items: Transaction[] = [];
</script>

<table class="min-w-full text-sm">
  <thead>
    <tr>
      <th class="px-2 py-1">Fecha</th>
      <th class="px-2 py-1">Categoría</th>
      <th class="px-2 py-1">Monto</th>
    </tr>
  </thead>
  <tbody>
    {#each items as t}
      <tr>
        <td class="border px-2 py-1">{t.date}</td>
        <td class="border px-2 py-1">{t.category}</td>
        <td class="border px-2 py-1 text-right">{t.amount}</td>
      </tr>
    {/each}
  </tbody>
</table>
