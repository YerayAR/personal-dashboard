<script>
  import Sidebar from '$lib/components/shared/Sidebar.svelte';
  import FloatingActionButton from '$lib/components/shared/FloatingActionButton.svelte';
  import TransactionModal from '$lib/components/shared/TransactionModal.svelte';
  import Menu from '$lib/icons/Menu.svelte';
  import { browser } from '$app/environment';

  export const data = {};
  
  let isModalOpen = false;
  let isSidebarOpen = false;

  // Aplicar modo oscuro al cargar
  if (browser) {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
      document.body.classList.add('dark');
    }
  }

  const toggleSidebar = () => {
    isSidebarOpen = !isSidebarOpen;
  };

  const openModal = () => {
    isModalOpen = true;
  };
  
  const closeModal = () => {
    isModalOpen = false;
  };
  
  const handleTransactionAdded = () => {
    window.location.reload();
  };
</script>

<div class="app-layout" class:sidebar-open={isSidebarOpen}>
  <Sidebar bind:isOpen={isSidebarOpen} {toggleSidebar} />
  
  <button class="mobile-menu-button" on:click={toggleSidebar}>
    <Menu />
  </button>
  
  {#if isSidebarOpen}
<div class="sidebar-backdrop" on:click={toggleSidebar} on:keydown={(e) => e.key === 'Enter' && toggleSidebar()} role="button" tabindex="0"></div>
  {/if}

  <main class="main-content">
    <slot />
  </main>
  
  <FloatingActionButton on:click={openModal} />
  
  <TransactionModal 
    bind:isOpen={isModalOpen} 
    on:close={closeModal}
    on:transactionAdded={handleTransactionAdded}
  />
</div>

<style>
  :global(*, *::before, *::after) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #f8fafc;
    color: #1a202c;
    line-height: 1.6;
  }

  :global(.dark) {
    background-color: #1a202c;
    color: #f7fafc;
  }

  .app-layout {
    display: flex;
    min-height: 100vh;
  }

  .main-content {
    flex: 1;
    margin-left: 260px;
    padding: 2rem;
    background-color: #f8fafc;
    min-height: 100vh;
  }

  :global(.dark) .main-content {
    background-color: #1a202c;
  }

  .mobile-menu-button {
    display: none;
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 101;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    width: 48px;
    height: 48px;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .mobile-menu-button:hover {
    background: #2980b9;
    transform: scale(1.05);
  }

  .sidebar-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }

  @media (max-width: 768px) {
    .main-content {
      margin-left: 0;
      padding: 1rem;
      padding-top: 4rem;
    }

    .mobile-menu-button {
      display: flex;
    }
  }
</style>
