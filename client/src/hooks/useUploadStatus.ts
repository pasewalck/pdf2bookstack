import { useState } from 'react';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface UploadStatusState {
  status: UploadStatus;
  message: string;
  resultUrl: string;
}

export function useUploadStatus() {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [message, setMessage] = useState<string>('');
  const [resultUrl, setResultUrl] = useState<string>('');

  const getStatus = (): UploadStatusState => ({
    status,
    message,
    resultUrl
  });

  const reset = () => {
    setStatus('idle');
    setMessage('');
    setResultUrl('');
  };

  return {
    status,
    message,
    resultUrl,
    setStatus,
    setMessage,
    setResultUrl,
    getStatus,
    reset
  };
}
