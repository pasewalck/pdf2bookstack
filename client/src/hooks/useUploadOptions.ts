import { useState } from 'react';

export interface UploadOptionsState {
  useMarkdown: boolean;
  keepImages: boolean;
  uploadSource: boolean;
}

export interface UploadOptionsControls extends UploadOptionsState {
  setUseMarkdown: (value: boolean) => void;
  setKeepImages: (value: boolean) => void;
  setUploadSource: (value: boolean) => void;
  getOptions: () => UploadOptionsState;
  reset: () => void;
}

export function useUploadOptions(): UploadOptionsControls {
  const [useMarkdown, setUseMarkdown] = useState<boolean>(false);
  const [keepImages, setKeepImages] = useState<boolean>(true);
  const [uploadSource, setUploadSource] = useState<boolean>(true);

  const getOptions = (): UploadOptionsState => ({
    useMarkdown,
    keepImages,
    uploadSource
  });

  const reset = () => {
    setUseMarkdown(false);
    setKeepImages(true);
    setUploadSource(true);
  };

  return {
    useMarkdown,
    setUseMarkdown,
    keepImages,
    setKeepImages,
    uploadSource,
    setUploadSource,
    getOptions,
    reset
  };
}
