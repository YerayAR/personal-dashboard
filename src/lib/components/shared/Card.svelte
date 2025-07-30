<script>
  export let className = '';
  export let padding = true;
</script>

<div class="card {className}" class:no-padding={!padding}>
  <slot />
</div>

<style>
  .card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
    transition: all 0.2s ease-in-out;
  }

  .card:not(.no-padding) {
    padding: 1.5rem;
  }

  .card:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  }

  :global(.dark) .card {
    background: #1f2937;
    border: 1px solid #374151;
  }
</style>
