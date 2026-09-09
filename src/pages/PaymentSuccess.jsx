import React from "react";
import { CheckCircle, Mail, MessageCircle, ArrowLeft } from "lucide-react";

const PaymentSuccess = ({ onBack }) => {
  const whatsappGroupLink = "https://chat.whatsapp.com/CK80t8lPq8C1Dy7LY9ZabW?mode=gi_t";

  return (
    <div className="payment-success-overlay">
      <div className="payment-success-card">

        {/* Success Icon */}
        <div className="payment-success-icon">
          <CheckCircle size={42} />
        </div>

        {/* Title */}
        <h1>Payment Successful!</h1>

        <p className="success-message">
          Thank you for enrolling in the AI for Teachers Course.
        </p>

        {/* Email Activation */}
        <div className="activation-box">
          <Mail size={22} />
          <div>
            <strong>Check your email</strong>
            <p>
              Please check your email for the activation link
              and course access details.
            </p>
          </div>
        </div>

        {/* WhatsApp */}
        <a
          href={whatsappGroupLink}
          target="_blank"
          rel="noopener noreferrer"
          className="success-whatsapp-button"
        >
          <MessageCircle size={20} />
          Join WhatsApp Group
        </a>

        {/* Back */}
        <button
          type="button"
          onClick={onBack}
          className="back-landing-button"
        >
          <ArrowLeft size={18} />
          Back to Landing Page
        </button>

      </div>
    </div>
  );
};

export default PaymentSuccess;