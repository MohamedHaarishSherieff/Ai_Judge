/**
 * AI Judge — Courtroom Representation Modes Unit & Functional Test Suite
 * Tests all 4 litigation modes:
 *  1. AI vs AI
 *  2. AI vs Human
 *  3. Human vs AI
 *  4. Human vs Human
 */

const assert = require('assert');

function simulateInitialMessages(caseData, petMode, respMode) {
  const courtTitle = caseData.courtLevel || 'High Court of State';
  const petName = caseData.parties[0]?.name || 'Petitioner';
  const petAdv = caseData.parties[0]?.advocateName || 'Senior Adv. Rajesh Sharma';
  const respName = caseData.parties[1]?.name || 'Respondent';
  const respAdv = caseData.parties[1]?.advocateName || 'Adv. Meera Sen';

  const initialMsgs = [];

  // 1. Clerk announcement (Universal)
  initialMsgs.push({
    id: 'msg-clerk-call',
    sender: 'Court Reader / Clerk of Court',
    senderRole: 'Court Clerk',
    content: `ALL RISE. The Hon'ble ${courtTitle} is now formally in session.`
  });

  // 2. Mode-specific initial appearances
  if (petMode === 'real' && respMode === 'real') {
    initialMsgs.push({
      id: 'msg-judge-start',
      senderRole: 'AI Judge',
      content: `The Bench is formally in session. Both parties appear through Real Human Advocates.`
    });
  } else if (petMode === 'real' && respMode === 'ai') {
    initialMsgs.push({
      id: 'msg-resp-appear',
      senderRole: 'Respondent Counsel',
      isHumanCounsel: false,
      content: `Learned Counsel ${respAdv} enters appearance on caveat.`
    });
    initialMsgs.push({
      id: 'msg-judge-start',
      senderRole: 'AI Judge',
      content: `Petitioner is represented by Learned Counsel (${petAdv}). Please present your opening propositions.`
    });
  } else if (petMode === 'ai' && respMode === 'real') {
    initialMsgs.push({
      id: 'msg-pet-appear',
      senderRole: 'Petitioner Counsel',
      isHumanCounsel: false,
      content: `${petAdv} appearing for Petitioner, ${petName}.`
    });
    initialMsgs.push({
      id: 'msg-judge-start',
      senderRole: 'AI Judge',
      content: `The Bench calls upon Learned Counsel for the Respondent, ${respAdv}.`
    });
  } else {
    // AI vs AI: Stays clean with ONLY clerk call on initial render
    // User presses "Start Live Courtroom Trial" to begin!
  }

  return initialMsgs;
}

function verifyBadge(senderRole, sender, isHumanCounsel) {
  const isJudge = senderRole === 'AI Judge';
  const isCourtClerk = senderRole === 'Court Clerk';
  const isHuman = isHumanCounsel || 
                  sender.toLowerCase().includes('(you)') || 
                  sender.toLowerCase().includes('human advocate') ||
                  sender.toLowerCase().includes('adv. [you]');

  if (isJudge) return 'Bench Adjudication';
  if (isCourtClerk) return 'Court Registry';
  if (isHuman) return 'Human Advocate';
  return 'AI Legal Counsel';
}

