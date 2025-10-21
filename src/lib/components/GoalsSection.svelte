<script lang="ts">
  import { formatCurrency, calculatePercentage } from '../utils/common';
  
  export let goals = [];
  
  function getProgressColor(percentage: number): string {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  }
  
  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short',
      day: 'numeric'
    });
  }
  
  function getDaysRemaining(targetDate: string): number {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
</script>

<div class="bg-white rounded-lg shadow-md p-6">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-xl font-semibold text-gray-900 flex items-center">
      <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
      Metas de Ahorro
    </h2>
    
    <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
      + Nueva Meta
    </button>
  </div>

  {#if goals && goals.length > 0}
    <div class="space-y-4">
      {#each goals as goal (goal.id)}
        {@const percentage = calculatePercentage(goal.currentAmount, goal.targetAmount)}
        {@const daysRemaining = getDaysRemaining(goal.targetDate)}
        {@const progressColor = getProgressColor(percentage)}
        
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-3">
            <div class="flex-1">
              <h3 class="font-medium text-gray-900">{goal.name}</h3>
              <p class="text-sm text-gray-600 mt-1">{goal.description}</p>
              <span class="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full mt-2">
                {goal.category}
              </span>
            </div>
            
            <div class="text-right ml-4">
              <div class="text-sm font-medium text-gray-900">
                {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
              </div>
              <div class="text-xs text-gray-500 mt-1">
                {percentage}% completado
              </div>
            </div>
          </div>
          
          <!-- Progress Bar -->
          <div class="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div 
              class="{progressColor} h-3 rounded-full transition-all duration-500 ease-out" 
              style="width: {Math.min(percentage, 100)}%"
            ></div>
          </div>
          
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center text-gray-600">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(goal.targetDate)}
            </div>
            
            <div class="flex items-center">
              {#if daysRemaining > 0}
                <span class="text-gray-600">{daysRemaining} días restantes</span>
              {:else if daysRemaining === 0}
                <span class="text-orange-600 font-medium">¡Hoy es la fecha límite!</span>
              {:else}
                <span class="text-red-600 font-medium">Fecha límite pasada</span>
              {/if}
            </div>
          </div>
          
          <!-- Missing amount -->
          {#if goal.currentAmount < goal.targetAmount}
            {@const missing = goal.targetAmount - goal.currentAmount}
            <div class="mt-3 p-2 bg-blue-50 rounded-md">
              <p class="text-sm text-blue-800">
                <span class="font-medium">Faltan {formatCurrency(missing)}</span> 
                para completar esta meta
              </p>
            </div>
          {:else}
            <div class="mt-3 p-2 bg-green-50 rounded-md">
              <p class="text-sm text-green-800 font-medium">
                🎉 ¡Meta completada!
              </p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {:else}
    <div class="text-center py-8">
      <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No tienes metas de ahorro</h3>
      <p class="text-gray-600 mb-4">Crea tu primera meta de ahorro para comenzar a planificar tu futuro financiero</p>
      <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
        Crear Primera Meta
      </button>
    </div>
  {/if}
</div>

<style>
  /* Smooth progress bar animation */
  .transition-all {
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>