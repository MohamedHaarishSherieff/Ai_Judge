const http = require('http');
const { spawn } = require('child_process');

const PORT = 3009;
const BASE_URL = `http://localhost:${PORT}`;

const ROUTES_TO_TEST = [
  '/',
  '/cases',
  '/cases/new',
  '/cases/SC-WP-2026-104',
  '/cases/SC-WP-2026-104/judgment',
  '/text-courtroom',
  '/text-courtroom/SC-WP-2026-104',
  '/text-courtroom/HC-COMM-2026-882',
  '/text-courtroom/DS-CRIM-2026-402',
  '/evidence',
  '/documents',
  '/dashboard',
  '/appeals',
  '/how-it-works',
  '/about',
  '/video-courtroom',
  '/login',
  '/signup',
  '/forgot-password',
  '/settings'
];

function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function waitForServer(maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetchUrl(`${BASE_URL}/`);
      if (res.status === 200) return true;
    } catch (e) {
      // wait 500ms
    }
    await new Promise(r => setTimeout(r, 500));
  }
  return false;
}

async function runTests() {
  console.log(`[TEST SUITE] Starting Next.js production server on port ${PORT}...`);
  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    shell: true,
    stdio: 'pipe'
  });

  server.stdout.on('data', d => {
    const s = d.toString();
    if (s.includes('Ready') || s.includes('started')) console.log('[SERVER]', s.trim());
  });

  server.stderr.on('data', d => {
    // console.error('[SERVER ERR]', d.toString());
  });

  try {
    const ready = await waitForServer();
    if (!ready) {
      throw new Error('Server failed to start within timeout');
    }
    console.log('[TEST SUITE] Server is healthy and accepting requests on port ' + PORT);

    let passCount = 0;
    let failCount = 0;

    // 1. Test all 20 UI Routes
    console.log('\n--- 1. Testing All 20 UI Application Routes ---');
    for (const route of ROUTES_TO_TEST) {
      try {
        const start = Date.now();
        const res = await fetchUrl(`${BASE_URL}${route}`);
        const elapsed = Date.now() - start;
        if (res.status === 200) {
          console.log(`  ✓ [200 OK] ${route} (${elapsed}ms)`);
          passCount++;
        } else {
          console.error(`  ✗ [${res.status}] ${route}`);
          failCount++;
        }
      } catch (err) {
        console.error(`  ✗ [FAIL] ${route}:`, err.message);
        failCount++;
      }
    }

    // 2. Test Nyaya Sarathi AI Legal Guide API
    console.log('\n--- 2. Testing Nyaya Sarathi Guide Chatbot API ---');
    try {
      const guidePayload = JSON.stringify({
        messages: [{ role: 'user', content: 'Which court forum has jurisdiction over fundamental rights under Article 32?' }]
      });
      const guideRes = await fetchUrl(`${BASE_URL}/api/courtroom/guide-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(guidePayload)
        },
        body: guidePayload
      });
      if (guideRes.status === 200) {
        const json = JSON.parse(guideRes.body);
        if (json.reply) {
          console.log(`  ✓ [200 OK] /api/courtroom/guide-chat -> Received response: "${json.reply.substring(0, 80)}..."`);
          passCount++;
        } else {
          console.error('  ✗ /api/courtroom/guide-chat: missing reply in body', json);
          failCount++;
        }
      } else {
        console.error(`  ✗ /api/courtroom/guide-chat returned status ${guideRes.status}`);
        failCount++;
      }
    } catch (e) {
      console.error('  ✗ /api/courtroom/guide-chat failed:', e.message);
      failCount++;
    }

    // 3. Test Modal Stream / Legal Synthesis API
    console.log('\n--- 3. Testing Courtroom Legal Engine Synthesis API ---');
    try {
      const decreePayload = JSON.stringify({
        action: 'synthesize_decree',
        caseId: 'CASE-TEST-001',
        caseTitle: 'Test Commercial Suit',
        principalClaim: 148200000,
        transcriptHistory: []
      });
      const decreeRes = await fetchUrl(`${BASE_URL}/api/courtroom/modal-stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(decreePayload)
        },
        body: decreePayload
      });
      if (decreeRes.status === 200) {
        const json = JSON.parse(decreeRes.body);
        if (json.success && json.data) {
          console.log(`  ✓ [200 OK] /api/courtroom/modal-stream -> Decree Number: ${json.data.decree_number || 'DECREE-SYNTH-001'}`);
          passCount++;
        } else {
          console.error('  ✗ /api/courtroom/modal-stream: missing success/data', json);
          failCount++;
        }
      } else {
        console.error(`  ✗ /api/courtroom/modal-stream returned status ${decreeRes.status}`);
        failCount++;
      }
    } catch (e) {
      console.error('  ✗ /api/courtroom/modal-stream failed:', e.message);
      failCount++;
    }

    console.log('\n======================================================');
    console.log(`[TEST SUMMARY] Total Passed: ${passCount} | Failed: ${failCount}`);
    console.log('======================================================\n');

    if (failCount > 0) {
      process.exitCode = 1;
    }
  } finally {
    console.log('[TEST SUITE] Shutting down test server...');
    server.kill();
  }
}

runTests().catch(err => {
  console.error('Test Suite Fatal Error:', err);
  process.exit(1);
});
