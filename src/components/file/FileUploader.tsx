// components/file/FileUploader.tsx
import { useState } from "react";
import parseFile from "@/utils/files/importer_datos";

type FileItem = {
  file: File;
  progress: number;
  status: "uploading" | "success" | "error";
};

type Props = {
  onDataParsed: (data: any[]) => void;
};

const FileUploader = ({ onDataParsed }: Props) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // 🔥 Procesar archivos (reutilizable)
  const processFiles = (fileList: FileList) => {
    const newFiles: FileItem[] = Array.from(fileList).map((file) => ({
      file,
      progress: 0,
      status: "uploading",
    }));

    setFiles(newFiles);

    newFiles.forEach((fileItem, index) => {
      simulateUpload(index);
      readFile(fileItem.file);
    });
  };

  // 📂 Input file
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    processFiles(files);
  };

  // 🖱️ Drag & Drop
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (!droppedFiles || droppedFiles.length === 0) return;

    processFiles(droppedFiles);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault(); // 🔥 necesario
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // 🧠 Simula carga
  const simulateUpload = (index: number) => {
    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;

      setFiles((prev) => {
        const updated = [...prev];
        updated[index].progress = progress;

        if (progress >= 100) {
          updated[index].status =
            Math.random() > 0.2 ? "success" : "error";
          clearInterval(interval);
        }

        return updated;
      });
    }, 300);
  };

  // 📖 Leer archivo
  const readFile = async (file: File) => {
    try {
      const data = await parseFile(file);

      console.log("Primeras 2 líneas:", data.slice(0, 2));
      onDataParsed(data);
    } catch (error) {
      console.error("Error leyendo archivo:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      
      {/* Dropzone */}
      <label
        className={`w-[500px] h-[250px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-black"}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          multiple
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          className="hidden"
          onChange={handleFiles}
        />

        <p className="font-semibold">
          ARRASTRA O SELECCIONA UN ARCHIVO
        </p>
      </label>

      {/* Lista de archivos */}
      <div className="flex flex-col gap-4">
        {files.map((item, i) => (
          <div key={i} className="w-full md:w-[300px]">
            
            <p className="text-sm font-medium">{item.file.name}</p>

            <div className="w-full h-3 bg-gray-200 rounded mt-1">
              <div
                className={`h-3 rounded transition-all ${
                  item.status === "error"
                    ? "bg-red-500"
                    : item.status === "success"
                    ? "bg-green-500"
                    : "bg-green-300"
                }`}
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;