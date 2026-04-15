// pages/upload/UploadPage.tsx
import { useState } from "react";
import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import Modal from "@/components/ui/Modal";
import FileUploader from "@/components/file/FileUploader";

const UploadPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-10 flex flex-col items-center">
      <Title text="CARGAR ARCHIVO EXCEL/CSV" />

      <FileUploader />

      <div className="flex flex-col md:flex-row gap-4 mt-6 w-full md:w-auto">
        <Button label="Cargar" variant="success" onClick={() => setOpen(true)} />
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