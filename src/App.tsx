import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Landing
import LandingPage from './pages/LandingPage';

// Auth
import LoginScreen from './pages/LoginScreen';
import ProtectedRoute from './components/ProtectedRoute';

// Mobile pages
import HomeScreen from './pages/mobile/HomeScreen';
import BudgetScreen from './pages/mobile/BudgetScreen';
import ScheduleScreen from './pages/mobile/ScheduleScreen';
import NexusOpsScreen from './pages/mobile/NexusOpsScreen';
import ScoutNoir from './pages/mobile/ScoutNoir';
import NewProjectScreen from './pages/mobile/NewProjectScreen';
import StudioOpsScreen from './pages/mobile/StudioOpsScreen';
import StoryboardStudioScreen from './pages/mobile/StoryboardStudioScreen';
import CrewOpsScreen from './pages/mobile/CrewOpsScreen';
import PWAInstallScreen from './pages/mobile/PWAInstallScreen';

// Desktop pages
import DesktopDashboard from './pages/desktop/DesktopDashboard';
import DesktopAssets from './pages/desktop/DesktopAssets';
import DesktopBudgets from './pages/desktop/DesktopBudgets';
import DesktopCalendar from './pages/desktop/DesktopCalendar';
import DesktopLocations from './pages/desktop/DesktopLocations';
import DesktopNewProject from './pages/desktop/DesktopNewProject';
import DesktopProjects from './pages/desktop/DesktopProjects';
import DesktopStoryboard from './pages/desktop/DesktopStoryboard';
import DesktopTeam from './pages/desktop/DesktopTeam';
import DesktopSettings from './pages/desktop/DesktopSettings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<LoginScreen />} />

        {/* Desktop (auth-gated) */}
        <Route path="/dashboard" element={<ProtectedRoute><DesktopDashboard /></ProtectedRoute>} />

        {/* Landing / PWA install */}
        <Route path="/" element={<LandingPage />} />

        {/* Mobile pages */}
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/budget" element={<BudgetScreen />} />
        <Route path="/schedule" element={<ScheduleScreen />} />
        <Route path="/nexus" element={<NexusOpsScreen />} />
        <Route path="/scout" element={<ScoutNoir />} />
        <Route path="/new-project" element={<NewProjectScreen />} />
        <Route path="/projects" element={<StudioOpsScreen />} />
        <Route path="/storyboard" element={<StoryboardStudioScreen />} />
        <Route path="/crew" element={<CrewOpsScreen />} />
        <Route path="/install" element={<PWAInstallScreen />} />

        {/* Desktop pages (auth-gated) */}
        <Route path="/assets" element={<ProtectedRoute><DesktopAssets /></ProtectedRoute>} />
        <Route path="/budgets" element={<ProtectedRoute><DesktopBudgets /></ProtectedRoute>} />
        <Route path="/calendar-desktop" element={<ProtectedRoute><DesktopCalendar /></ProtectedRoute>} />
        <Route path="/locations-desktop" element={<ProtectedRoute><DesktopLocations /></ProtectedRoute>} />
        <Route path="/new-project-desktop" element={<ProtectedRoute><DesktopNewProject /></ProtectedRoute>} />
        <Route path="/projects-desktop" element={<ProtectedRoute><DesktopProjects /></ProtectedRoute>} />
        <Route path="/storyboard-desktop" element={<ProtectedRoute><DesktopStoryboard /></ProtectedRoute>} />
        <Route path="/team-desktop" element={<ProtectedRoute><DesktopTeam /></ProtectedRoute>} />
        <Route path="/settings-desktop" element={<ProtectedRoute><DesktopSettings /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
