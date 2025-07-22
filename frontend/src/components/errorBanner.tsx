type ErrorBannerProps = {
  error: string;
  setError: (error: string | null) => void;
};

const ErrorBanner = ({ error, setError }: ErrorBannerProps) => {
  return (
    <div className="p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => setError(null)}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorBanner;
