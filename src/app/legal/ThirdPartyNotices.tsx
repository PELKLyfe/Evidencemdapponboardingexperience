import React from "react";

export const ThirdPartyNotices = () => (
  <div className="space-y-6 text-[#003636] font-barlow">
    <section>
      <h2 className="text-xl font-bold mb-3">Third-Party Notices & Disclosures</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        EvidenceMD utilizes various third-party technologies and services to provide our platform. We ensure that our partners adhere to strict security and privacy standards.
      </p>
    </section>

    <section>
      <h2 className="text-lg font-bold mb-2">1. AI Model Architecture</h2>
      <p className="text-sm leading-relaxed text-muted-foreground mb-3">
        EvidenceMD utilizes proprietary, fine-tuned clinical models designed specifically for medical reasoning, documentation, and evidence synthesis. Our architecture is built to ensure clinical precision while maintaining strict data isolation.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
        <li><strong>Proprietary Fine-tuning:</strong> Our core clinical reasoning engine is a proprietary model fine-tuned on curated, high-fidelity medical literature and clinical guidelines.</li>
        <li><strong>Data Sovereignty:</strong> All inference is performed within our secure, HIPAA-compliant environment. No user data or PHI is ever used to train or improve foundation models.</li>
        <li><strong>Secure Infrastructure:</strong> We leverage enterprise-grade compute infrastructure with Zero-Retention policies, ensuring that your data is never stored by underlying hardware providers.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-lg font-bold mb-2">2. Infrastructure & Hosting</h2>
      <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
        <li><strong>Amazon Web Services (AWS):</strong> Secure hosting, database, and encryption services (US-EAST-1, HIPAA compliant).</li>
        <li><strong>Microsoft Azure:</strong> Health Data Services and secure cloud infrastructure.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-lg font-bold mb-2">3. Open Source Software</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        EvidenceMD is built using various open-source libraries, including React, Tailwind CSS, Lucide React, and Framer Motion. We are grateful to the open-source community for their contributions. A full list of libraries and their respective licenses is available upon request.
      </p>
    </section>

    <section>
      <h2 className="text-lg font-bold mb-2">4. Analytics & Support</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        We use privacy-preserving analytics (e.g., Fathom or Plausible) and secure support tools (e.g., Zendesk HIPAA edition) to maintain our service. No PHI is ever shared with these providers.
      </p>
    </section>

    <section>
      <h2 className="text-lg font-bold mb-2">5. Updates</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        This list may be updated as we integrate new technologies. We perform thorough security reviews of all third-party partners before integration.
      </p>
    </section>
  </div>
);
