'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import CredentialLedger from '@/lib/CredentialLedger.json';
import { CONTRACT_ADDRESS } from '../admin/page';
import { keccak256, toBytes } from 'viem';

export default function IssuerDashboard() {
  const [formData, setFormData] = useState({
    fullName: '',
    matriculationNumber: '',
    degreeProgram: '',
    classOfDegree: '',
    yearOfGraduation: ''
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const { data: hash, error: txError, isPending: isTxPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleIssue = async () => {
    setUploadError('');
    setIsUploading(true);
    
    try {
      // 1. Upload to IPFS via our API route
      const res = await fetch('/api/pinata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to upload to IPFS');
      }

      const ipfsCID = data.cid;

      // 2. Generate Credential ID (hash of the matriculation number or combination)
      const credentialId = keccak256(toBytes(formData.matriculationNumber + formData.degreeProgram));

      // 3. Write to smart contract
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CredentialLedger.abi,
        functionName: 'issueCredential',
        args: [credentialId, ipfsCID],
      });

    } catch (err: any) {
      setUploadError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const isFormValid = Object.values(formData).every(val => val.trim() !== '');
  const isPending = isUploading || isTxPending || isConfirming;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>University Issuer Portal</CardTitle>
          <CardDescription>Issue a new academic credential to the blockchain</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="matriculationNumber">Matriculation No.</Label>
              <Input id="matriculationNumber" placeholder="U18/CS/1000" value={formData.matriculationNumber} onChange={handleInputChange} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="degreeProgram">Degree Program</Label>
            <Input id="degreeProgram" placeholder="B.Sc. Computer Science" value={formData.degreeProgram} onChange={handleInputChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="classOfDegree">Class of Degree</Label>
              <Input id="classOfDegree" placeholder="First Class Honours" value={formData.classOfDegree} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearOfGraduation">Year of Graduation</Label>
              <Input id="yearOfGraduation" placeholder="2024" value={formData.yearOfGraduation} onChange={handleInputChange} />
            </div>
          </div>

          {(uploadError || txError) && (
            <div className="text-red-500 text-sm mt-2 break-all">
              Error: {uploadError || (txError as any)?.shortMessage || txError?.message}
            </div>
          )}
          {isConfirmed && (
            <div className="text-green-500 text-sm mt-2 break-all">
              Credential Successfully Issued! Hash: {hash}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleIssue} 
            disabled={!isFormValid || isPending}
          >
            {isPending ? 'Processing...' : 'Issue Credential'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
