import Papa from 'papaparse';
import jsPDF from 'jspdf';
import type { Transaction } from '../types';

/**
 * Converts transactions to CSV format.
 */
export function exportToCSV(data: Transaction[]): string {
  return Papa.unparse(data);
}

/**
 * Generates a PDF from transactions.
 */
export function exportToPDF(data: Transaction[]): jsPDF {
  const doc = new jsPDF();
  data.forEach((t, i) => {
    doc.text(`${i + 1}. ${t.category} - $${t.amount}`, 10, 10 + i * 10);
  });
  return doc;
}
