<script>
  import Card from '../shared/Card.svelte';
  import TrendingUp from '$lib/icons/TrendingUp.svelte';
  import TrendingDown from '$lib/icons/TrendingDown.svelte';

  export let title = '';
  export let value = 0;
  export let change = 0;
  export let format = 'currency';
  export let trend = 'neutral'; // up, down, neutral

  const formatValue = (val) => {
    if (format === 'currency') {
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
      }).format(val);
    }
    return val.toString();
  };

  const formatChange = (val) => {
    const sign = val >= 0 ? '+' : '';
    if (format === 'currency') {
      return `${sign}${new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
      }).format(val)}`;
    }
    return `${sign}${val}%`;
  };
</script>

<Card>
  <div class="kpi-card">
    <div class="kpi-header">
      <h3 class="kpi-title">{title}</h3>
      {#if trend !== 'neutral'}
        <div class="trend-icon trend-{trend}">
          {#if trend === 'up'}
            <TrendingUp />
          {:else}
            <TrendingDown />
          {/if}
        </div>
      {/if}
    </div>
    
    <div class="kpi-value">{formatValue(value)}</div>
    
    {#if change !== 0}
      <div class="kpi-change change-{change >= 0 ? 'positive' : 'negative'}">
        {formatChange(change)} desde el mes pasado
      </div>
    {/if}
  </div>
</Card>

<style>
  .kpi-card {
    text-align: left;
  }

  .kpi-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .kpi-title {
    font-size: 0.9rem;
    font-weight: 500;
    color: #6b7280;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .trend-icon {
    width: 24px;
    height: 24px;
  }

  .trend-up {
    color: #2ecc71;
  }

  .trend-down {
    color: #e74c3c;
  }

  .kpi-value {
    font-size: 2.25rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 0.5rem;
  }

  .kpi-change {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .change-positive {
    color: #2ecc71;
  }

  .change-negative {
    color: #e74c3c;
  }

  :global(.dark) .kpi-title {
    color: #9ca3af;
  }

  :global(.dark) .kpi-value {
    color: #f9fafb;
  }
</style>
