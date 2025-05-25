import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const HomePage = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="flex justify-center mb-6">
            {/* Using the image */}
            <img src="/turtle-icon.svg" alt="Admin Logo" className="w-32 h-32 rounded-full" />
          </div>
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Welcome to the Admin Dashboard
          </h1>
          <p className="text-gray-600 text-center">
            You have successfully accessed the administrative area. From here, you can manage your site's content, users, and settings.
          </p>
          {/* Removed the button */}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default HomePage;