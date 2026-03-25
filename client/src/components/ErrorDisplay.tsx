interface ErrorDisplayProps {
  isValid: boolean | null;
  bookUrl: string | null;
  bookstackUrl: string;
}

export function ErrorDisplay({ isValid, bookUrl, bookstackUrl }: ErrorDisplayProps) {
  const isInvalidToken = isValid === false;

  return (
    <div className="w-full max-w-2xl bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">
        {isInvalidToken ? 'Invalid Authentication Token' : 'Missing Authentication Token'}
      </h3>
      <p className="text-yellow-700 mb-6">
        {isInvalidToken
          ? 'The authentication token provided is invalid or has expired. Please refresh the page from BookStack.'
          : 'Please launch this tool directly from BookStack using the "Import PDF" button on a book page. The tool requires a valid security token to authenticate with your BookStack instance.'}
      </p>
      <a
        href={bookUrl ? bookUrl : bookstackUrl}
        className="inline-block px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors"
      >
        {bookUrl != null ? "Back to Book" : "Back to BookStack"}
      </a>
    </div>
  );
}
