import { useState } from "react";
import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import Modal from "@/components/ui/Modal";
import FileUploader from "@/components/file/FileUploader";
import {insertSalesTableData} from '@/services/sales'
import parseDate from "@/utils/dates/ParseDate";

// 👇 tipo opcional (pero recomendado)
type RawRow = {
  Producto: string;
  Identificador: string;
  Venta: number;
  Semana: number;
  Fecha: string;
};

const UploadPage = () => {
  const [open, setOpen] = useState(false);
  const [parsedData, setParsedData] = useState<RawRow[]>([]);

  // 👇 función que convierte Excel -> DTO .NET
  const mapToDto = (rows: any[]) => {
  return rows
    .map((row) => {
      //const rawDate = row[4];
      //const parsedDate = new Date(rawDate);

      return {
        productName: row[0],
        identificator: row[1],
        quantity: Number(row[2]) || 0,
        week: Number(row[3]) || 0,
        date: parseDate(row[4]), // 👈 ahora seguro
      };
    })
    .filter(Boolean); // 👈 elimina nulls
};
  console.log("Datos PARSEADOS (antes de mapear):", parsedData.length);
  console.log("Datos despues de passear", mapToDto.length) // 👈 revisar datos parseados
  // 👇 función que ENVÍA al backend
  const handleUpload = async () => {
    try {
      if (parsedData.length === 0) {
        console.warn("No hay datos para enviar");
        return;
      }
      console.log("Datos a enviar:", parsedData.slice(0, 2)); // 👈 revisar datos antes de enviar
      const mappedData = mapToDto(parsedData);

      const response = await insertSalesTableData(mappedData);

      if (!response.ok) throw new Error("Error en la carga");

      setOpen(true); // 👈 abre modal SOLO si todo sale bien
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-10 flex flex-col items-center">
      <Title text="CARGAR ARCHIVO EXCEL/CSV" />

      {/* 👇 aquí recibes los datos del uploader */}
      <FileUploader onDataParsed={setParsedData} />

      <div className="flex flex-col md:flex-row gap-4 mt-6 w-full md:w-auto">
        {/* 👇 ESTE ES EL CAMBIO CLAVE */}
        <Button label="Cargar" variant="success" onClick={handleUpload} />
        <Button label="Cancelar" variant="danger" />
      </div>

      <Modal
        open={open}
        title="Carga completada"
        description="Se completó correctamente"
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default UploadPage;