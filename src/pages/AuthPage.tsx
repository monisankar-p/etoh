import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartPulse, Stethoscope, User, ShieldAlert, Activity, ClipboardType } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';
import { useEffect } from 'react';

const roles = [
  { id: 'patient', label: 'Patient Copilot', icon: User, desc: 'AI Health Copilot & Records', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  { id: 'doctor', label: 'Doctor Suite', icon: Stethoscope, desc: 'Consultations & AI SOAP', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  { id: 'nurse', label: 'Nurse Suite', icon: Activity, desc: 'Shift & Vitals Management', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  { id: 'admin', label: 'Admin Suite', icon: ShieldAlert, desc: 'Hospital Operations', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  { id: 'executive', label: 'Field Executive', icon: ClipboardType, desc: 'Assisted Registration', color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' },
] as const;

export default function AuthPage() {
  const { login, isAuthenticated, role } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && role) {
      navigate(`/${role}`, { replace: true });
    }
  }, [isAuthenticated, role, navigate]);

  const handleLogin = (selectedRole: 'patient' | 'doctor' | 'nurse' | 'admin' | 'executive') => {
    login(selectedRole);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 flex flex-col items-center max-w-3xl w-full px-4"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center ring-1 ring-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
            <HeartPulse className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">etoh <span className="text-primary font-light">OS</span></h1>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-2 text-foreground/90">Select your access level</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Welcome to the next-generation AI Healthcare Operating System. Choose a role to experience the tailored environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {roles.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.button
                key={r.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLogin(r.id)}
                className={`flex items-start gap-4 p-6 rounded-2xl border bg-card hover:bg-accent/50 transition-all text-left shadow-sm group`}
              >
                <div className={`p-3 rounded-lg border ${r.color} transition-colors`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{r.label}</h3>
                  <p className="text-sm text-muted-foreground">{r.desc}</p>
                </div>
              </motion.button>
            )
          })}
        </div>

        <p className="mt-12 text-xs text-muted-foreground">
          PROTOTYPE DEMONSTRATION MODE
        </p>
      </motion.div>
    </div>
  );
}
