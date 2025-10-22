<script lang="ts">
  // Local utilities to avoid import issues
  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  }
  
  function calculatePercentage(value: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  }
  
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
  
  function handleDelete(goalId: string) {
    if (confirm('¿Estás seguro de que quieres eliminar esta meta?')) {
      alert(`Funcionalidad de eliminar meta ${goalId} próximamente. Conectar con API.`);
      // Aquí se conectaría con la API para eliminar
    }
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
      Metas de Ahorro
    </h2>
    
    <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
      + Nueva Meta
    </button>
  </div>

  {#if goals && goals.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each goals as goal (goal.id)}
        {@const percentage = calculatePercentage(goal.currentAmount, goal.targetAmount)}
        {@const daysRemaining = getDaysRemaining(goal.targetDate)}
        {@const progressColor = getProgressColor(percentage)}
        
        <div class="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <!-- Botón eliminar -->
          <button 
            on:click={() => handleDelete(goal.id)}
            class="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
            title="Eliminar meta"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          
          <!-- Encabezado -->
          <div class="mb-4">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 pr-8">{goal.name}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">{goal.description}</p>
            <span class="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full shadow-sm">
              {goal.category}
            </span>
          </div>
          
          <!-- Montos -->
          <div class="mb-4">
            <div class="flex items-baseline justify-between mb-2">
              <span class="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(goal.currentAmount)}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                de {formatCurrency(goal.targetAmount)}
              </span>
            </div>
            <div class="text-right">
              <span class="text-lg font-semibold text-blue-600 dark:text-blue-400">
                {percentage}% completado
              </span>
            </div>
          </div>
          
          <!-- Progress Bar con efecto gradiente -->
          <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 mb-4 overflow-hidden shadow-inner">
            <div 
              class="{progressColor} h-4 rounded-full transition-all duration-700 ease-out relative"
              style="width: {Math.min(percentage, 100)}%"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-transparent to-white/30"></div>
            </div>
          </div>
          
          <!-- Fecha y días restantes -->
          <div class="flex items-center justify-between text-sm mb-3 pb-3 border-b border-gray-200 dark:border-gray-600">
            <div class="flex items-center text-gray-600 dark:text-gray-300">
              <span class="mr-2 text-lg">📅</span>
              <span class="font-medium">{formatDate(goal.targetDate)}</span>
            </div>
            
            <div class="flex items-center">
              {#if daysRemaining > 0}
                <span class="text-gray-700 dark:text-gray-300 font-medium">
                  {daysRemaining} días
                </span>
              {:else if daysRemaining === 0}
                <span class="text-orange-600 dark:text-orange-400 font-bold">¡Hoy!</span>
              {:else}
                <span class="text-red-600 dark:text-red-400 font-bold">Vencida</span>
              {/if}
            </div>
          </div>
          
          <!-- Monto faltante o meta completada -->
          {#if goal.currentAmount < goal.targetAmount}
            {@const missing = goal.targetAmount - goal.currentAmount}
            <div class="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p class="text-sm text-blue-900 dark:text-blue-200">
                🎯 <span class="font-bold">Faltan {formatCurrency(missing)}</span> para completar
              </p>
            </div>
          {:else}
            <div class="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p class="text-sm text-green-900 dark:text-green-200 font-bold text-center">
                🎉 ¡Meta completada!
              </p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {:else}
    <div class="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
      <div class="text-6xl mb-4">🎯</div>
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No tienes metas de ahorro</h3>
      <p class="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">Crea tu primera meta de ahorro para comenzar a planificar tu futuro financiero</p>
      <button class="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
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
