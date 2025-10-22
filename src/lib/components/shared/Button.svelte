<script>
  export let type = 'button';
  export let variant = 'primary'; // primary, secondary, danger
</script>

<button type="{type}" class="btn btn-{variant}" on:click>
  <slot />
</button>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.625rem 1.25rem;
    font-weight: 600;
    font-size: 0.9375rem;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .btn:active {
    transform: translateY(0);
  }

  .btn-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
  }

  .btn-primary:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  }

  .btn-secondary {
    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
    color: #475569;
  }

  .btn-secondary:hover {
    background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%);
  }

  .btn-danger {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
  }

  .btn-danger:hover {
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  }

  :global(.dark) .btn-secondary {
    background: linear-gradient(135deg, #334155 0%, #1e293b 100%);
    color: #cbd5e1;
  }

  :global(.dark) .btn-secondary:hover {
    background: linear-gradient(135deg, #475569 0%, #334155 100%);
  }
</style>
