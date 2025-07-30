<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  export let labels: string[];
  export let values: number[];
  let canvas: HTMLCanvasElement;

  onMount(() => {
    new Chart(canvas, {
      type: 'pie',
      data: {
        labels,
        datasets: [{ data: values }],
      },
    });
  });
</script>
<canvas bind:this={canvas} class="max-h-64" />
