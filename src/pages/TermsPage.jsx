import React from "react";

const TermsPage = () => {
  return (
    <div className="mt-14 font-roboto  text-gray-800 min-h-screen flex flex-col items-center px-4 py-12">
      {/* Heading */}
     <div className="w-full bg-[#389ED7] md:h-[150px] h-[120px] flex items-center justify-center">
  <h1 className="md:-ml-[700px] text-4xl md:text-5xl font-bold text-white text-center">
    TERMS & CONDITIONS
  </h1>
</div>

      {/* Content Container */}
      <div className="md:-ml-12 -ml-6 max-w-full w-full rounded-2xl  p-6 md:p-10 leading-relaxed">
        <p className="mb-6">
          These terms govern your use of{" "}
          <a
            href="https://www.frostactive.com"
            className="text-[#389ED7] hover:underline"
          >
            www.frostactive.com
          </a>
          . By using the site, you agree to these terms.
        </p>

        <ul className="space-y-6">
          <li>
            <strong>• Eligibility:</strong> You must be at least 18 years old to
            use this site.
          </li>
          <li>
            <strong>• Orders:</strong> All orders are subject to availability
            and confirmation. Pre-orders will be fulfilled once the product is
            ready for dispatch.
          </li>
          <li>
            <strong>• Pricing:</strong> All prices include applicable taxes
            unless stated otherwise.
          </li>
          <li>
            <strong>• Shipping:</strong> Products will be shipped as per the
            estimated timelines. Delays may occur.
          </li>
          <li>
            <strong>• Refunds & Cancellations:</strong> Orders can be cancelled
            within 14 days. Refunds are processed within 7 business days.
          </li>
          <li>
            <strong>• Intellectual Property:</strong> All content, trademarks,
            and media are the property of FrostActive and cannot be reused
            without permission.
          </li>
          <li>
            <strong>• Misuse:</strong> You may not use our site for unlawful
            purposes or misuse the site functionality.
          </li>
          <li>
            <strong>• Limitation of Liability:</strong> We are not liable for
            indirect losses or failures caused by third-party services.
          </li>
        </ul>

        {/* Investor Disclaimer */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Investor Disclaimer
        </h2>
        <p className="mb-6">
          The information provided on our site or pitch pages does not
          constitute an offer to invest. Investment opportunities, if any, are
          governed by specific agreements and applicable regulations. No rights
          or shares are granted through product purchase or pre-order.
        </p>

        {/* Cookie Policy */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">Cookie Policy</h2>
        <p className="mb-6">
          We use cookies to track site performance, user preferences, and for
          analytics purposes. You can control cookie settings using the banner
          on our website or via browser settings.
        </p>

        {/* Newsletter */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Newsletter & Communication Preferences
        </h2>
        <p className="mb-6">
          By subscribing to our newsletter or updates, you agree to receive
          occasional communication from FrostActive. You may unsubscribe at any
          time via the link provided in each email.
        </p>

        {/* Dispute Resolution */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Dispute Resolution & Contact
        </h2>
        <p>
          For disputes or inquiries, contact us at{" "}
          <a
            href="mailto:info@frostactive.com"
            className="text-[#389ED7] hover:underline"
          >
            info@frostactive.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
