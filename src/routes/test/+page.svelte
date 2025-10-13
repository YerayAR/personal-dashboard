<script>
  import { onMount } from 'svelte';
  
  let status = 'Loading...';
  
  onMount(() => {
    status = 'App is working!';
  });
</script>

<svelte:head>
  <title>Dashboard Test</title>
</svelte:head>

<div class="container">
  <h1>Personal Dashboard - Deployment Test</h1>
  <p class="status">Status: {status}</p>
  <p>Environment: {import.meta.env.MODE}</p>
  
  <div class="info">
    <h2>✅ Working Features:</h2>
    <ul>
      <li>SvelteKit deployment</li>
      <li>Static page rendering</li>
      <li>Client-side JavaScript</li>
    </ul>
    
    <h2>🚧 Next Steps:</h2>
    <ul>
      <li>Configure MongoDB Atlas connection</li>
      <li>Set up environment variables</li>
      <li>Test API endpoints</li>
    </ul>
  </div>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: system-ui, -apple-system, sans-serif;
  }
  
  h1 {
    color: #2563eb;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .status {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    color: #059669;
    margin-bottom: 2rem;
  }
  
  .info {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.5rem;
  }
  
  h2 {
    color: #1e293b;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  
  ul {
    margin: 0 0 1.5rem 0;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.25rem;
  }
</style>