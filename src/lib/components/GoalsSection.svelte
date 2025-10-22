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

<div class="goals-container">
  <div class="goals-header">
    <div class="header-with-icon">
      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      </div>
      <h2>Metas de Ahorro</h2>
    </div>
    
    <button class="btn-new-goal">
      + Nueva Meta
    </button>
  </div>

  {#if goals && goals.length > 0}
    <div class="goals-grid">
      {#each goals as goal (goal.id)}
        {@const percentage = calculatePercentage(goal.currentAmount, goal.targetAmount)}
        {@const daysRemaining = getDaysRemaining(goal.targetDate)}
        
        <div class="goal-card">
          <button 
            on:click={() => handleDelete(goal.id)}
            class="delete-btn"
            title="Eliminar meta"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          
          <div class="goal-header">
            <h3 class="goal-name">{goal.name}</h3>
            <p class="goal-description">{goal.description}</p>
            <span class="goal-category">
              {goal.category}
            </span>
          </div>
          
          <div class="goal-amounts">
            <div class="amounts-row">
              <span class="current-amount">
                {formatCurrency(goal.currentAmount)}
              </span>
              <span class="target-amount">
                de {formatCurrency(goal.targetAmount)}
              </span>
            </div>
            <div class="percentage">
              {percentage}% completado
            </div>
          </div>
          
          <div class="progress-bar-container">
            <div 
              class="progress-bar"
              style="width: {Math.min(percentage, 100)}%"
            >
              <div class="progress-shine"></div>
            </div>
          </div>
          
          <div class="goal-date-info">
            <div class="date-display">
              <span class="date-label">Fecha objetivo:</span>
              <span class="date-value">{formatDate(goal.targetDate)}</span>
            </div>
            
            <div class="days-remaining">
              {#if daysRemaining > 0}
                <span class="days-badge days-active">
                  {daysRemaining} días
                </span>
              {:else if daysRemaining === 0}
                <span class="days-badge days-today">¡Hoy!</span>
              {:else}
                <span class="days-badge days-overdue">Vencida</span>
              {/if}
            </div>
          </div>
          
          {#if goal.currentAmount < goal.targetAmount}
            {@const missing = goal.targetAmount - goal.currentAmount}
            <div class="status-badge status-pending">
              <span class="status-text">Faltan <strong>{formatCurrency(missing)}</strong></span>
            </div>
          {:else}
            <div class="status-badge status-completed">
              <span class="status-text">¡Meta completada!</span>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {:else}
    <div class="empty-state">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      </div>
      <h3>No tienes metas de ahorro</h3>
      <p>Crea tu primera meta de ahorro para comenzar a planificar tu futuro financiero</p>
      <button class="btn-create-first">
        Crear Primera Meta
      </button>
    </div>
  {/if}
</div>

<style>
  .goals-container {
    background: linear-gradient(145deg, #ffffff 0%, #fafbfc 100%);
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(226, 232, 240, 0.8);
  }

  .goals-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .header-with-icon {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  .goals-header h2 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 700;
    color: #0f172a;
  }

  .btn-new-goal {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100());
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  }

  .btn-new-goal:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
  }

  .goals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  .goal-card {
    position: relative;
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 16px;
    padding: 1.75rem;
    border: 2px solid #e2e8f0;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .goal-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
    border-color: #3b82f6;
  }

  .delete-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .delete-btn:hover {
    background: #fee2e2;
    color: #ef4444;
  }

  .goal-header {
    margin-bottom: 1.5rem;
  }

  .goal-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.5rem;
    padding-right: 2rem;
  }

  .goal-description {
    font-size: 0.9375rem;
    color: #64748b;
    margin: 0 0 0.75rem;
  }

  .goal-category {
    display: inline-block;
    padding: 0.375rem 0.875rem;
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    color: #1e40af;
    font-size: 0.8125rem;
    font-weight: 600;
    border-radius: 12px;
  }

  .goal-amounts {
    margin-bottom: 1.25rem;
  }

  .amounts-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.5rem;
  }

  .current-amount {
    font-size: 1.875rem;
    font-weight: 700;
    color: #0f172a;
  }

  .target-amount {
    font-size: 0.9375rem;
    color: #64748b;
  }

  .percentage {
    font-size: 1.125rem;
    font-weight: 600;
    color: #3b82f6;
    text-align: right;
  }

  .progress-bar-container {
    width: 100%;
    height: 12px;
    background: #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 1.25rem;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #10b981 0%, #3b82f6 100%);
    border-radius: 12px;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .progress-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shine 2s infinite;
  }

  @keyframes shine {
    to {
      left: 100%;
    }
  }

  .goal-date-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 10px;
    margin-bottom: 1rem;
  }

  .date-display {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .date-label {
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 500;
  }

  .date-value {
    font-size: 0.9375rem;
    color: #0f172a;
    font-weight: 600;
  }

  .days-badge {
    padding: 0.375rem 0.875rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .days-active {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    color: #1e40af;
  }

  .days-today {
    background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
    color: #9a3412;
  }

  .days-overdue {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100());
    color: #991b1b;
  }

  .status-badge {
    padding: 0.875rem 1.25rem;
    border-radius: 10px;
    text-align: center;
  }

  .status-pending {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    border: 1px solid #93c5fd;
  }

  .status-pending .status-text {
    color: #1e40af;
    font-size: 0.9375rem;
  }

  .status-completed {
    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
    border: 1px solid #6ee7b7;
  }

  .status-completed .status-text {
    color: #065f46;
    font-weight: 700;
    font-size: 1rem;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem 2rem;
    text-align: center;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 16px;
    border: 2px dashed #cbd5e1;
  }

  .empty-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100());
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    margin-bottom: 1.5rem;
  }

  .empty-state h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.75rem;
  }

  .empty-state p {
    font-size: 1rem;
    color: #64748b;
    max-width: 400px;
    margin: 0 0 2rem;
  }

  .btn-create-first {
    padding: 0.875rem 2rem;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
  }

  .btn-create-first:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 24px rgba(59, 130, 246, 0.4);
  }

  :global(.dark) .goals-container {
    background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
    border-color: rgba(71, 85, 105, 0.5);
  }

  :global(.dark) .goals-header h2 {
    color: #e2e8f0;
  }

  :global(.dark) .goal-card {
    background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
    border-color: #475569;
  }

  :global(.dark) .goal-name {
    color: #e2e8f0;
  }

  :global(.dark) .goal-description {
    color: #94a3b8;
  }

  :global(.dark) .current-amount {
    color: #e2e8f0;
  }

  :global(.dark) .progress-bar-container {
    background: #334155;
  }

  :global(.dark) .goal-date-info {
    background: #0f172a;
  }

  :global(.dark) .date-value {
    color: #e2e8f0;
  }

  :global(.dark) .empty-state {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100());
    border-color: #475569;
  }

  :global(.dark) .empty-icon {
    background: linear-gradient(135deg, #334155 0%, #1e293b 100());
    color: #cbd5e1;
  }

  :global(.dark) .empty-state h3 {
    color: #e2e8f0;
  }

  :global(.dark) .empty-state p {
    color: #94a3b8;
  }
</style>
