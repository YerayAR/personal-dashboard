<script>
  import Card from '../shared/Card.svelte';
  import TrendingUp from '$lib/icons/TrendingUp.svelte';
  import TrendingDown from '$lib/icons/TrendingDown.svelte';
  import DollarSign from '$lib/icons/DollarSign.svelte';
  import Wallet from '$lib/icons/Wallet.svelte';

  export let title = '';
  export let value = 0;
  export let change = 0;
  export let format = 'currency';
  export let trend = 'neutral'; // up, down, neutral
  export let icon = 'wallet'; // wallet, dollar, trending

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
      <div class="title-with-icon">
        <div class="icon-wrapper icon-{icon}">
          {#if icon === 'dollar'}
            <DollarSign />
          {:else if icon === 'wallet'}
            <Wallet />
          {:else}
            <DollarSign />
          {/if}
        </div>
        <h3 class="kpi-title">{title}</h3>
      </div>
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
        <span class="change-badge">{formatChange(change)}</span>
        <span class="change-label">vs mes anterior</span>
      </div>
    {/if}
  </div>
</Card>

<style>
  .kpi-card {
    text-align: left;
    position: relative;
    overflow: hidden;
  }

  .kpi-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .title-with-icon {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .icon-wallet {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  .icon-dollar {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }

  .kpi-card:hover .icon-wrapper {
    transform: rotate(5deg) scale(1.1);
  }

  .kpi-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #64748b;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .trend-icon {
    width: 28px;
    height: 28px;
    padding: 4px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.5);
  }

  .trend-up {
    color: #10b981;
    background: rgba(16, 185, 129, 0.1);
  }

  .trend-down {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }

  .kpi-value {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 1rem 0;
    line-height: 1.2;
  }

  .kpi-change {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  .change-badge {
    font-size: 0.875rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    display: inline-block;
  }

  .change-label {
    font-size: 0.75rem;
    color: #94a3b8;
    font-weight: 400;
  }

  .change-positive .change-badge {
    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
    color: #065f46;
  }

  .change-negative .change-badge {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
    color: #991b1b;
  }

  :global(.dark) .kpi-title {
    color: #94a3b8;
  }

  :global(.dark) .kpi-value {
    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  :global(.dark) .trend-icon {
    background: rgba(15, 23, 42, 0.5);
  }

  :global(.dark) .change-positive .change-badge {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.3) 100%);
    color: #6ee7b7;
  }

  :global(.dark) .change-negative .change-badge {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.3) 100%);
    color: #fca5a5;
  }

  :global(.dark) .change-label {
    color: #64748b;
  }
</style>
