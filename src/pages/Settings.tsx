import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Settings as SettingsIcon, Moon, Sun, Monitor, Bell, Shield, User } from 'lucide-react';
import { useThemeStore } from '../stores/useThemeStore';
import { Button } from '../components/ui/button';

export default function Settings() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground">
      <div className="p-8 h-full flex flex-col w-full max-w-4xl mx-auto overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <SettingsIcon className="w-8 h-8 text-primary" />
            Global Settings
          </h1>
          <p className="text-muted-foreground">Manage your account preferences and application appearance.</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Monitor className="w-5 h-5" /> Appearance</CardTitle>
              <CardDescription>Customize the look and feel of etoh OS.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button 
                  variant={theme === 'light' ? 'default' : 'outline'} 
                  onClick={() => setTheme('light')}
                  className="gap-2"
                >
                  <Sun className="w-4 h-4" /> Light
                </Button>
                <Button 
                  variant={theme === 'dark' ? 'default' : 'outline'} 
                  onClick={() => setTheme('dark')}
                  className="gap-2"
                >
                  <Moon className="w-4 h-4" /> Dark
                </Button>
                <Button 
                  variant={theme === 'system' ? 'default' : 'outline'} 
                  onClick={() => setTheme('system')}
                  className="gap-2"
                >
                  <Monitor className="w-4 h-4" /> System
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="w-5 h-5" /> Account Profile</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Profile editing is disabled in the prototype.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5" /> Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Notification preferences are disabled in the prototype.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5" /> Security & Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Security settings are managed by your hospital IT administrator.</p>
            </CardContent>
          </Card>
          
          <div className="pt-4">
            <Button variant="outline" onClick={() => window.history.back()}>Return to Dashboard</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
