<script>
  export let type = 'button';
  export let variant = 'primary'; // primary, secondary, danger
  export let onClick = () => {};
</script>

<button type="{type}" class="btn btn-{variant}" on:click={onClick}>
  <slot />
</button>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font-weight: 600;
    border-radius: 8px;
    border: 1px solid transparent;
    transition: background-color 0.2s, color 0.2s;
  }

  .btn-primary {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }

  .btn-primary:hover {
    background-color: #2980b9;
  }

  .btn-secondary {
    background-color: #e2e8f0;
    color: #4a5568;
    border-color: #e2e8f0;
  }

  .btn-secondary:hover {
    background-color: #cbd5e0;
  }

  .btn-danger {
    background-color: #e74c3c;
    color: white;
    border-color: #e74c3c;
  }

  .btn-danger:hover {
    background-color: #c0392b;
  }
</style>
