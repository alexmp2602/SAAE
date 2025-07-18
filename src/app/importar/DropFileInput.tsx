"use client";

import { UploadCloud } from "lucide-react";
import { useState, DragEvent, ChangeEvent } from "react";

type Props = {
  onFileSelect: (file: File) => void;
};

export default function DropFileInput({ onFileSelect }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="file-upload"
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-md px-6 py-8 cursor-pointer transition-colors focus:outline-none focus:ring-2 ${
          isDragging
            ? "bg-blue-50 border-blue-400 ring-blue-300"
            : "bg-gray-50 border-gray-300 hover:bg-gray-100"
        }`}
      >
        <UploadCloud className="w-8 h-8 mb-2 text-blue-600" />

        <p className="text-sm text-gray-700 font-medium hidden sm:block">
          Arrastrá un archivo o{" "}
          <span className="text-blue-600 underline">hacé clic</span>
        </p>
        <p className="text-sm text-gray-700 font-medium sm:hidden">
          Tocá para seleccionar el archivo
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Formatos aceptados: <code>.csv</code> o <code>.xlsx</code>
        </p>
      </label>

      <input
        id="file-upload"
        type="file"
        accept=".csv, .xlsx"
        onChange={handleFileUpload}
        className="hidden"
      />

      {fileName && (
        <p className="text-sm text-gray-700">
          Archivo seleccionado: <span className="font-medium">{fileName}</span>
        </p>
      )}
    </div>
  );
}
