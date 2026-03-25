import { useState, useCallback } from 'react';
import { FileSelector } from './FileSelector';
import { SuccessPage } from './SuccessPage';
import { useHandleUpload } from '../hooks/useHandleUpload';

interface UploaderProps {
  token: string;
}

export const Uploader = ({ token }: UploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { handleUpload, uploadStatus, uploadOptions } = useHandleUpload(token);

  const onFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    uploadStatus.setStatus('idle');
    uploadStatus.setMessage('');
  }, [uploadStatus]);

  const onUpload = async () => {
    if (!file) return;
    await handleUpload(file);
  };

  const reset = () => {
    setFile(null);
    uploadStatus.reset();
    uploadOptions.reset();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      {uploadStatus.status === 'success' ? (
        <SuccessPage
          message={uploadStatus.message}
          pageUrl={uploadStatus.resultUrl}
          onUploadAnother={reset}
        />
      ) : (
        <FileSelector
          file={file}
          onFileSelect={onFileSelect}
          onUpload={onUpload}
          onClear={reset}
          isUploading={uploadStatus.status === 'uploading'}
          hasError={uploadStatus.status === 'error'}
          errorMessage={uploadStatus.message}
        />
      )}
    </div>
  );
};
