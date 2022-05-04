import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { GeistProvider, CssBaseline } from '@geist-ui/react';
import { PrefersContext, themes, ThemeType } from '@/lib/use-prefers';
import Menu from '@/components/navigation/menu';
import Footer from '@/components/footer';
import { useRouter } from 'next/router';

const DashboardApp = ({ Component, pageProps }: AppProps) => {
  const [themeType, setThemeType] = useState<ThemeType>('dark');
  const { query } = useRouter();

  // setup parameters in window storage
  if (typeof window !== 'undefined' && window.localStorage) {
    if (query.authToken && query.authToken !== 'undefined' && typeof query.authToken === 'string') {
      window.localStorage.setItem('authToken', query.authToken);
    }
    if (query.username && query.username !== 'undefined' && typeof query.username === 'string') {
      window.localStorage.setItem('username', query.username);
    }
    if (query.first_name && query.first_name !== 'undefined' && typeof query.first_name === 'string') {
      window.localStorage.setItem('first_name', query.first_name);
    }
    if (query.last_name && query.last_name !== 'undefined' && typeof query.last_name === 'string') {
      window.localStorage.setItem('last_name', query.last_name);
    }
    if (query.email && query.email !== 'undefined' && typeof query.email === 'string') {
      window.localStorage.setItem('email', query.email);
    }
    if (query.picture && query.picture !== 'undefined' && typeof query.picture === 'string') {
      window.localStorage.setItem('picture', query.picture);
    }
  }

  // make queries to about the state of the organizations and stuff

  useEffect(() => {
    document.documentElement.removeAttribute('style');
    document.body.removeAttribute('style');

    const theme = window.localStorage.getItem('theme') as ThemeType;
    if (themes.includes(theme)) setThemeType(theme);
  }, []);

  const switchTheme = useCallback((theme: ThemeType) => {
    setThemeType(theme);
    if (typeof window !== 'undefined' && window.localStorage) window.localStorage.setItem('theme', theme);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Hulse Beta Dashboard</title>
        <meta name="og:title" content="Hulse Beta Dashboard" />
        <meta name="og:description" content="Manage your Hulse clusters." />
        <meta name="description" content="Manage your Hulse clusters." />
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <GeistProvider themeType={themeType}>
        <CssBaseline />
        <PrefersContext.Provider value={{ themeType, switchTheme }}>
          <Menu />
          <Component {...pageProps} />
          <Footer />
        </PrefersContext.Provider>
      </GeistProvider>
    </>
  );
};

export default DashboardApp;
