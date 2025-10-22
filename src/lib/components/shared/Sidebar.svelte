<script>
  import { page } from '$app/stores';
  import BarChart from '$lib/icons/BarChart.svelte';
  import List from '$lib/icons/List.svelte';
  import Target from '$lib/icons/Target.svelte';
  import FileText from '$lib/icons/FileText.svelte';
  import Settings from '$lib/icons/Settings.svelte';

  export let isOpen = false;
  export let toggleSidebar = () => {};

  const menuItems = [
    { href: '/', icon: BarChart, label: 'Dashboard' },
    { href: '/transactions', icon: List, label: 'Transacciones' },
    { href: '/goals', icon: Target, label: 'Metas' },
    { href: '/reports', icon: FileText, label: 'Reportes' },
    { href: '/settings', icon: Settings, label: 'Configuración' }
  ];
  
  const handleLinkClick = () => {
    // Cerrar sidebar en móvil después de hacer clic
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  };
</script>

<nav class="sidebar" class:is-open={isOpen}>
  <div class="sidebar-header">
    <h2>FinDash</h2>
  </div>
  
  <ul class="nav-menu">
    {#each menuItems as item}
<li class="nav-item">
        <a 
          href={item.href} 
          class="nav-link" 
          class:active={$page.url.pathname === item.href}
          on:click={handleLinkClick}
        >
          <svelte:component this={item.icon} />
          <span>{item.label}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .sidebar {
    width: 260px;
    height: 100vh;
    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
    border-right: 1px solid rgba(226, 232, 240, 0.6);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    overflow-y: auto;
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.04);
  }

  .sidebar-header {
    padding: 2rem 1.5rem 1.5rem;
    border-bottom: none;
    margin-bottom: 1rem;
  }

  .sidebar-header h2 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 700;
    background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
  }

  .nav-menu {
    list-style: none;
    padding: 0.5rem 1rem;
    margin: 0;
  }

  .nav-item {
    margin-bottom: 0.5rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.875rem 1rem;
    color: #64748b;
    text-decoration: none;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    font-weight: 500;
    font-size: 0.9375rem;
  }

  .nav-link:hover {
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    color: #0f172a;
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
  }

  .nav-link.active {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    font-weight: 600;
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
    transform: translateX(4px);
  }

  .nav-link.active::before {
    content: '';
    position: absolute;
    left: -1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 70%;
    background: linear-gradient(180deg, #3b82f6 0%, #10b981 100%);
    border-radius: 0 4px 4px 0;
  }

  .nav-link :global(svg) {
    width: 22px;
    height: 22px;
    margin-right: 0.875rem;
    transition: transform 0.3s ease;
  }

  .nav-link:hover :global(svg) {
    transform: scale(1.1);
  }

  .nav-link.active :global(svg) {
    filter: drop-shadow(0 2px 4px rgba(255, 255, 255, 0.3));
  }

  @media (max-width: 768px) {
    .sidebar {
      transform: translateX(-100%);
      transition: transform 0.3s ease-in-out;
    }

    .sidebar.is-open {
      transform: translateX(0);
    }
  }

  :global(.dark) .sidebar {
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
    border-right-color: rgba(71, 85, 105, 0.5);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.5);
  }

  :global(.dark) .sidebar-header h2 {
    background: linear-gradient(135deg, #60a5fa 0%, #34d399 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  :global(.dark) .nav-link {
    color: #94a3b8;
  }

  :global(.dark) .nav-link:hover {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    color: #e2e8f0;
  }

  :global(.dark) .nav-link.active {
    background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
    color: white;
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
  }

  :global(.dark) .nav-link.active::before {
    background: linear-gradient(180deg, #60a5fa 0%, #34d399 100%);
  }
</style>
