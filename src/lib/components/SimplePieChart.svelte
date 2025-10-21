<script lang="ts">
  import { formatCurrency } from '$lib/utils/common';
  
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
    <div class="flex items-center justify-center">
      <div class="flex items-center space-x-8">
        <!-- Pie Chart -->
        <div class="relative">
          <svg width="200" height="200" viewBox="-100 -100 200 200" class="transform rotate-0">
            {#each paths as slice}
              <path
                d={slice.path}
                fill={slice.color}
                stroke="white"
                stroke-width="2"
                class="hover:opacity-80 transition-opacity cursor-pointer"
                title="{slice.label}: {formatCurrency(slice.value)} ({slice.percentage}%)"
              />
            {/each}
            
            <!-- Center text showing total -->
            <text x="0" y="-5" text-anchor="middle" class="text-sm font-semibold fill-gray-700">
              Total
            </text>
            <text x="0" y="10" text-anchor="middle" class="text-xs fill-gray-600">
              {formatCurrency(total)}
            </text>
          </svg>
        </div>
        
        <!-- Legend -->
        <div class="space-y-2">
          {#each slices as slice, index}
            <div class="flex items-center space-x-3">
              <div 
                class="w-4 h-4 rounded-full" 
                style="background-color: {slice.color}"
              ></div>
              <div class="text-sm">
                <div class="font-medium text-gray-900">{slice.label}</div>
                <div class="text-gray-600">
                  {formatCurrency(slice.value)} ({slice.percentage}%)
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {:else}
    <div class="flex items-center justify-center h-48 text-gray-500">
      <div class="text-center">
        <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
        <p>No hay datos para mostrar</p>
      </div>
    </div>
  {/if}
</div>