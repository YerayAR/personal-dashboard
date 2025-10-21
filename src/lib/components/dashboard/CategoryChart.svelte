<script>
  import SimplePieChart from '../SimplePieChart.svelte';
  
  export let data;
  export let title = 'Gastos por Categoría';
</script>

<SimplePieChart {data} {title} />
