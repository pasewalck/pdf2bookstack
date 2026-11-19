import type { UploadOptionsControls } from '../hooks/useUploadOptions';

interface UploadOptionsProps {
  isDisabled: boolean;
  options: UploadOptionsControls;
}

export function UploadOptions({ isDisabled, options }: UploadOptionsProps) {
  const { useMarkdown, setUseMarkdown, keepImages, setKeepImages, uploadSource, setUploadSource } =
    options;

  return (
    <div className={`flex flex-wrap gap-6 items-center py-2 px-4 bg-gray-50 rounded-lg ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={useMarkdown}
          disabled={isDisabled}
          onChange={(e) => setUseMarkdown(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-500 transition-colors">
          Markdown Output
        </span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={keepImages}
          disabled={isDisabled}
          onChange={(e) => setKeepImages(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-500 transition-colors">
          Extract Images
        </span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={uploadSource}
          disabled={isDisabled}
          onChange={(e) => setUploadSource(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-500 transition-colors">
          Attach Source PDF
        </span>
      </label>
    </div>
  );
}
