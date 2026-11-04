const fs = require('fs');
const path = require('path');

function generateValidPDF(outputPath) {
  const lines = [
    'IN THE HIGH COURT OF JUDICATURE (COMMERCIAL BENCH)',
    'COMMERCIAL SUMMARY SUIT NO. 418 OF 2026',
    'ORDER XXXVII RULE 2, CODE OF CIVIL PROCEDURE, 1908',
    '================================================================================',
    'IN THE MATTER OF:',
    'Verma Technologies Pvt. Ltd.                            ... PETITIONER / PLAINTIFF',
    'VERSUS',
    'Bharat Cloud Infrastructure Ltd.                        ... RESPONDENT / DEFENDANT',
    '================================================================================',
    'MEMORANDUM OF CLAIM UNDER SECTION 74 OF THE INDIAN CONTRACT ACT, 1872:',
    '1. The Petitioner is an enterprise cloud consumer seeking enforcement of Master Agreement #VC-2024-918.',
    '2. The Respondent committed anticipatory breach by disconnecting production clusters without notice.',
    '3. Total pecuniary recovery claimed: INR 18,50,000/- plus statutory interest at 18% per annum.',
    '4. Section 74 mitigation principles applied strictly in terms of Kailash Nath Associates v. DDA (2015).',
    '================================================================================',
    'SECTION 63 BHARATIYA SAKSHYA ADHINIYAM (BSA), 2023 CERTIFICATION:',
    'This electronic petition and attached annexures have been cryptographically verified.',
    'Cryptographic SHA-256 Digest: 9e3b4a810f2c7d91e6b54a20f9d8c7a10294b5e28374d6c810a4e3217b89f012',
    'Digital Signing Timestamp: 2026-11-04 12:30:00 IST',
    'ADVOCATE FOR PETITIONER: Adv. Rohit Malhotra (Bar Council Reg: D/3104/2016)'
  ];

  let stream = '';
  lines.forEach((line, index) => {
    const fontSize = index === 0 ? 12 : index < 4 ? 10 : 8.5;
    const yPos = 740 - (index * 22);
    const escaped = line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    stream += `BT /F1 ${fontSize} Tf 40 ${yPos} Td (${escaped}) Tj ET\n`;
  });

  const streamLen = Buffer.byteLength(stream);

  const header = '%PDF-1.4\n';
  const obj1 = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
  const obj2 = '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n';
  const obj3 = '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n';
  const obj4 = `4 0 obj\n<< /Length ${streamLen} >>\nstream\n${stream}endstream\nendobj\n`;
  const obj5 = '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold >>\nendobj\n';

  const o1 = header.length;
  const o2 = o1 + obj1.length;
  const o3 = o2 + obj2.length;
  const o4 = o3 + obj3.length;
  const o5 = o4 + obj4.length;
  const xrefOffset = o5 + obj5.length;

  function pad(num) {
    return String(num).padStart(10, '0');
  }

  const xref = `xref
0 6
0000000000 65535 f 
${pad(o1)} 00000 n 
${pad(o2)} 00000 n 
${pad(o3)} 00000 n 
${pad(o4)} 00000 n 
${pad(o5)} 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${xrefOffset}
%%EOF`;

  const fullContent = header + obj1 + obj2 + obj3 + obj4 + obj5 + xref;
  fs.writeFileSync(outputPath, fullContent, 'binary');
  console.log('Successfully generated valid PDF at:', outputPath);
}

// Write to root, public/documents, and Desktop
const target1 = path.join(__dirname, '..', 'Verma_Technologies_v_Bharat_Cloud_Petition.pdf');
const target2 = path.join(__dirname, '..', 'public', 'documents', 'Verma_Technologies_v_Bharat_Cloud_Petition.pdf');

fs.mkdirSync(path.join(__dirname, '..', 'public', 'documents'), { recursive: true });

generateValidPDF(target1);
generateValidPDF(target2);

