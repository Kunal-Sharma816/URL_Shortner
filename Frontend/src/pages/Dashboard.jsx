import UrlForm from "../components/UrlForm";
import UserUrl from "../components/UserUrl";

function Dashboard() {
  return (
    <div className="min-h-[calc(100vh-4rem)] px-6 py-8 bg-gradient-to-br from-blue-100 to-purple-200 pt-20 ">
      {/* Container with 2 columns for large screens */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* URL Shortener Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold mb-6 text-blue-700 text-center">
            URL Shortener
          </h1>
          <UrlForm />
        </div>

        {/* User's Shortened URLs */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">
            Your Shortened URLs
          </h2>
          {/* Scrollable list */}
          <div className="max-h-[600px] overflow-y-auto pr-2 custom-scroll">
            <UserUrl />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
