import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './lib/store';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import CarList from './pages/CarList';
import CarCreate from './pages/CarCreate';
import CarDetail from './pages/CarDetail';
import CarEdit from './pages/CarEdit';

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);
  return token ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <CarList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cars/new"
                element={
                  <PrivateRoute>
                    <CarCreate />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cars/:id"
                element={
                  <PrivateRoute>
                    <CarDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cars/:id/edit"
                element={
                  <PrivateRoute>
                    <CarEdit />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
        <Toaster position="top-right" />
      </Router>
    </QueryClientProvider>
  );
}

export default App;