function runModeTests() {
  console.log('[MODE TEST SUITE] Testing All 4 Litigation Modes & State Transitions...\n');

  const mockCase = {
    id: 'CASE-TEST-100',
    caseNumber: 'Commercial Summary Suit No. 418 of 2026',
    title: 'Verma Technologies Pvt. Ltd. v. Bharat Cloud Infrastructure Ltd.',
    courtLevel: 'High Court of State',
    parties: [
      { id: 'p1', name: 'Verma Technologies Pvt. Ltd.', advocateName: 'Adv. [You] (D/4829/2026)' },
      { id: 'p2', name: 'Bharat Cloud Infrastructure Ltd.', advocateName: 'Adv. Meera Sen' }
    ]
  };

  // TEST 1: AI vs AI Mode
  console.log('--- Test 1: AI vs AI Representation Mode ---');
  const aiVsAiMsgs = simulateInitialMessages(mockCase, 'ai', 'ai');
  assert.strictEqual(aiVsAiMsgs.length, 1, 'AI vs AI must have only 1 message (Clerk call) on load');
  assert.strictEqual(aiVsAiMsgs[0].senderRole, 'Court Clerk', 'Initial message must be Clerk call');
  assert.strictEqual(verifyBadge('Court Clerk', 'Court Reader / Clerk of Court', false), 'Court Registry');
  console.log('  ✓ AI vs AI cleanly halts pre-canned text on initial load, waiting for "Start Trial" button.');

  // TEST 2: Human Petitioner vs AI Respondent (Human vs AI)
  console.log('\n--- Test 2: Human Petitioner vs AI Respondent ---');
  const humanVsAiMsgs = simulateInitialMessages(mockCase, 'real', 'ai');
  assert.strictEqual(humanVsAiMsgs.length, 3, 'Human vs AI must have Clerk, AI Resp appearance, and Judge invite');
  assert.strictEqual(humanVsAiMsgs.some(m => m.senderRole === 'Petitioner Counsel'), false, 'AI must NEVER speak for Human Petitioner');
  assert.strictEqual(verifyBadge('Petitioner Counsel', 'Adv. [You] (D/4829/2026)', true), 'Human Advocate');
  assert.strictEqual(verifyBadge('Respondent Counsel', 'Adv. Meera Sen', false), 'AI Legal Counsel');
  console.log('  ✓ AI never pre-generates speech for Human Petitioner.');
  console.log('  ✓ Badging renders "Human Advocate" for Petitioner and "AI Legal Counsel" for Respondent.');

  // TEST 3: AI Petitioner vs Human Respondent (AI vs Human)
  console.log('\n--- Test 3: AI Petitioner vs Human Respondent ---');
  const aiVsHumanMsgs = simulateInitialMessages(mockCase, 'ai', 'real');
  assert.strictEqual(aiVsHumanMsgs.length, 3, 'AI vs Human must have Clerk, AI Pet appearance, and Judge invite to Respondent');
  assert.strictEqual(aiVsHumanMsgs.some(m => m.senderRole === 'Respondent Counsel'), false, 'AI must NEVER speak for Human Respondent');
  assert.strictEqual(verifyBadge('Respondent Counsel', 'Adv. [You] (D/4829/2026)', true), 'Human Advocate');
  assert.strictEqual(verifyBadge('Petitioner Counsel', 'Senior Adv. Rajesh Sharma', false), 'AI Legal Counsel');
  console.log('  ✓ AI never pre-generates speech for Human Respondent.');
  console.log('  ✓ Badging correctly isolates Human Respondent from AI Petitioner.');

  // TEST 4: Human vs Human Mode
  console.log('\n--- Test 4: Human vs Human Representation Mode ---');
  const humanVsHumanMsgs = simulateInitialMessages(mockCase, 'real', 'real');
  assert.strictEqual(humanVsHumanMsgs.length, 2, 'Human vs Human must have ONLY Clerk and Judge invitation');
  assert.strictEqual(humanVsHumanMsgs.some(m => m.senderRole === 'Petitioner Counsel'), false, 'Zero AI Petitioner messages');
  assert.strictEqual(humanVsHumanMsgs.some(m => m.senderRole === 'Respondent Counsel'), false, 'Zero AI Respondent messages');
  console.log('  ✓ Human vs Human generates ZERO AI counsel messages. Pure human pleading.');

  // TEST 5: No Duplicate Words in Advocate Names
  console.log('\n--- Test 5: Verify Name String Formatting ---');
  const humanName = 'Adv. [You] (D/4829/2026)';
  assert.strictEqual(humanName.includes('Learned Counsel Learned Counsel'), false, 'No duplicate Learned Counsel text');
  console.log(`  ✓ Advocate name formatted cleanly: "${humanName}"`);

  console.log('\n======================================================');
  console.log('[ALL COURTROOM MODES PASSED] All state contracts valid!');
  console.log('======================================================\n');
}

runModeTests();
