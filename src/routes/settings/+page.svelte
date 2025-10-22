<script>
  import Card from '$lib/components/shared/Card.svelte';
  import Button from '$lib/components/shared/Button.svelte';
  import { browser } from '$app/environment';

  let darkMode = false;
  let currency = 'EUR';
  let notifications = true;
  let autoBackup = false;

  // Cargar configuración desde localStorage
  if (browser) {
    darkMode = localStorage.getItem('darkMode') === 'true';
    currency = localStorage.getItem('currency') || 'EUR';
    notifications = localStorage.getItem('notifications') !== 'false';
    autoBackup = localStorage.getItem('autoBackup') === 'true';
  }

  // Reactive statements para guardar cambios automáticamente
  $: if (browser && darkMode !== undefined) {
    localStorage.setItem('darkMode', darkMode.toString());
    document.body.classList.toggle('dark', darkMode);
  }

  $: if (browser && currency) {
    localStorage.setItem('currency', currency);
  }

  $: if (browser && notifications !== undefined) {
    localStorage.setItem('notifications', notifications.toString());
  }

  $: if (browser && autoBackup !== undefined) {
    localStorage.setItem('autoBackup', autoBackup.toString());
  }

  const exportData = () => {
    try {
      // Obtener datos desde localStorage (en una app real, sería desde la API)
      const data = {
        settings: {
          darkMode,
          currency,
          notifications,
          autoBackup
        },
        exportDate: new Date().toISOString()
      };
      
      // Crear blob y descargar
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `findash-settings-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('¡Datos exportados exitosamente!');
    } catch (error) {
      alert('Error al exportar los datos');
      console.error(error);
    }
  };

  const clearData = () => {
    if (confirm('¿Estás seguro de que quieres eliminar todos los datos? Esta acción no se puede deshacer.')) {
      if (browser) {
        localStorage.clear();
        alert('Todos los datos han sido eliminados. La página se recargará.');
        window.location.reload();
      }
    }
  };
</script>

<div class="page-container">
  <header class="page-header">
    <h1>Configuración</h1>
    <p>Personaliza tu experiencia con FinDash.</p>
  </header>

  <div class="settings-grid">
    <Card>
      <h3>Apariencia</h3>
      <div class="setting-item">
        <div class="setting-info">
<label for="dark-mode-toggle">Modo Oscuro</label>
          <p>Activa el tema oscuro para una mejor experiencia nocturna</p>
        </div>
        <label class="toggle">
          <input id="dark-mode-toggle" type="checkbox" bind:checked={darkMode} />
          <span class="slider"></span>
        </label>
      </div>
    </Card>

    <Card>
      <h3>Moneda</h3>
      <div class="setting-item">
        <div class="setting-info">
          <label for="currency">Moneda Principal</label>
          <p>Selecciona la moneda para mostrar los importes</p>
        </div>
        <select id="currency" bind:value={currency}>
          <option value="EUR">Euro (€)</option>
          <option value="USD">Dólar ($)</option>
          <option value="GBP">Libra (£)</option>
        </select>
      </div>
    </Card>

    <Card>
      <h3>Notificaciones</h3>
      <div class="setting-item">
        <div class="setting-info">
<label for="notifications-toggle">Notificaciones Push</label>
          <p>Recibe notificaciones sobre tus metas y presupuestos</p>
        </div>
        <label class="toggle">
          <input id="notifications-toggle" type="checkbox" bind:checked={notifications} />
          <span class="slider"></span>
        </label>
      </div>
    </Card>

    <Card>
      <h3>Respaldo</h3>
      <div class="setting-item">
        <div class="setting-info">
<label for="backup-toggle">Respaldo Automático</label>
          <p>Guarda automáticamente tus datos en la nube</p>
        </div>
        <label class="toggle">
          <input id="backup-toggle" type="checkbox" bind:checked={autoBackup} />
          <span class="slider"></span>
        </label>
      </div>
    </Card>

    <Card>
      <h3>Datos</h3>
      <div class="setting-actions">
        <Button on:click={exportData}>Exportar Datos</Button>
        <Button variant="danger" on:click={clearData}>Eliminar Datos</Button>
      </div>
    </Card>
  </div>
</div>

<style>
  .page-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
  }
  
  .page-header p {
    color: #6b7280;
    margin-top: 0.25rem;
  }

  .settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .setting-info {
    flex: 1;
  }

  .setting-info label {
    font-weight: 500;
    color: #1f2937;
    display: block;
    margin-bottom: 0.25rem;
  }

  .setting-info p {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
  }

  .toggle {
    position: relative;
    display: inline-block;
    width: 52px;
    height: 28px;
    cursor: pointer;
  }

  .toggle input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 28px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 3px;
    background: white;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  input:checked + .slider {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  input:checked + .slider:before {
    transform: translateX(24px);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
  }

  .slider:hover {
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }

  select {
    padding: 0.625rem 1rem;
    border-radius: 10px;
    border: 2px solid #e2e8f0;
    background: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    outline: none;
  }

  select:hover {
    border-color: #3b82f6;
  }

  select:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .setting-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  h3 {
    margin: 0 0 1.25rem 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
  }

  :global(.dark) .setting-info label {
    color: #f9fafb;
  }

  :global(.dark) .setting-info p {
    color: #d1d5db;
  }

  :global(.dark) .slider {
    background: linear-gradient(135deg, #475569 0%, #334155 100%);
  }

  :global(.dark) input:checked + .slider {
    background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
  }

  :global(.dark) select {
    background: #1e293b;
    border-color: #475569;
    color: #e2e8f0;
  }

  :global(.dark) select:hover,
  :global(.dark) select:focus {
    border-color: #3b82f6;
  }

  :global(.dark) h3 {
    color: #e2e8f0;
  }
</style>
