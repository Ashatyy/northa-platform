'use client';

import { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import CredentialLedger from '@/lib/CredentialLedger.json';
import { CONTRACT_ADDRESS } from '../admin/page';

export default function VerifyDashboard() {
  const [credentialId, setCredentialId] = useState('');
  const [queryId, setQueryId] = useState('');
  const [metadata, setMetadata] = useState<any>(null);
  const [isLoadingIpfs, setIsLoadingIpfs] = useState(false);

  const { data: credentialData, error, isLoading: isReading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CredentialLedger.abi,
    functionName: 'getCredential',
    args: queryId ? [queryId as `0x${string}`] : undefined,
    query: {
      enabled: !!queryId,
    }
  });

  const handleVerify = () => {
    setQueryId(credentialId);
    setMetadata(null);
  };

  useEffect(() => {
    if (credentialData && !metadata && !isLoadingIpfs) {
      const ipfsCID = (credentialData as any)[0];
      if (ipfsCID.startsWith('ipfs://QmMock')) {
        setMetadata({ mock: true, message: "Mock IPFS data (No Pinata API Key provided during upload)" });
      } else {
        const hash = ipfsCID.replace('ipfs://', '');
        setIsLoadingIpfs(true);
        fetch(`https://gateway.pinata.cloud/ipfs/${hash}`)
          .then(res => res.json())
          .then(data => {
            setMetadata(data);
            setIsLoadingIpfs(false);
          })
          .catch(err => {
            console.error("Failed to fetch IPFS metadata", err);
            setIsLoadingIpfs(false);
            setMetadata({ error: "Failed to fetch from IPFS" });
          });
      }
    }
  }, [credentialData, metadata, isLoadingIpfs]);

  const isLoading = isReading || isLoadingIpfs;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Verify Academic Credential</CardTitle>
          <CardDescription>Enter a cryptographic credential hash to instantly verify authenticity.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="credentialId">Credential ID (Hash)</Label>
            <Input 
              id="credentialId" 
              placeholder="0x..." 
              value={credentialId}
              onChange={(e) => setCredentialId(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-4 border rounded bg-red-50 text-red-900 border-red-200 dark:bg-red-900/20 dark:text-red-200 dark:border-red-900">
              <p className="font-semibold">Verification Failed</p>
              <p className="text-sm">{(error as any).shortMessage || 'Credential does not exist or is invalid.'}</p>
            </div>
          )}

          {credentialData ? (
            <div className={`p-4 border rounded space-y-2 ${(credentialData as any)[3] ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900'}`}>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${(credentialData as any)[3] ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <h3 className={`font-semibold ${(credentialData as any)[3] ? 'text-green-900 dark:text-green-200' : 'text-yellow-900 dark:text-yellow-200'}`}>
                  {(credentialData as any)[3] ? 'Valid Credential' : 'Revoked Credential'}
                </h3>
              </div>
              
              <div className="text-sm text-foreground space-y-1 mt-2">
                <p><span className="font-medium">Issuer Address:</span> {(credentialData as any)[1]}</p>
                <p><span className="font-medium">Issue Date:</span> {new Date(Number((credentialData as any)[2]) * 1000).toLocaleString()}</p>
                <p><span className="font-medium">IPFS CID:</span> {(credentialData as any)[0]}</p>
              </div>

              {metadata && (
                <div className="mt-4 pt-4 border-t border-border">
                  <h4 className="font-medium mb-2">Off-chain Metadata</h4>
                  <pre className="text-xs bg-black/5 dark:bg-white/5 p-2 rounded overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(metadata, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ) : null}

        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleVerify} 
            disabled={!credentialId || isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
