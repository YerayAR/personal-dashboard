<script>
  export let className = '';
  export let padding = true;
</script>

<div class="card {className}" class:no-padding={!padding}>
  <slot />
</div>

<style>
  .card {
    background: linear-gradient(145deg, #ffffff 0%, #fafbfc 100%);
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(226, 232, 240, 0.8);
  }

  .card:not(.no-padding) {
    padding: 2rem;
  }

  .card:hover {
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15), 0 4px 8px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px) scale(1.005);
  }

  :global(.dark) .card {
    background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
    border: 1px solid rgba(71, 85, 105, 0.5);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  :global(.dark) .card:hover {
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2), 0 4px 8px rgba(0, 0, 0, 0.4);
  }
</style>
