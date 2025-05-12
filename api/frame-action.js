// frame-action.js
import { NeynarAPIClient } from '@neynar/nodejs-sdk';
import { NextResponse } from 'next/server';

const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);

export async function POST(req) {
  try {
    // Validera Frame-förfrågan
    const body = await req.json();
    const { trustedData } = body;
    
    // Verifiera signatur med Neynar
    const validation = await client.validateFrameAction(trustedData.messageBytes);
    
    if (!validation.valid) {
      return NextResponse.json(
        { error: "Ogiltig Frame-signatur" },
        { status: 403 }
      );
    }

    // Hämta användardata från valideringen
    const { fid } = validation.action.interactor;
    
    // Generera dynamiskt svar
    return NextResponse.json({
      status: "success",
      frame: {
        version: "vNext",
        image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?fid=${fid}`,
        post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
        buttons: [
          {
            label: "Visa min XP",
            action: "post"
          },
          {
            label: "Dela statistik",
            action: "post_redirect"
          }
        ],
        input: {
          text: "Ange wallet-adress"
        }
      }
    });

  } catch (error) {
    console.error("Frame Action Error:", error);
    return NextResponse.json(
      { error: "Internt serverfel" },
      { status: 500 }
    );
  }
}
