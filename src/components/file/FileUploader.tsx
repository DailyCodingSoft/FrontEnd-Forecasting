// components/file/FileUploader.tsx
import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import parseFile from "@/utils/files/importer_datos";

type FileItem = {
  file: File;
  progress: number;
  status: "uploading" | "success" | "error";
};

type Props = {
  onDataParsed: (data: any[]) => void;
  resetTrigger: number;
  onError: (hasError: boolean) => void;
};

const PROGRESS_BAR_COLOR: Record<FileItem["status"], string> = {
  uploading: "success.300",
  success: "success.500",
  error: "danger.500",
};

const FileUploader = ({ onDataParsed, resetTrigger, onError }: Props) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setFiles([]);
  }, [resetTrigger]);

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
      readFile(fileItem.file, index);
    });
  };

  // 📂 Input file
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    processFiles(files);
  };

  // 🖱️ Drag & Drop
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (!droppedFiles || droppedFiles.length === 0) return;

    processFiles(droppedFiles);
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
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
  const readFile = async (file: File, index: number) => {
    try {
      const data = await parseFile(file);
      setFiles((prev) => {
        const updated = [...prev];
        updated[index].status = "success";
        return updated;
      });
      onDataParsed(data);
      onError(false);
    } catch (error) {
      console.error("Error leyendo archivo:", error);
      setFiles((prev) => {
        const updated = [...prev];
        updated[index].status = "error";
        return updated;
      });

      onError(true);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">

      {/* Dropzone */}
      <Box
        as="label"
        className="flex flex-col items-center justify-center cursor-pointer transition"
        w="500px"
        h="250px"
        borderWidth="2px"
        borderStyle="dashed"
        borderColor={isDragging ? "info.500" : "black"}
        bg={isDragging ? "info.50" : "transparent"}
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

        <Text fontWeight="semibold">ARRASTRA O SELECCIONA UN ARCHIVO</Text>
      </Box>

      {/* Lista de archivos */}
      <div className="flex flex-col gap-4">
        {files.map((item, i) => (
          <Box key={i} className="w-full md:w-[300px]">

            <Text fontSize="sm" fontWeight="medium">{item.file.name}</Text>

            <Box w="100%" h="3" bg="gray.200" borderRadius="sm" mt={1}>
              <Box
                className="transition-all"
                h="3"
                borderRadius="sm"
                bg={PROGRESS_BAR_COLOR[item.status]}
                width={`${item.progress}%`}
              />
            </Box>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;