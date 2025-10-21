<script>
  import Card from '$lib/components/shared/Card.svelte';
  import Target from '$lib/icons/Target.svelte';

  export let data;
  let { goals } = data;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getProgress = (current, target) => {
    if (target === 0) return 0;
    return Math.min(100, (current / target) * 100);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      month: 'long', 
      year: 'numeric'
    });
  };
</script>

<div class="page-container">
  <header class="page-header">
    <h1>Metas de Ahorro</h1>
    <p>Sigue el progreso de tus objetivos financieros.</p>
  </header>

  <div class="goals-grid">
    {#each goals as goal (goal._id)}
      <Card>
        <div class="goal-card">
          <div class="goal-header">
            <div class="goal-icon">
              <Target />
            </div>
            <h3>{goal.name}</h3>
          </div>
          <div class="goal-body">
            <p class="goal-description">{goal.description}</p>
            <div class="goal-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width: {getProgress(goal.currentAmount, goal.targetAmount)}%"></div>
              </div>
              <span class="progress-text">{Math.round(getProgress(goal.currentAmount, goal.targetAmount))}%</span>
            </div>
            <div class="goal-amounts">
              <span class="current-amount">{formatCurrency(goal.currentAmount)}</span>
              <span class="target-amount"> de {formatCurrency(goal.targetAmount)}</span>
            </div>
          </div>
          <div class="goal-footer">
            Fecha Límite: {formatDate(goal.dueDate)}
          </div>
        </div>
      </Card>
    {:else}
      <Card>
        <p class="no-results">Aún no has creado ninguna meta de ahorro.</p>
      </Card>
    {/each}
  </div>
</div>

<style>
  .page-container, .goals-grid {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
  }
  
  .page-header p {
    color: #6b7280;
    margin-top: 0.25rem;
  }

  .goals-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    display: grid;
  }

  .goal-card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .goal-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  
  .goal-icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .goal-icon :global(svg) {
    width: 100%;
    height: 100%;
  }

  .goal-header h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .goal-body {
    flex-grow: 1;
  }

  .goal-description {
    color: #4a5568;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  .goal-progress {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  .progress-bar {
    flex-grow: 1;
    height: 12px;
    background: #e2e8f0;
    border-radius: 6px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3498db, #2ecc71);
    border-radius: 6px;
    transition: width 0.5s ease-out;
  }

  .progress-text {
    font-weight: 600;
    font-size: 0.9rem;
  }

  .goal-amounts {
    font-size: 1.1rem;
  }

  .current-amount {
    font-weight: 600;
  }

  .target-amount {
    color: #6b7280;
  }

  .goal-footer {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
    font-size: 0.8rem;
    color: #6b7280;
    text-align: center;
  }

  .no-results {
    padding: 2rem;
    text-align: center;
    color: #6b7280;
  }

  :global(.dark) .goal-header h3, 
  :global(.dark) .current-amount {
    color: #f9fafb;
  }

  :global(.dark) .goal-description, 
  :global(.dark) .target-amount, 
  :global(.dark) .goal-footer {
    color: #d1d5db;
  }

  :global(.dark) .progress-bar {
    background: #374151;
  }

  :global(.dark) .goal-footer {
    border-top-color: #374151;
  }
</style>
