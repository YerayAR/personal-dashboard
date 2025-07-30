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
    background: #f8fafc;
    border-right: 1px solid #e2e8f0;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    overflow-y: auto;
  }

  .sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .sidebar-header h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a202c;
    background: linear-gradient(135deg, #3498db, #2ecc71);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-menu {
    list-style: none;
    padding: 1rem 0;
    margin: 0;
  }

  .nav-item {
    margin-bottom: 0.25rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    color: #4a5568;
    text-decoration: none;
    border-radius: 0;
    transition: all 0.2s ease-in-out;
    border-left: 3px solid transparent;
  }

  .nav-link:hover {
    background: #f1f5f9;
    color: #2d3748;
    border-left-color: #3498db;
  }

  .nav-link.active {
    background: #ebf8ff;
    color: #3498db;
    border-left-color: #3498db;
    font-weight: 600;
  }

  .nav-link :global(svg) {
    width: 20px;
    height: 20px;
    margin-right: 0.75rem;
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
    background: #1a202c;
    border-right-color: #2d3748;
  }

  :global(.dark) .sidebar-header h2 {
    color: white;
  }

  :global(.dark) .nav-link {
    color: #a0aec0;
  }

  :global(.dark) .nav-link:hover {
    background: #2d3748;
    color: #e2e8f0;
  }

  :global(.dark) .nav-link.active {
    background: #2b6cb0;
    color: white;
  }
</style>
