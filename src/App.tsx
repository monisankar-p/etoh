import { ThemeProvider } from './providers/ThemeProvider';
import { Toaster } from 'sonner';
import { AppRouter } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalAICopilot } from './components/GlobalAICopilot';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppRouter />
        <GlobalAICopilot />
        <Toaster position="bottom-right" theme="system" richColors />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
