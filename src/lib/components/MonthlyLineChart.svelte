<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  export let labels: string[];
  export let income: number[];
  export let expenses: number[];
  let canvas: HTMLCanvasElement;

  onMount(() => {
    new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          { label: 'Ingresos', data: income, borderColor: 'green' },
          { label: 'Gastos', data: expenses, borderColor: 'red' }
        ]
      }
    });
  });
</script>
<canvas bind:this={canvas} class="max-h-64" />
