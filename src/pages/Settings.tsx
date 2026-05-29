import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Settings as SettingsIcon, Moon, Sun, Monitor, Bell, Shield, User, Globe } from 'lucide-react';
import { useThemeStore } from '../stores/useThemeStore';
import { Button } from '../components/ui/button';
import { useTranslation } from '../i18n';

export default function Settings() {
  const { theme, setTheme } = useThemeStore();
  const { t, language, setLanguage, languages } = useTranslation();

  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground">
      <div className="p-8 h-full flex flex-col w-full max-w-4xl mx-auto overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <SettingsIcon className="w-8 h-8 text-primary" />
            {t('settings.title')}
          </h1>
          <p className="text-muted-foreground">{t('settings.subtitle')}</p>
        </div>

        <div className="space-y-6">
          {/* Language Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5" /> {t('settings.languageAccess')}</CardTitle>
              <CardDescription>{t('settings.languageDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={language === lang.code ? 'default' : 'outline'}
                    onClick={() => setLanguage(lang.code)}
                    className="flex flex-col h-auto py-3 items-center gap-1"
                  >
                    <span className="text-lg font-medium">{lang.nativeLabel}</span>
                    <span className="text-xs opacity-70">{lang.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Monitor className="w-5 h-5" /> {t('settings.appearance')}</CardTitle>
              <CardDescription>{t('settings.appearanceDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button 
                  variant={theme === 'light' ? 'default' : 'outline'} 
                  onClick={() => setTheme('light')}
                  className="gap-2"
                >
                  <Sun className="w-4 h-4" /> {t('settings.light')}
                </Button>
                <Button 
                  variant={theme === 'dark' ? 'default' : 'outline'} 
                  onClick={() => setTheme('dark')}
                  className="gap-2"
                >
                  <Moon className="w-4 h-4" /> {t('settings.dark')}
                </Button>
                <Button 
                  variant={theme === 'system' ? 'default' : 'outline'} 
                  onClick={() => setTheme('system')}
                  className="gap-2"
                >
                  <Monitor className="w-4 h-4" /> {t('settings.system')}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="w-5 h-5" /> {t('settings.profile')}</CardTitle>
              <CardDescription>{t('settings.profileDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t('settings.profileDisabled')}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5" /> {t('settings.notifications')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t('settings.notifDisabled')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5" /> {t('settings.security')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t('settings.securityManaged')}</p>
            </CardContent>
          </Card>
          
          <div className="pt-4">
            <Button variant="outline" onClick={() => window.history.back()}>{t('common.returnDashboard')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
