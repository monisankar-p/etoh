import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, Users, Settings, LogOut, LayoutDashboard, BedDouble, TrendingUp, CheckCircle, Menu, CalendarDays, FileSearch } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';
import { Button } from '../components/ui/button';
import { useState } from 'react';

const navItems = [
  { icon: LayoutDashboard, label: 'Command Center', path: '/admin', end: true },
  { icon: BedDouble, label: 'Bed Management', path: '/admin/beds' },
  { icon: Users, label: 'Staffing Roster', path: '/admin/staff' },
  { icon: CalendarDays, label: 'Discharge Forecast', path: '/admin/forecasting' },
  { icon: TrendingUp, label: 'Financial Analytics', path: '/admin/analytics' },
  { icon: CheckCircle, label: 'Quality & Monitoring', path: '/admin/quality' },
  { icon: FileSearch, label: 'Gap Analysis', path: '/admin/gap' },
];

export default function AdminLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className={`w-72 border-r bg-card/95 md:bg-card/50 backdrop-blur-xl flex flex-col z-30 fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 pb-2">
          <div className="flex items-center gap-3 text-purple-500 mb-8">
            <ShieldAlert className="w-8 h-8" />
            <h1 className="text-2xl font-bold tracking-tight">etoh <span className="font-light">Admin</span></h1>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center font-bold text-purple-500">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">Hospital Director</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20 font-medium' 
                      : 'hover:bg-accent hover:text-accent-foreground text-muted-foreground font-medium'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="p-4 border-t space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => navigate('/admin/settings')}>
            <Settings className="w-5 h-5" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col relative overflow-hidden bg-background">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b bg-card/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2 text-purple-500">
            <ShieldAlert className="w-6 h-6" />
            <h1 className="text-xl font-bold tracking-tight">etoh <span className="font-light">Admin</span></h1>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </Button>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
