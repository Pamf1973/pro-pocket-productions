import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Landing
import LandingPage from './pages/LandingPage';

// Auth
import LoginScreen from './pages/LoginScreen';

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

        {/* Desktop */}
        <Route path="/dashboard" element={<DesktopDashboard />} />

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

        {/* Desktop pages */}
        <Route path="/assets" element={<DesktopAssets />} />
        <Route path="/budgets" element={<DesktopBudgets />} />
        <Route path="/calendar-desktop" element={<DesktopCalendar />} />
        <Route path="/locations-desktop" element={<DesktopLocations />} />
        <Route path="/new-project-desktop" element={<DesktopNewProject />} />
        <Route path="/projects-desktop" element={<DesktopProjects />} />
        <Route path="/storyboard-desktop" element={<DesktopStoryboard />} />
        <Route path="/team-desktop" element={<DesktopTeam />} />
        <Route path="/settings-desktop" element={<DesktopSettings />} />
      </Routes>
    </BrowserRouter>
  );
}
