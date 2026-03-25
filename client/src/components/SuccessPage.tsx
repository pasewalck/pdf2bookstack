import { CheckCircle } from 'lucide-react';

interface SuccessPageProps {
  message: string;
  pageUrl: string;
  onUploadAnother: () => void;
}

export function SuccessPage({ message, pageUrl, onUploadAnother }: SuccessPageProps) {
  return (
    <div className="text-center py-8">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Upload Complete</h2>
      <p className="text-gray-600 mb-6">{message}</p>
      <div className="flex gap-4 justify-center">
        <a
          href={pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          View Page
        </a>
        <button
          onClick={onUploadAnother}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
        >
          Upload Another
        </button>
      </div>
    </div>
  );
}
