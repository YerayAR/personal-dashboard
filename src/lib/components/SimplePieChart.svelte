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
  
  $: dataset = data.datasets && data.datasets.length > 0 ? data.datasets[0] : { data: [], backgroundColor: [] };
  $: total = dataset.data ? dataset.data.reduce((sum: number, value: number) => sum + value, 0) : 0;
  
  // Calculate pie slices
  $: slices = dataset.data ? dataset.data.map((value: number, index: number) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    const angle = total > 0 ? (value / total) * 360 : 0;
    
    return {
      value,
      percentage: Math.round(percentage * 10) / 10,
      angle,
      color: dataset.backgroundColor?.[index] || `hsl(${(index * 360) / dataset.data.length}, 70%, 50%)`,
      label: data.labels?.[index] || `Item ${index + 1}`
    };
  }) : [];
  
  // Generate SVG paths for pie slices
  function createArcPath(startAngle: number, endAngle: number, outerRadius: number, innerRadius: number = 0) {
    const start = polarToCartesian(0, 0, outerRadius, endAngle);
    const end = polarToCartesian(0, 0, outerRadius, startAngle);
    const innerStart = polarToCartesian(0, 0, innerRadius, endAngle);
    const innerEnd = polarToCartesian(0, 0, innerRadius, startAngle);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    if (innerRadius === 0) {
      return [
        "M", 0, 0,
        "L", start.x, start.y,
        "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
        "Z"
      ].join(" ");
    } else {
      return [
        "M", start.x, start.y,
        "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
        "L", innerEnd.x, innerEnd.y,
        "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
        "Z"
      ].join(" ");
    }
  }
  
  function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
  
  $: paths = slices.reduce((acc: any[], slice: any, index: number) => {
    const startAngle = acc.length > 0 ? acc[acc.length - 1].endAngle : 0;
    const endAngle = startAngle + slice.angle;
    
    acc.push({
      ...slice,
      startAngle,
      endAngle,
      path: createArcPath(startAngle, endAngle, 80, 30) // Donut chart with inner radius
    });
    
    return acc;
  }, []);
</script>

<div class="bg-white rounded-lg shadow-md p-6">
  {#if title}
    <h3 class="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
  {/if}
  
  {#if slices.length > 0}
    <div class="pie-chart-wrapper">
      <!-- Pie Chart -->
      <div class="pie-chart-container">
        <svg width="160" height="160" viewBox="-100 -100 200 200" class="pie-svg">
          {#each paths as slice}
            <path
              d={slice.path}
              fill={slice.color}
              stroke="white"
              stroke-width="2"
              class="pie-slice"
              title="{slice.label}: {formatCurrency(slice.value)} ({slice.percentage}%)"
            />
          {/each}
          
          <!-- Center text showing total -->
          <text x="0" y="-5" text-anchor="middle" class="pie-text-title">
            Total
          </text>
          <text x="0" y="10" text-anchor="middle" class="pie-text-value">
            {formatCurrency(total)}
          </text>
        </svg>
      </div>
      
      <!-- Legend -->
      <div class="pie-legend">
        {#each slices as slice, index}
          <div class="legend-item">
            <div 
              class="legend-color" 
              style="background-color: {slice.color}"
            ></div>
            <div class="legend-text">
              <div class="legend-label">{slice.label}</div>
              <div class="legend-value">
                {formatCurrency(slice.value)} ({slice.percentage}%)
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <div class="flex items-center justify-center h-48 text-gray-500">
      <div class="text-center">
        <div class="text-5xl mb-4">📊</div>
        <p>No hay datos para mostrar</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .pie-chart-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    width: 100%;
  }
  
  .pie-chart-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .pie-svg {
    max-width: 100%;
    height: auto;
  }
  
  .pie-slice {
    transition: opacity 0.2s ease;
  }
  
  .pie-slice:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  
  .pie-text-title {
    font-size: 12px;
    font-weight: 600;
    fill: #4b5563;
  }
  
  .pie-text-value {
    font-size: 10px;
    fill: #9ca3af;
  }
  
  .pie-legend {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 240px;
    overflow-y: auto;
    padding-right: 0.5rem;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;
  }
  
  .legend-color {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    flex-shrink: 0;
  }
  
  .legend-text {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-width: 0;
  }
  
  .legend-label {
    font-weight: 500;
    color: #1f2937;
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .legend-value {
    color: #6b7280;
    font-size: 0.75rem;
  }
  
  :global(.dark) .pie-text-title {
    fill: #e5e7eb;
  }
  
  :global(.dark) .pie-text-value {
    fill: #d1d5db;
  }
  
  :global(.dark) .legend-label {
    color: #f9fafb;
  }
  
  :global(.dark) .legend-value {
    color: #9ca3af;
  }
  
  @media (max-width: 640px) {
    .pie-chart-wrapper {
      flex-direction: column;
      gap: 1rem;
    }
    
    .pie-legend {
      width: 100%;
      max-height: none;
      max-width: 300px;
      margin: 0 auto;
    }
  }
</style>
