import { useState } from 'react';

interface UploadOptionsState {
  useMarkdown: boolean;
  keepImages: boolean;
}

export function useUploadOptions() {
  const [useMarkdown, setUseMarkdown] = useState<boolean>(false);
  const [keepImages, setKeepImages] = useState<boolean>(true);

  const getOptions = (): UploadOptionsState => ({
    useMarkdown,
    keepImages
  });

  const reset = () => {
    setUseMarkdown(false);
    setKeepImages(true);
  };

  return {
    useMarkdown,
    setUseMarkdown,
    keepImages,
    setKeepImages,
    getOptions,
    reset
  };
}
