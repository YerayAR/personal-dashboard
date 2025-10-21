<script lang="ts">
  import { formatCurrency } from '../utils/common';
  
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
      <div class="flex items-end justify-between h-full space-x-1">
        {#each data.labels as label, index}
          <div class="flex-1 flex flex-col items-center">
            <div class="flex flex-col items-center justify-end h-full w-full space-y-1">
              {#each data.datasets as dataset, datasetIndex}
                {@const value = dataset.data[index] || 0}
                {@const height = maxValue > 0 ? (value / maxValue) * (chartHeight - 40) : 0}
                {@const color = dataset.backgroundColor || '#3b82f6'}
                
                <div 
                  class="w-full rounded-t transition-all duration-700 ease-out flex items-end justify-center text-xs text-white font-medium"
                  style="height: {height}px; background-color: {color}; min-height: {value > 0 ? '20px' : '0px'};"
                  title="{dataset.label}: {formatCurrency(value)}"
                >
                  {#if height > 30}
                    <span class="mb-1">{value > 1000 ? Math.round(value/1000) + 'k' : value}</span>
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
    min-height: 200px;
  }
  
  .transition-all {
    transition: height 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>