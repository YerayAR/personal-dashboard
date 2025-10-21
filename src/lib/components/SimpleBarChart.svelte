<script lang="ts">
  // Local utility to avoid import issues
  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  }
  
  export let data: any = { labels: [], datasets: [] };
  export let title = '';
  
  $: maxValue = Math.max(
    ...data.datasets.flatMap((dataset: any) => dataset.data || [])
  );
  
  $: chartHeight = 200;
</script>

<div class="bg-white rounded-lg shadow-md p-6">
  {#if title}
    <h3 class="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
  {/if}
  
  {#if data && data.labels && data.labels.length > 0}
    <div class="chart-container" style="height: {chartHeight}px;">
      <div class="chart-bars">
        {#each data.labels as label, index}
          <div class="bar-group">
            <div class="bars-container">
              {#each data.datasets as dataset, datasetIndex}
                {@const value = dataset.data[index] || 0}
                {@const height = maxValue > 0 ? (value / maxValue) * (chartHeight - 40) : 0}
                {@const color = dataset.backgroundColor || '#3b82f6'}
                
                <div 
                  class="bar rounded-t transition-all duration-700 ease-out"
                  style="height: {height}px; background-color: {color}; width: {100 / data.datasets.length - 2}%; margin: 0 1%;"
                  title="{dataset.label}: {formatCurrency(value)}"
                >
                  {#if height > 30}
                    <span class="bar-label">{value > 1000 ? Math.round(value/1000) + 'k' : value}</span>
                  {/if}
                </div>
              {/each}
            </div>
            
            <div class="text-xs text-gray-600 mt-2 text-center">
              {label}
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Legend -->
    {#if data.datasets.length > 1}
      <div class="flex justify-center space-x-4 mt-4">
        {#each data.datasets as dataset}
          <div class="flex items-center">
            <div 
              class="w-3 h-3 rounded mr-2" 
              style="background-color: {dataset.backgroundColor}"
            ></div>
            <span class="text-sm text-gray-600">{dataset.label}</span>
          </div>
        {/each}
      </div>
    {/if}
  {:else}
    <div class="flex items-center justify-center h-48 text-gray-500">
      <div class="text-center">
        <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p>No hay datos para mostrar</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .chart-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 200px;
    width: 100%;
  }
  
  .chart-bars {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    height: 100%;
    width: 100%;
    gap: 0.5rem;
  }
  
  .bar-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    height: 100%;
    justify-content: flex-end;
  }
  
  .bars-container {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 100%;
    gap: 0.25rem;
    width: 100%;
  }
  
  .bar {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    min-height: 2px;
  }
  
  .bar-label {
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .transition-all {
    transition: height 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>
