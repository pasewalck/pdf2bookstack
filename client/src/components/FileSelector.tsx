import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { UploadOptions } from './UploadOptions';

interface FileSelectorProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onUpload: () => void;
  onClear: () => void;
  isUploading: boolean;
  hasError: boolean;
  errorMessage: string;
}

export function FileSelector({
  file,
  onFileSelect,
  onUpload,
  onClear,
  isUploading,
  hasError,
  errorMessage
}: FileSelectorProps) {
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input {...getInputProps()} disabled={isUploading} />

        {file ? (
          <div className="flex flex-col items-center">
            <FileText className="w-12 h-12 text-blue-500 mb-3" />
            <p className="text-lg font-medium text-gray-800">{file.name}</p>
            <p className="text-sm text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <UploadCloud className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-lg font-medium text-gray-700 mb-1">
              Drag & drop a PDF here
            </p>
            <p className="text-sm text-gray-500">or click to select a file</p>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 text-center">
        PDF data is processed by <a href="https://www.datalab.to" target="_blank" rel="noopener noreferrer" className="underline">datalab.to</a>
      </p>

      <UploadOptions isDisabled={isUploading} />

      {hasError && (
        <div className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="flex justify-end gap-3">
        {file && !isUploading && (
          <button
            onClick={onClear}
            className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            Clear
          </button>
        )}
        <button
          onClick={onUpload}
          disabled={!file || isUploading}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            'Import to BookStack'
          )}
        </button>
      </div>
    </div>
  );
}
