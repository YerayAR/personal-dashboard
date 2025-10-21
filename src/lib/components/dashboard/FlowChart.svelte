<script>
  import SimpleBarChart from '../SimpleBarChart.svelte';
  
  export let data;
  export let title = 'Flujo Mensual';
</script>

<SimpleBarChart {data} {title} />
