import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const pinataJwt = process.env.PINATA_JWT;
    
    if (!pinataJwt) {
      // Mock mode if no API key is provided
      console.log("No PINATA_JWT found, running in mock mode. Data:", data);
      const mockCid = "ipfs://QmMock" + Date.now();
      return NextResponse.json({ success: true, cid: mockCid });
    }

    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${pinataJwt}`,
      },
      body: JSON.stringify({
        pinataContent: data,
        pinataMetadata: {
          name: `Credential_${data.matriculationNumber}.json`
        }
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.details || "Failed to pin to IPFS");
    }

    const resData = await res.json();
    return NextResponse.json({ success: true, cid: `ipfs://${resData.IpfsHash}` });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
