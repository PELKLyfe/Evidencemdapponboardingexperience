import React from "react";

export const PrivacyPolicy = () => (
  <div className="space-y-6 text-[#003636] font-barlow">
    <section>
      <h2 className="text-xl font-bold mb-3">1. Overview</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        EvidenceMD ("we," "our," or "us") is committed to protecting the privacy and security of your data. This Privacy Policy describes how we collect, use, and disclose personal and health information when you use our clinical AI platform.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">2. Data We Collect</h2>
      <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
        <li><strong>Account Information:</strong> Name, professional credentials, institution, and contact details.</li>
        <li><strong>Clinical Data:</strong> Patient documentation, imaging files, and clinical notes uploaded for processing.</li>
        <li><strong>Usage Data:</strong> Technical logs, device information, and interaction patterns within the application.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">3. HIPAA Compliance & Data Security</h2>
      <p className="text-sm leading-relaxed text-muted-foreground mb-3">
        EvidenceMD is designed to be HIPAA-compliant. We implement industry-standard administrative, physical, and technical safeguards, including:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
        <li>AES-256 encryption for data at rest.</li>
        <li>TLS 1.3 encryption for data in transit.</li>
        <li>Strict access controls and audit logging.</li>
        <li>Zero-retention or business associate agreements with AI sub-processors.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">4. Use of AI and LLMs</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        We utilize large language models (LLMs) to provide clinical reasoning and documentation support. Your data is processed through secure, enterprise-grade APIs. We do not use your Protected Health Information (PHI) to train foundation models.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">5. Data Retention</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        We retain clinical data only as long as necessary to provide our services or as required by law. Users can request immediate deletion of their data through the account settings.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-3">6. Contact Information</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        For privacy inquiries or to exercise your data rights, please contact our Data Protection Officer at privacy@evidencemd.ai.
      </p>
    </section>
  </div>
);
