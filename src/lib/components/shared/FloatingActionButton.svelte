<script>
  import { createEventDispatcher } from 'svelte';
  import Plus from '$lib/icons/Plus.svelte';

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch('click');
  };
</script>

<button class="fab" on:click={handleClick} title="Nueva transacción">
  <Plus />
</button>

<style>
  .fab {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #3498db, #2ecc71);
    border: none;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    transition: all 0.3s ease;
    color: white;
  }

  .fab:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(52, 152, 219, 0.4);
  }

  .fab:active {
    transform: scale(0.95);
  }

  .fab :global(svg) {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    .fab {
      bottom: 1.5rem;
      right: 1.5rem;
      width: 48px;
      height: 48px;
    }

    .fab :global(svg) {
      width: 20px;
      height: 20px;
    }
  }
</style>
