<script>
  import KPICard from '$lib/components/dashboard/KPICard.svelte';
  import Card from '$lib/components/shared/Card.svelte';
  import FlowChart from '$lib/components/dashboard/FlowChart.svelte';
  import CategoryChart from '$lib/components/dashboard/CategoryChart.svelte';
  import GoalsSection from '$lib/components/GoalsSection.svelte';
  import { formatCurrency, formatDate } from '$lib/utils/common';
  
  // Category icon and color mapping
  const categoryIcons = {
    'Alimentación': 'food',
    'Transporte': 'car',
    'Vivienda': 'home',
    'Entretenimiento': 'entertainment',
    'Compras': 'shopping',
    'Salud': 'health',
    'Educación': 'filetext',
    'Otros': 'list',
    'Salario': 'briefcase',
    'Inversiones': 'trending-up',
    'Freelance': 'dollar',
    'Bonus': 'target',
  };
  
  const categoryColors = {
    'Alimentación': '#f97316',
    'Transporte': '#8b5cf6',
    'Vivienda': '#0ea5e9',
    'Entretenimiento': '#ec4899',
    'Compras': '#f59e0b',
    'Salud': '#ef4444',
    'Educación': '#3b82f6',
    'Otros': '#64748b',
    'Salario': '#10b981',
    'Inversiones': '#059669',
    'Freelance': '#14b8a6',
    'Bonus': '#22c55e',
  };
  
  const getCategoryIcon = (category) => categoryIcons[category] || 'wallet';
  const getCategoryColor = (category) => categoryColors[category] || '#64748b';
  
  // Import icons
  import Food from '$lib/icons/Food.svelte';
  import Car from '$lib/icons/Car.svelte';
  import Home from '$lib/icons/Home.svelte';
  import Entertainment from '$lib/icons/Entertainment.svelte';
  import Shopping from '$lib/icons/Shopping.svelte';
  import Health from '$lib/icons/Health.svelte';
  import Briefcase from '$lib/icons/Briefcase.svelte';
  import Wallet from '$lib/icons/Wallet.svelte';
  import DollarSign from '$lib/icons/DollarSign.svelte';
  import TrendingUp from '$lib/icons/TrendingUp.svelte';
  import Target from '$lib/icons/Target.svelte';
  import FileText from '$lib/icons/FileText.svelte';
  import List from '$lib/icons/List.svelte';

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
    <KPICard {...kpiData.balance} icon="wallet" />
    <KPICard {...kpiData.income} icon="dollar" />
    <KPICard {...kpiData.expenses} icon="wallet" />
    <KPICard {...kpiData.netFlow} icon="dollar" />
    {#if kpiData.savingsRate}
      <KPICard {...kpiData.savingsRate} icon="wallet" />
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
              <div class="transaction-icon" style="background: {getCategoryColor(transaction.category)}20; color: {getCategoryColor(transaction.category)}">
                {#if getCategoryIcon(transaction.category) === 'food'}
                  <Food />
                {:else if getCategoryIcon(transaction.category) === 'car'}
                  <Car />
                {:else if getCategoryIcon(transaction.category) === 'home'}
                  <Home />
                {:else if getCategoryIcon(transaction.category) === 'entertainment'}
                  <Entertainment />
                {:else if getCategoryIcon(transaction.category) === 'shopping'}
                  <Shopping />
                {:else if getCategoryIcon(transaction.category) === 'health'}
                  <Health />
                {:else if getCategoryIcon(transaction.category) === 'briefcase'}
                  <Briefcase />
                {:else if getCategoryIcon(transaction.category) === 'trending-up'}
                  <TrendingUp />
                {:else if getCategoryIcon(transaction.category) === 'dollar'}
                  <DollarSign />
                {:else if getCategoryIcon(transaction.category) === 'target'}
                  <Target />
                {:else if getCategoryIcon(transaction.category) === 'filetext'}
                  <FileText />
                {:else if getCategoryIcon(transaction.category) === 'list'}
                  <List />
                {:else}
                  <Wallet />
                {/if}
              </div>
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
    position: sticky;
    top: 0;
    z-index: 10;
    background: linear-gradient(135deg, rgba(240, 249, 255, 0.95) 0%, rgba(224, 242, 254, 0.95) 100%);
    backdrop-filter: blur(12px);
    padding: 1.5rem 0;
    margin: -2.5rem -2.5rem 1rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    border-bottom: 1px solid rgba(59, 130, 246, 0.1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
  }

  .dashboard-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .dashboard-header p {
    color: #64748b;
    margin-top: 0.5rem;
    font-size: 1.05rem;
    font-weight: 400;
  }

  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.75rem;
    margin-bottom: 0.5rem;
  }

  :global(.dark) .dashboard-header {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
    border-bottom-color: rgba(59, 130, 246, 0.2);
  }

  :global(.dark) .dashboard-header h1 {
    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  :global(.dark) .dashboard-header p {
    color: #94a3b8;
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
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
  }
  
  .view-all-link {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
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
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 12px;
    background: linear-gradient(135deg, #fafbfc 0%, #ffffff 100%);
    border: 1px solid rgba(226, 232, 240, 0.6);
    margin-bottom: 0.75rem;
    transition: all 0.3s ease;
  }
  
  .transaction-item:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);
    border-color: rgba(59, 130, 246, 0.3);
  }
  
  .transaction-item:last-child {
    margin-bottom: 0;
  }
  
  .transaction-icon {
    width: 44px;
    height: 44px;
    min-width: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
  
  .transaction-item:hover .transaction-icon {
    transform: scale(1.1) rotate(5deg);
  }
  
  .transaction-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }
  
  .transaction-category {
    font-weight: 600;
    color: #0f172a;
    font-size: 1rem;
  }
  
  .transaction-description {
    font-size: 0.875rem;
    color: #64748b;
  }
  
  .transaction-details {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.35rem;
  }
  
  .transaction-amount {
    font-weight: 700;
    font-size: 1.125rem;
    padding: 0.25rem 0.75rem;
    border-radius: 8px;
  }
  
  .transaction-amount.positive {
    color: #059669;
    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  }
  
  .transaction-amount.negative {
    color: #dc2626;
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  }
  
  .transaction-date {
    font-size: 0.75rem;
    color: #94a3b8;
    font-weight: 500;
  }
  
  :global(.dark) .section-header {
    border-bottom-color: #374151;
  }
  
  :global(.dark) .section-header h2 {
    color: #f9fafb;
  }
  
  :global(.dark) .transaction-item {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border-color: rgba(71, 85, 105, 0.5);
  }
  
  :global(.dark) .transaction-item:hover {
    border-color: rgba(59, 130, 246, 0.4);
  }
  
  :global(.dark) .transaction-category {
    color: #e2e8f0;
  }
  
  :global(.dark) .transaction-description {
    color: #94a3b8;
  }
  
  :global(.dark) .transaction-amount.positive {
    color: #6ee7b7;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.3) 100%);
  }
  
  :global(.dark) .transaction-amount.negative {
    color: #fca5a5;
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.3) 100%);
  }
  
  .charts-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .chart-container {
    position: relative;
    height: 350px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .chart-container.pie-chart {
    height: 280px;
  }
  
  @media (max-width: 768px) {
    .charts-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
