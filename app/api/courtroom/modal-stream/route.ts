import { NextRequest, NextResponse } from 'next/server';
import {
  simulateTrialTurnOnModal,
  synthesizeDecreeOnModal,
  calculateInterestOnModal,
  verifyEvidenceOnModal
} from '@/lib/modal/legalClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, caseId, caseTitle, speakerRole, transcriptHistory, evidenceSummary, principalClaim } = body;

    if (action === 'simulate_turn') {
      const turn = await simulateTrialTurnOnModal(
        caseTitle || 'Commercial Contract Dispute',
        speakerRole || 'petitioner_counsel',
        transcriptHistory || [],
        evidenceSummary || 'Exhibit A - Master Services Agreement'
      );
      return NextResponse.json({ success: true, data: turn });
    }

    if (action === 'synthesize_decree') {
      const decree = await synthesizeDecreeOnModal(
        caseId || 'case-001',
        caseTitle || 'Commercial Contract Dispute',
        principalClaim || 2500000,
        transcriptHistory || []
      );
      return NextResponse.json({ success: true, data: decree });
    }

    if (action === 'calculate_interest') {
      const interest = await calculateInterestOnModal(
        body.principal || 2500000,
        body.rate || 24,
        body.defaultDays || 270,
        body.compounding || 'quarterly'
      );
      return NextResponse.json({ success: true, data: interest });
    }

    if (action === 'verify_evidence') {
      const hex = body.fileBytesHex || Buffer.from('DISPUTED_CONTRACT_LEGAL_AGREEMENT').toString('hex');
      const verification = await verifyEvidenceOnModal(
        hex,
        body.filename || 'contract_amendment.pdf',
        body.submittedBy || 'Petitioner'
      );
      return NextResponse.json({ success: true, data: verification });
    }

    return NextResponse.json({ error: 'Invalid action parameter' }, { status: 400 });
  } catch (error: any) {
    console.error('Modal API route error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
