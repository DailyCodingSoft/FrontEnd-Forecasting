import { useState } from "react";
import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import Modal from "@/components/ui/Modal";
import FileUploader from "@/components/file/FileUploader";
import { insertSalesTableData } from '@/services/sales'
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
  const [resetKey, setResetKey] = useState(0);
  const [hasError, setHasError] = useState(false);

  const parseNumber = (value: string | number) => {
    if (typeof value === "number") return value;

    if (typeof value === "string") {
      return Number(
        value
          .replace(/\./g, "")   // quita miles
          .replace(",", ".")    // decimal
      );
    }

    return 0;
  };

  const mapToDto = (rows: any[]) => {
    return rows.map((row) => {
      // detectar si es array o objeto
      const isArray = Array.isArray(row);

      return {
        productName: isArray ? row[0] : row.Producto,
        identificator: (isArray ? row[1] : row.Identificador),
        quantity: (isArray ? row[2] : parseNumber(row.Venta)),
        week: Number(isArray ? row[3] : row.Semana) || 0,
        date: parseDate(isArray ? row[4] : row.Fecha),
      };
    });
  };
  // 👇 función que ENVÍA al backend
  const handleUpload = async () => {
    try {
      if (parsedData.length === 0) {
        console.warn("No hay datos para enviar");
        return;
      }
      console.log("Datos a enviar:", parsedData.slice(0, 2)); // 👈 revisar datos antes de enviar
      console.log("Fila ejemplo:", parsedData[0]);
      const mappedData = mapToDto(parsedData);

      const response = await insertSalesTableData(mappedData);
      console.log("Respuesta del servidor:", response);
      setParsedData([]);
      setHasError(false);
      setResetKey(prev => prev + 1);
      setOpen(true); // 👈 abre modal SOLO si todo sale bien
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setParsedData([]);
    setHasError(false);
    setResetKey(prev => prev + 1); // 👈 fuerza reset del uploader
    console.log("Carga cancelada, estado reseteado", hasError);
  };

  return (
    <div className="p-10 flex flex-col items-center">
      <Title text="CARGAR ARCHIVO EXCEL/CSV" />

      {/* 👇 aquí recibes los datos del uploader */}
      <FileUploader onDataParsed={setParsedData} resetTrigger={resetKey} onError={setHasError} />

      <div className="flex flex-col md:flex-row gap-4 mt-6 w-full md:w-auto">
        {/* 👇 ESTE ES EL CAMBIO CLAVE */}
        <Button label="Cargar" variant="success" onClick={handleUpload} />
        <Button label="Cancelar" variant="danger" onClick={handleCancel} />
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