import React from "react";

export const HIPAABAA = () => (
  <div className="space-y-6 text-[#003636] font-barlow">
    <section>
      <h2 className="text-xl font-bold mb-3">HIPAA Compliance & Business Associate Agreement</h2>
      <p className="text-sm leading-relaxed text-muted-foreground mb-4">
        EvidenceMD is designed to meet the rigorous standards of the Health Insurance Portability and Accountability Act (HIPAA). We understand the critical importance of protecting Protected Health Information (PHI).
      </p>
    </section>

    <section>
      <h2 className="text-lg font-bold mb-2">1. The Business Associate Agreement (BAA)</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        For our Plus and Pro plan enterprise customers, EvidenceMD provides a standard Business Associate Agreement (BAA). The BAA outlines our responsibilities as a Business Associate to your Covered Entity, ensuring that we handle PHI in accordance with HIPAA regulations.
      </p>
    </section>

    <section>
      <h2 className="text-lg font-bold mb-2">2. Technical Safeguards</h2>
      <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
        <li><strong>Encryption:</strong> All data is encrypted using AES-256 at rest and TLS 1.3 in transit.</li>
        <li><strong>Access Control:</strong> Role-based access controls (RBAC) ensure that only authorized personnel can access sensitive systems.</li>
        <li><strong>Audit Logging:</strong> We maintain detailed logs of all access and modifications to PHI for compliance auditing.</li>
        <li><strong>Automatic Log-off:</strong> Sessions are automatically terminated after periods of inactivity to prevent unauthorized access.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-lg font-bold mb-2">3. Administrative Safeguards</h2>
      <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
        <li><strong>Employee Training:</strong> All staff undergo regular HIPAA and security awareness training.</li>
        <li><strong>Risk Assessment:</strong> We perform regular security risk assessments to identify and mitigate vulnerabilities.</li>
        <li><strong>Incident Response:</strong> We have a formal incident response plan in place to handle potential data breaches or security events.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-lg font-bold mb-2">4. Physical Safeguards</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Our infrastructure is hosted on ISO 27001 and SOC 2 Type II certified cloud providers (e.g., AWS or Azure) that maintain high levels of physical security at their data centers.
      </p>
    </section>

    <section>
      <h2 className="text-lg font-bold mb-2">5. Requesting a BAA</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        To execute a BAA with EvidenceMD, please contact your account manager or email our compliance team at compliance@evidencemd.ai.
      </p>
    </section>
  </div>
);
