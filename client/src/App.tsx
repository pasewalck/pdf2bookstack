import { Loader2 } from 'lucide-react';
import { useToken } from './hooks/useToken';
import { Uploader } from './components/Uploader';
import { ErrorDisplay } from './components/ErrorDisplay';

function App() {
  const { token, isValid, isVerifying, bookUrl } = useToken();
  const bookstackUrl = import.meta.env.VITE_BOOKSTACK_URL || "https://example.invalid";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      <main className="flex-grow p-6 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Import PDF as Page</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Upload a PDF document. We'll automatically extract the text, formatting, and tables,
            converting it into Markdown to create a new page in your BookStack book.
          </p>
        </div>

        {isVerifying ? (
          <div className="flex flex-col items-center gap-4 py-12">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="text-gray-600 font-medium">Verifying your authentication token...</p>
          </div>
        ) : token && isValid ? (
          <Uploader token={token} />
        ) : (
          <ErrorDisplay isValid={isValid} bookUrl={bookUrl} bookstackUrl={bookstackUrl} />
        )}
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-200 mt-auto">
        <p>
          Uses <a href="https://bookstack.bassopaolo.com/api/docs" target="_blank" rel="noopener noreferrer" className="hover:underline">BookStack API</a>
          {' & '}
          <a href="https://datalab.to" target="_blank" rel="noopener noreferrer" className="hover:underline">datalab.to</a>
          {' for PDF Data Extraction'}
          {' | '}
          <a href="https://github.com/pasewalck/pdf2bookstack" className="hover:underline">Source Code</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
