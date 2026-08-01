'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider } from 'wagmi';
import { sepolia, foundry } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { useState, useEffect } from 'react';

const config = getDefaultConfig({
  appName: 'Decentralized Academic Ledger',
  projectId: 'YOUR_PROJECT_ID', // Replace with a real project ID if going to production
  chains: [foundry, sepolia],
  ssr: true, 
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
