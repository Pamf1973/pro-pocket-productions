import { Navigate } from 'react-router-dom';
import { isSignedIn } from '../utils/auth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isSignedIn()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
