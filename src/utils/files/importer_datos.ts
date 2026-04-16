import type { promises } from 'dns';
import ExcelJS from 'exceljs';
import Papa from 'papaparse';

const parseXLSX = async (file: File) => {
  const workbook = new ExcelJS.Workbook();
  const buffer = await file.arrayBuffer();

  await workbook.xlsx.load(buffer);

  const sheet = workbook.worksheets[0];
  const data: any[] = [];

  if (!sheet) return data;

  sheet.eachRow((row, rowIndex) => {
    // saltar header
    if (rowIndex === 1) return;

    // asegurar que values existe y es array
    const values = row.values as any[];

    if (!values) return;

    data.push(values.slice(1)); // ExcelJS deja index 0 vacío
  });

  return data;
};
const parseCSV = (file:any): Promise<ParsedRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results:any) => resolve(results.data),
      error: (err:any) => reject(err),
    });
  });
};
type ParsedRow = Record<string, any> | any[];
const parseFile = async (file:File): Promise<ParsedRow[]> => {
  const fileType = file.name.split('.').pop()?.toLowerCase();

  if (fileType === 'xlsx') {
    return await parseXLSX(file);
  }

  if (fileType === 'csv') {
    return await parseCSV(file);
  }

  throw new Error('Formato no soportado');
};
export default parseFile;