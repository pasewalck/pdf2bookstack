import { useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { useUploadStatus } from './useUploadStatus';
import { useUploadOptions } from './useUploadOptions';

interface UploadResponse {
  success: boolean;
  pageUrl: string;
  error?: string;
}

export function useHandleUpload(token: string) {
  const uploadStatus = useUploadStatus();
  const uploadOptions = useUploadOptions();

  const handleUpload = useCallback(
    async (file: File) => {
      if (!file) return;

      uploadStatus.setStatus('uploading');
      uploadStatus.setMessage('Converting PDF and uploading to BookStack...');

      const formData = new FormData();
      formData.append('file', file);

      const options = uploadOptions.getOptions();
      formData.append('useMarkdown', String(options.useMarkdown));
      formData.append('keepImages', String(options.keepImages));

      const apiUrl = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3001';
      try {
        const response = await axios.post<UploadResponse>(
          `${apiUrl}/api/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.data.success) {
          uploadStatus.setStatus('success');
          uploadStatus.setMessage('Successfully imported to BookStack!');
          uploadStatus.setResultUrl(response.data.pageUrl);
        }
      } catch (err) {
        const axiosError = err as AxiosError<{ error?: string }>;
        uploadStatus.setStatus('error');
        uploadStatus.setMessage(
          axiosError.response?.data?.error || 'An error occurred during upload'
        );
      }
    },
    [token, uploadStatus, uploadOptions]
  );

  return { handleUpload, uploadStatus, uploadOptions };
}
