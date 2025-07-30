<script>
  import Card from '$lib/components/shared/Card.svelte';
  import Button from '$lib/components/shared/Button.svelte';
  import Papa from 'papaparse';
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';

  export let data;
  let { transactions } = data;

  const exportToCSV = () => {
    const csv = Papa.unparse(transactions.map(t => ({
      Fecha: new Date(t.date).toLocaleDateString(),
      Descripción: t.description,
      Categoría: t.category,
      Monto: t.amount
    })));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'transacciones.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Fecha', 'Descripción', 'Categoría', 'Monto']],
      body: transactions.map(t => [
        new Date(t.date).toLocaleDateString(),
        t.description,
        t.category,
        t.amount.toFixed(2)
      ])
    });
    doc.save('transacciones.pdf');
  };
</script>

<div class="page-container">
  <header class="page-header">
    <h1>Reportes</h1>
    <p>Genera y descarga reportes de tus finanzas.</p>
  </header>

  <Card>
    <div class="export-container">
      <h3>Exportar Transacciones</h3>
      <p>Descarga todos tus datos de transacciones en formato CSV o PDF.</p>
      <div class="export-buttons">
        <Button onClick={exportToCSV}>Exportar a CSV</Button>
        <Button onClick={exportToPDF} variant="secondary">Exportar a PDF</Button>
      </div>
    </div>
  </Card>
</div>

<style>
  .page-container, .export-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

  .export-container h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }

  .export-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
</style>
