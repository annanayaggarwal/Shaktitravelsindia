import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
const MainLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </main>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Lazy load components for better performance
const HomePage = React.lazy(() => import('./Pages/HomePage'));
const AdminDashboard = React.lazy(() => import('./components/admin/AdminDashboard'));
const AboutUs  = React.lazy(() => import('./components/AboutUs'));
const BookNow = React.lazy(() => import('./components/BookNow'));
const PackageDetailPage = React.lazy(() => import('./Pages/PackageDetail'));

// Loading component for suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <MainLayout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/package/:id" element={<PackageDetailPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/book-now" element={<BookNow />} />
              <Route path="/about" element={<AboutUs />} />
              {/* Catch all route for 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </ErrorBoundary>
      
      {/* Global Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;