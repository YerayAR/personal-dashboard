<script>
  import KPICard from '$lib/components/dashboard/KPICard.svelte';
  import Card from '$lib/components/shared/Card.svelte';
  import FlowChart from '$lib/components/dashboard/FlowChart.svelte';
  import CategoryChart from '$lib/components/dashboard/CategoryChart.svelte';
  import GoalsSection from '$lib/components/GoalsSection.svelte';
  import { formatCurrency, formatDate } from '$lib/utils/common';

  export let data;
  
  // Debug: Log data to see what we're getting
  console.log('Page data:', data);
  
  const { kpiData, transactions, flowChartData, categoryChartData, goals, statistics } = data;
</script>

<div class="dashboard">
  <header class="dashboard-header">
    <h1>Dashboard Principal</h1>
    <p>Un resumen de tu salud financiera este mes.</p>
  </header>

  <div class="kpi-grid">
    <KPICard {...kpiData.balance} />
    <KPICard {...kpiData.income} />
    <KPICard {...kpiData.expenses} />
    <KPICard {...kpiData.netFlow} />
    {#if kpiData.savingsRate}
      <KPICard {...kpiData.savingsRate} />
    {/if}
  </div>

  <div class="charts-grid">
    <Card>
      <div class="section-header">
        <h2>Flujo de Caja Anual</h2>
      </div>
      <div class="chart-container">
        <FlowChart data={flowChartData} />
      </div>
    </Card>
    <Card>
      <div class="section-header">
        <h2>Gastos por Categoría</h2>
      </div>
      <div class="chart-container pie-chart">
        <CategoryChart data={categoryChartData} />
      </div>
    </Card>
  </div>
  
  <!-- Goals Section -->
  {#if goals && goals.length > 0}
    <GoalsSection {goals} />
  {/if}
  
  {#if transactions && transactions.length > 0}
    <section class="recent-transactions">
      <Card>
        <div class="section-header">
          <h2>Transacciones Recientes</h2>
          <a href="/transactions" class="view-all-link">Ver todas</a>
        </div>
        
        <div class="transactions-list">
          {#each transactions as transaction}
            <div class="transaction-item">
              <div class="transaction-info">
                <span class="transaction-category">{transaction.category}</span>
                <span class="transaction-description">{transaction.description || 'Sin descripción'}</span>
              </div>
              <div class="transaction-details">
                <span class="transaction-amount" class:positive={transaction.type === 'income'} class:negative={transaction.type === 'expense'}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
                <span class="transaction-date">{formatDate(transaction.date)}</span>
              </div>
            </div>
          {/each}
        </div>
      </Card>
    </section>
  {/if}
</div>

<style>
  .dashboard {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .dashboard-header {
    margin-bottom: 1rem;
  }

  .dashboard-header h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
  }

  .dashboard-header p {
    color: #6b7280;
    margin-top: 0.25rem;
  }

  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  :global(.dark) .dashboard-header h1 {
    color: white;
  }

  :global(.dark) .dashboard-header p {
    color: #a0aec0;
  }
  
  .recent-transactions {
    margin-top: 1rem;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .section-header h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
  }
  
  .view-all-link {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
  }
  
  .view-all-link:hover {
    text-decoration: underline;
  }
  
  .transactions-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .transaction-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .transaction-item:last-child {
    border-bottom: none;
  }
  
  .transaction-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .transaction-category {
    font-weight: 500;
    color: #1f2937;
  }
  
  .transaction-description {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .transaction-details {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
  }
  
  .transaction-amount {
    font-weight: 600;
  }
  
  .transaction-amount.positive {
    color: #2ecc71;
  }
  
  .transaction-amount.negative {
    color: #e74c3c;
  }
  
  .transaction-date {
    font-size: 0.75rem;
    color: #9ca3af;
  }
  
  :global(.dark) .section-header {
    border-bottom-color: #374151;
  }
  
  :global(.dark) .section-header h2 {
    color: #f9fafb;
  }
  
  :global(.dark) .transaction-item {
    border-bottom-color: #374151;
  }
  
  :global(.dark) .transaction-category {
    color: #f9fafb;
  }
  
  :global(.dark) .transaction-description {
    color: #d1d5db;
  }
  
  .charts-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .chart-container {
    position: relative;
    height: 300px;
  }
  
  .chart-container.pie-chart {
    height: 250px;
  }
  
  @media (max-width: 768px) {
    .charts-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
