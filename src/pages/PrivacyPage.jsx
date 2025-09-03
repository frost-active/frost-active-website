import React from "react";

const PrivacyPage = () => {
  return (
    <div className="mt-14 font-roboto  text-gray-800 min-h-screen flex flex-col items-center px-4 py-12">
      {/* Heading */}
     <div className="w-full bg-[#389ED7] md:h-[150px] h-[120px] flex items-center justify-center">
  <h1 className="md:-ml-[820px] text-4xl md:text-5xl font-bold text-white text-center">
    PRIVACY POLICY
  </h1>
</div>

      {/* Content Container */}
      <div className="md:-ml-12 -ml-6 max-w-full w-full  rounded-2xl  p-6 md:p-10 leading-relaxed">
        <p className="mb-6">
          We value your privacy. This policy outlines how FrostActive collects,
          uses, and protects your personal information.
        </p>

        <ul className="space-y-6">
          <li>
            <strong>• Legal Basis:</strong> All data collection and processing
            is done in compliance with the General Data Protection Regulation
            (GDPR).
          </li>

          <li>
            <strong>• Data Collected:</strong> Name, email, phone number, IP
            address, and interactions with our website (e.g., forms, newsletter
            signups, pre-orders).
          </li>

          <li>
            <strong>• Purpose:</strong> To provide services, send updates,
            process payments, manage accounts, and improve user experience.
          </li>

          <li>
            <strong>• Third-Party Services:</strong> We may use services like
            payment gateways, newsletter platforms, or analytics tools.
          </li>

          <li>
            <strong>• Data Subject Rights:</strong> You have the right to
            access, correct, delete, restrict, or port your data. To exercise
            any of these rights, contact us at{" "}
            <a
              href="mailto:info@frostactive.com"
              className="text-[#389ED7] hover:underline"
            >
              info@frostactive.com
            </a>
            .
          </li>

          <li>
            <strong>• Cookies:</strong> Our site uses cookies for analytics and
            functionality. You can manage cookie preferences through our cookie
            banner.
          </li>

          <li>
            <strong>• Children’s Data:</strong> We do not knowingly collect data
            from individuals under 16 years of age.
          </li>

          <li>
            <strong>• Data Retention:</strong> We retain personal data as long
            as necessary to fulfill our purposes unless required by law.
          </li>

          <li>
            <strong>• Security:</strong> We implement appropriate technical and
            organizational measures to protect your data.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPage;
