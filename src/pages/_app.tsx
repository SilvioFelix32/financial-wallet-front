import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyle } from '@/styles/global';
import { theme } from '@/styles/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Head>
          <link rel="icon" href="/sf-tech_favicon.jpeg" />
          <link rel="shortcut icon" href="/sf-tech_favicon.jpeg" />
          <link rel="apple-touch-icon" href="/sf-tech_favicon.jpeg" />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

