import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, FileText, HeartPulse, Pill, Activity, Settings, LogOut, Clock, FileImage, Dna, Stethoscope, CreditCard, Menu, Calendar, Thermometer, Globe } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';
import { Button } from '../components/ui/button';
import { useState } from 'react';
import { useTranslation, type LanguageCode } from '../i18n';

export default function PatientLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage, languages } = useTranslation();

  const navItems = [
    { icon: Sparkles, label: t('nav.healthCopilot'), path: '/patient', end: true },
    { icon: FileText, label: t('nav.reports'), path: '/patient/reports' },
    { icon: FileImage, label: t('nav.tests'), path: '/patient/tests' },
    { icon: Pill, label: t('nav.prescriptions'), path: '/patient/prescriptions' },
    { icon: Activity, label: t('nav.vitals'), path: '/patient/vitals' },
    { icon: Clock, label: t('nav.timeline'), path: '/patient/timeline' },
    { icon: Dna, label: t('nav.genetics'), path: '/patient/genetics' },
    { icon: Stethoscope, label: t('nav.triage'), path: '/patient/triage' },
    { icon: CreditCard, label: t('nav.billing'), path: '/patient/billing' },
    { icon: Calendar, label: t('nav.appointments'), path: '/patient/appointments' },
    { icon: Thermometer, label: t('nav.symptoms'), path: '/patient/symptoms' },
  ];

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

      {/* Dynamic Sidebar */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className={`w-72 border-r bg-card/95 md:bg-card/50 backdrop-blur-xl flex flex-col z-30 fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 pb-2">
          <div className="flex items-center gap-3 text-primary mb-8">
            <HeartPulse className="w-8 h-8" />
            <h1 className="text-2xl font-bold tracking-tight">etoh <span className="font-light">Patient</span></h1>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{t('common.premiumCare')}</p>
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
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 font-medium' 
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
          {/* Language Selector */}
          <div className="relative flex items-center gap-3 px-4 py-2 w-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-accent cursor-pointer group">
            <Globe className="w-5 h-5 flex-shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeLabel} ({lang.label})
                </option>
              ))}
            </select>
            <span className="flex-1 text-left">{languages.find(l => l.code === language)?.nativeLabel || 'Language'}</span>
          </div>

          <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => navigate('/patient/settings')}>
            <Settings className="w-5 h-5 flex-shrink-0" />
            {t('common.settings')}
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {t('common.signOut')}
          </Button>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col relative overflow-hidden bg-background">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b bg-card/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2 text-primary">
            <HeartPulse className="w-6 h-6" />
            <h1 className="text-xl font-bold tracking-tight">etoh <span className="font-light">Patient</span></h1>
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
