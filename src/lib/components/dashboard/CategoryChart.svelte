<script>
  import { Pie } from 'svelte-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js';

  ChartJS.register(Title, Tooltip, Legend, ArcElement);

  export let data;
</script>

<Pie {data} options={{ responsive: true, maintainAspectRatio: false }} />
