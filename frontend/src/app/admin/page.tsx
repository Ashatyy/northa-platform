'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import CredentialLedger from '@/lib/CredentialLedger.json';

// Placeholder. Will be updated after contract deployment.
export const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000';

export default function AdminDashboard() {
  const [address, setAddress] = useState('');
  
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleAddIssuer = () => {
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CredentialLedger.abi,
      functionName: 'addIssuer',
      args: [address],
    });
  };

  const handleRemoveIssuer = () => {
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CredentialLedger.abi,
      functionName: 'removeIssuer',
      args: [address],
    });
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>NUC Admin Dashboard</CardTitle>
          <CardDescription>Manage authorized Universities (Issuers)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">University Ethereum Address</Label>
            <Input 
              id="address" 
              placeholder="0x..." 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm mt-2 break-all">
              Error: {(error as any).shortMessage || error.message}
            </div>
          )}
          {isConfirmed && (
            <div className="text-green-500 text-sm mt-2 break-all">
              Transaction successful! Hash: {hash}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            onClick={handleAddIssuer} 
            disabled={isPending || isConfirming || !address}
          >
            {isPending ? 'Confirming...' : 'Add Issuer'}
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleRemoveIssuer}
            disabled={isPending || isConfirming || !address}
          >
            Remove Issuer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
