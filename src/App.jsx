import React, { useEffect, useState } from "react";
import logo from "./assets/QNAYDS_LOGO.png";
import teacherVideo from "./assets/Teacher using ai.mp4";
import teacherThumbnail from "./assets/thumbnail.webp";
import mentorImage from "./assets/mentor_image.png";

import {
  Check,
  ChevronDown,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Presentation,
  FileText,
  ClipboardList,
  Brain,
  ArrowRight,
  Clock,
  Users,
  X,
  Award,
  BriefcaseBusiness,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa6";
import EnrollmentFlow from "./components/EnrollmentFlow";

/* =====================================================
   WHATSAPP
===================================================== */

const WHATSAPP_NUMBER = "919074871204";

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi, I want to learn about the AI for Teachers Course. Please share the details.",
)}`;

const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const courseId = String(import.meta.env.VITE_COURSE_ID || "").trim();

/* =====================================================
   PAYMENT
===================================================== */

const fetchCourse = async () => {
  if (!apiUrl || !courseId) {
    throw new Error(
      "Course payment is not configured yet. Please try again later.",
    );
  }

  const response = await fetch(`${apiUrl}/courses/${courseId}`);

  if (!response.ok) {
    throw new Error("Unable to load the course price. Please try again later.");
  }

  const course = await response.json();
  const priceInRupees = Number(course.price);

  if (!Number.isFinite(priceInRupees) || priceInRupees < 0) {
    throw new Error("The course price is invalid. Please try again later.");
  }

  return {
    priceInRupees,
    amountInPaise: Math.round(priceInRupees * 100),
  };
};

const loadRazorpay = () =>
  new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", resolve, { once: true });
      existingScript.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = resolve;

    script.onerror = () =>
      reject(new Error("Unable to load the payment gateway."));

    document.body.appendChild(script);
  });

/* =====================================================
   FLOATING WHATSAPP
===================================================== */

const FloatingWhatsApp = () => {
  return (
    <div className="whatsapp-container">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="whatsapp-float"
      >
        <span className="whatsapp-notification">1</span>

        <FaWhatsapp className="whatsapp-icon" />
      </a>
    </div>
  );
};

/* =====================================================
   SCROLL ENROLLMENT BUTTON
   Appears while scrolling down and hides while scrolling up.
===================================================== */

const FloatingEnrollmentButton = ({
  isVisible,
  onEnroll,
  offerHours,
  offerMinutes,
  offerSeconds,
}) => {
  return (
    <button
    
      type="button"
      className={`floating-enrollment-button ${
        isVisible ? "is-visible " : ""
      }`}
      onClick={onEnroll}
      aria-label="Enroll now"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <div className="floating-enrollment-copy">
        <div className="floating-enrollment-main">
          <h6>AI For Teachers</h6>

          <p>
            <del>₹5,000</del>
            <strong>₹1,999</strong>
            <span className="text-white">Enroll Now</span>
          </p>
        </div>

        <div className="floating-enrollment-urgency">
          <span>
            <Clock size={13} />
            Limited offer
          </span>
          <strong>20 seats left</strong>
          <small>
            {offerHours}:{offerMinutes}:{offerSeconds}
          </small>
        </div>
      </div>

      <ArrowRight size={17} />
    </button>
  );
};

/* =====================================================
   MODULES
===================================================== */

const modules = [
  {
    number: "01",
    title: "Digital & AI Basics",
    subtitle: "ഡിജിറ്റൽ & AI അടിസ്ഥാനങ്ങൾ",
    icon: Brain,
  },
  {
    number: "02",
    title: "Getting Started with AI Tools",
    subtitle: "AI Tools ഉപയോഗിച്ച് തുടങ്ങാം",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Create Teaching Manuals & Lesson Plans",
    subtitle: "Teaching Manuals & Lesson Plans",
    icon: BookOpen,
  },
  {
    number: "04",
    title: "Generate Question Papers Instantly",
    subtitle: "Question Papers എളുപ്പത്തിൽ തയ്യാറാക്കാം",
    icon: ClipboardList,
  },
  {
    number: "05",
    title: "Build Presentations in Minutes",
    subtitle: "Presentation മിനിറ്റുകൾക്കുള്ളിൽ",
    icon: Presentation,
  },
  {
    number: "06",
    title: "AI for Daily Teacher Productivity",
    subtitle: "ദൈനംദിന Teacher Productivity",
    icon: FileText,
  },
  {
    number: "07",
    title: "Ethical & Safe AI Usage",
    subtitle: "സുരക്ഷിതവും ഉത്തരവാദിത്തമുള്ളതുമായ AI ഉപയോഗം",
    icon: ShieldCheck,
  },
];

/* =====================================================
   CREATIONS
===================================================== */

const creations = [
  "Lesson Plans",
  "Teaching Manuals",
  "Question Papers",
  "MCQ & Quizzes",
  "Presentations",
  "Worksheets",
  "Learning Outcomes",
  "Study Materials",
  "Parent Communication",
  "Translation & Summaries",
];

/* =====================================================
   FAQ
===================================================== */

const faqs = [
  {
    question: "ഈ course ആരെക്കൊണ്ടാണ് പഠിക്കാൻ കഴിയുക?",
    answer:
      "School teachers, college teachers, tutors, trainers, educators, and teaching professionalsക്ക് ഈ course പ്രയോജനപ്പെടും.",
  },
  {
    question: "AI പഠിക്കാൻ coding അറിയണമോ?",
    answer:
      "Coding knowledge ആവശ്യമില്ല. Teachers-ന് practical ആയി AI tools ഉപയോഗിക്കാൻ പഠിപ്പിക്കുന്ന രീതിയിലാണ് course.",
  },
  {
    question: "Course-ൽ എന്തൊക്കെ tools പഠിക്കും?",
    answer:
      "ChatGPT, Canva, Gamma, Google tools തുടങ്ങിയ teacher productivity tools practical ആയി പരിചയപ്പെടും.",
  },
  {
    question: "Course-ൽ എന്തൊക്കെയാണ് ലഭിക്കുന്നത്?",
    answer:
      "7 practical modules വഴി teachers-ന് AI tools ഉപയോഗിച്ച് daily teaching tasks കൂടുതൽ എളുപ്പമാക്കാൻ ആവശ്യമായ skills പഠിക്കാം.",
  },
  {
    question: "AI-generated content നേരിട്ട് classroom-ൽ ഉപയോഗിക്കാമോ?",
    answer:
      "AI output എല്ലായ്പ്പോഴും teacher verify ചെയ്യണം. Course-ൽ fact-checking, privacy, ethical usage എന്നിവയും ഉൾപ്പെടുത്തിയിട്ടുണ്ട്.",
  },
];

/* =====================================================
   APP
===================================================== */

function App() {
  const [openFaq, setOpenFaq] = useState(null);

  const [offerEndsAt] = useState(() => {
    const storedDeadline = window.localStorage.getItem(
      "ai-teachers-offer-deadline-18h",
    );

    if (storedDeadline && Number(storedDeadline) > Date.now()) {
      return Number(storedDeadline);
    }

    const newDeadline = Date.now() + 18 * 60 * 60 * 1000;
    window.localStorage.setItem(
      "ai-teachers-offer-deadline-18h",
      String(newDeadline),
    );

    return newDeadline;
  });

  const [offerTimeLeft, setOfferTimeLeft] = useState(() =>
    Math.max(0, offerEndsAt - Date.now()),
  );

  const [showModal, setShowModal] = useState(false);

  // Controls the floating enrollment CTA based on scroll direction.
  const [showFloatingEnrollment, setShowFloatingEnrollment] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  const [paymentStarted, setPaymentStarted] = useState(false);

  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    const updateOfferTime = () => {
      setOfferTimeLeft(Math.max(0, offerEndsAt - Date.now()));
    };

    updateOfferTime();

    const timer = window.setInterval(updateOfferTime, 1000);

    return () => window.clearInterval(timer);
  }, [offerEndsAt]);

  const totalOfferSeconds = Math.floor(offerTimeLeft / 1000);
  const offerHours = String(Math.floor(totalOfferSeconds / 3600)).padStart(2, "0");
  const offerMinutes = String(Math.floor((totalOfferSeconds % 3600) / 60)).padStart(2, "0");
  const offerSeconds = String(totalOfferSeconds % 60).padStart(2, "0");

  /* =====================================================
     SCROLL-AWARE ENROLLMENT CTA
  ===================================================== */

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;

      if (currentScrollY < 120) {
        setShowFloatingEnrollment(false);
        lastScrollY = currentScrollY;
        return;
      }

      if (Math.abs(scrollDifference) < 4) {
        lastScrollY = currentScrollY;
        return;
      }

      setShowFloatingEnrollment(scrollDifference > 0);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleEnrollmentChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /* =====================================================
     PAYMENT
  ===================================================== */

  const handleContinuePayment = async (event) => {
    event.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim()
    ) {
      return;
    }

    setPaymentError("");

    setPaymentStarted(true);

    try {
      if (!razorpayKeyId) {
        throw new Error(
          "Payment is not configured yet. Please try again later.",
        );
      }

      const { amountInPaise } = await fetchCourse();

      await loadRazorpay();

      const checkout = new window.Razorpay({
        key: razorpayKeyId,
        amount: amountInPaise,
        currency: "INR",

        name: "QNAYDS Academy",

        description: "AI for Teachers Course",

        prefill: {
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          contact: formData.phone.trim(),
        },

        notes: {
          course: "AI for Teachers",
          course_id: courseId,
        },

        theme: {
          color: "#108dcc",
        },

        handler: (response) => {
          setPaymentStarted(false);

          setShowModal(false);

          console.info(
            "Razorpay payment completed",
            response.razorpay_payment_id,
          );
        },

        modal: {
          ondismiss: () => setPaymentStarted(false),
        },
      });

      checkout.on("payment.failed", (response) => {
        setPaymentStarted(false);

        setPaymentError(
          response.error?.description ||
          "Payment failed. Please try again.",
        );
      });

      checkout.open();
    } catch (error) {
      setPaymentStarted(false);

      setPaymentError(
        error.message || "Unable to start payment. Please try again.",
      );
    }
  };

  /* =====================================================
     OPEN ENROLLMENT
  ===================================================== */

  const openEnrollment = () => {
    setPaymentStarted(false);

    setPaymentError("");

    setShowModal(true);
  };

  /* =====================================================
     SCROLL TO SYLLABUS
  ===================================================== */

  const scrollToSyllabus = () => {
    document.getElementById("syllabus")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* =====================================================
         EXTRA OFFER STYLES
      ===================================================== */}

      <style>{`

        /* =====================================================
           HERO OFFER BOX
        ===================================================== */

        .hero-offer-box {
          width: min(100%, 760px);
          margin: 28px auto 24px;
          padding: 26px 30px 24px;
          box-sizing: border-box;
          text-align: center;

          background: rgba(255, 255, 255, 0.98);

          border: 1.5px solid #cfe0f4;

          border-radius: 20px;

          box-shadow: 0 16px 38px rgba(20, 52, 90, 0.12);
        }

        /* =====================================================
           HERO OFFER BOX
        ===================================================== */

        .hero-offer-box,
        .modules-price-card,
        .final-offer-box {
          position: relative;
          overflow: visible;
        }

        .save-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: #ff2635;
          color: #ffffff;
          padding: 11px 24px;
          min-width: 155px;
          text-align: center;
          font-size: 16px;
          font-weight: 800;
          line-height: 1.2;
          border-radius: 0 20px 0 20px;
          box-shadow: 0 6px 16px rgba(255, 38, 53, 0.25);
          z-index: 20;
        }
        .hero-offer-urgency {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          width: min(100%, 760px);
          margin: 34px auto 0;
        }

        .hero-offer-limit {
          display: inline-flex;
          align-items: center;
          min-height: 46px;
          padding: 0 20px;
          border: 1px solid #f3d5ae;
          border-radius: 999px;
          background: #fff8ed;
          color: #bd4b16;
          font-size: 16px;
          font-weight: 800;
        }

        .hero-offer-limit span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .hero-offer-limit strong {
          margin: 0 16px;
          padding-left: 16px;
          border-left: 1px solid #e8c99f;
        }

        .hero-offer-countdown {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #34445a;
          font-size: 15px;
          font-weight: 700;
        }

        .hero-offer-time {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #172235;
          font-size: 18px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .hero-offer-time span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 39px;
          height: 38px;
          padding: 0 5px;
          box-sizing: border-box;
          border-radius: 9px;
          background: #172235;
          color: #fff;
        }

        .hero-offer-countdown {
          min-height: 64px;
          padding: 0 17px;
          border: 1px solid #cfe0f4;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 8px 18px rgba(20, 52, 90, 0.1);
        }

        .hero-offer-countdown svg {
          color: #c28b3e;
        }

        .hero-offer-countdown::first-letter {
          font-size: 20px;
        }

        .hero-offer-label {
          display: block;
          margin-bottom: 7px;

          color: #536b88;

          font-size: 13px;
          font-weight: 800;

          letter-spacing: 0.8px;

          text-transform: uppercase;
        }

        .hero-offer-price {
          display: flex;

          align-items: baseline;

          justify-content: center;

          gap: 14px;

          margin-bottom: 6px;
        }

        .hero-offer-price del {
          color: #8a94a6;

          font-size: 21px;

          font-weight: 600;
        }

        .hero-offer-price strong {
          color: #1677d2;

          font-size: 44px;

          line-height: 1;

          font-weight: 900;
        }

        .hero-offer-note {
          display: block;

          margin-bottom: 18px;

          color: #60738d;

          font-size: 13px;
        }

        .hero-offer-actions {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 12px;
        }

        .hero-offer-actions .primary-button,
        .hero-offer-actions .secondary-button {
          width: 100%;

          min-height: 58px;

          box-sizing: border-box;
        }

        .hero-offer-checks {
          display: flex;

          justify-content: center;

          flex-wrap: wrap;

          gap: 12px 30px;

          margin-top: 17px;

          color: #536b88;

          font-size: 14px;

          font-weight: 700;
        }

        .hero-offer-checks span {
          display: inline-flex;

          align-items: center;

          gap: 6px;
        }

        .hero-offer-checks svg {
          color: #1596d1;
        }


        /* =====================================================
           MODULE PRICE CARD
        ===================================================== */

        .modules-price-card {
          width: min(100%, 760px);

          margin: 34px auto 0;

          padding: 26px 30px 28px;

          box-sizing: border-box;

          text-align: center;

          background: #ffffff;

          border: 1.5px solid #cfe0f4;

          border-radius: 20px;

          box-shadow: 0 16px 38px rgba(20, 52, 90, 0.12);
        }

        .modules-price-label {
          display: block;

          margin-bottom: 7px;

          color: #536b88;

          font-size: 13px;

          font-weight: 800;

          letter-spacing: 0.8px;

          text-transform: uppercase;
        }

        .modules-price-values {
          display: flex;

          align-items: baseline;

          justify-content: center;

          gap: 14px;

          margin-bottom: 7px;
        }

        .modules-price-values del {
          color: #8a94a6;

          font-size: 21px;

          font-weight: 600;
        }

        .modules-price-values strong {
          color: #1677d2;

          font-size: 44px;

          line-height: 1;

          font-weight: 900;
        }

        .modules-price-note {
          display: block;

          margin-bottom: 20px;

          color: #60738d;

          font-size: 13px;
        }

        .modules-price-button {
          width: 100%;

          max-width: 380px;

          min-height: 58px;

          border: 0;

          border-radius: 13px;

          background: #1596d1;

          color: #ffffff;

          font-size: 19px;

          font-weight: 800;

          cursor: pointer;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 10px;

          box-shadow: 0 10px 25px rgba(21, 150, 209, 0.28);

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .modules-price-button:hover {
          transform: translateY(-2px);

          box-shadow: 0 14px 30px rgba(21, 150, 209, 0.36);
        }

        .modules-price-features {
          display: flex;

          justify-content: center;

          flex-wrap: wrap;

          gap: 10px 28px;

          margin-top: 17px;

          color: #536b88;

          font-size: 14px;

          font-weight: 700;
        }

        .modules-price-features span {
          display: inline-flex;

          align-items: center;

          gap: 6px;
        }

        .modules-price-features svg {
          color: #1596d1;
        }


        /* =====================================================
           FINAL CTA OFFER
        ===================================================== */

        .final-offer-box {
          width: min(100%, 720px);

          margin: 28px auto 0;

          padding: 28px 30px 30px;

          box-sizing: border-box;

          text-align: center;

          background: rgba(255, 255, 255, 0.08);

          border: 1px solid rgba(255, 255, 255, 0.2);

          border-radius: 20px;

          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.16);

          backdrop-filter: blur(6px);
        }

        .final-offer-price {
          display: flex;

          align-items: baseline;

          justify-content: center;

          gap: 15px;

          margin-bottom: 6px;
        }

        .final-offer-price del {
          color: rgba(255, 255, 255, 0.55);

          font-size: 21px;

          font-weight: 600;
        }

        .final-offer-price strong {
          color: #ffffff;

          font-size: 46px;

          line-height: 1;

          font-weight: 900;
        }

        .final-offer-note {
          display: block;

          margin-bottom: 20px;

          color: rgba(255, 255, 255, 0.86);

          font-size: 14px;
        }

        .final-offer-button {
          width: 100%;

          max-width: 380px;

          min-height: 60px;

          border: 0;

          border-radius: 13px;

          background: #1596d1;

          color: #ffffff;

          font-size: 19px;

          font-weight: 800;

          cursor: pointer;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 10px;

          box-shadow: 0 10px 25px rgba(21, 150, 209, 0.28);

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .final-offer-button:hover {
          transform: translateY(-2px);

          box-shadow: 0 14px 30px rgba(21, 150, 209, 0.36);
        }


        /* =====================================================
           IMPORTANT VIDEO GAP FIX
        ===================================================== */

        .video-section-tight {
          padding-top: 65px !important;

          padding-bottom: 20px !important;

          margin-bottom: 0 !important;
        }

        .video-section-tight .section-heading {
          margin-bottom: 28px !important;
        }

        .video-section-tight .course-video {
          margin-bottom: 0 !important;

          padding-bottom: 0 !important;

          line-height: 0;
        }

        .video-section-tight .course-video video {
          display: block;

          width: auto;

          max-width: 100%;

          height: min(72vh, 720px);

          margin: 0 auto;

          object-fit: contain;

          border-radius: 18px;

          background: #000;

          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.16);
        }

        .video-section-tight + .intro-section {
          padding-top: 35px !important;

          margin-top: 0 !important;
        }


        /* =====================================================
           REVIEWS
        ===================================================== */

        .reviews-section {
          background: #f7fbff;
        }

        .reviews-section .section-heading {
          margin-bottom: 50px;
        }

        .reviews-section .section-heading h2 span {
          color: #108dcc;
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          width: 100%;
        }

        .review-card {
          background: #ffffff;
          border: 1px solid #e4eef6;
          border-radius: 20px;
          padding: 28px 26px;
          box-shadow: 0 10px 30px rgba(13, 23, 45, 0.07);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .review-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(13, 23, 45, 0.12);
        }

        .review-stars {
          color: #f5b800;
          font-size: 20px;
          letter-spacing: 3px;
          margin-bottom: 18px;
        }

        .review-text {
          color: #4c5b6d;
          font-size: 15px;
          line-height: 1.8;
          margin: 0 0 25px;
        }

        .review-user {
          display: flex;
          align-items: center;
          gap: 13px;
          border-top: 1px solid #edf2f6;
          padding-top: 18px;
        }

        .review-avatar {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 50%;
          background: #108dcc;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          font-weight: 700;
        }

        .review-user h4 {
          margin: 0 0 4px;
          color: #0d172d;
          font-size: 15px;
          font-weight: 700;
        }

        .review-user span {
          color: #7a8795;
          font-size: 12px;
        }

        @media (max-width: 1000px) {
          .reviews-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 600px) {

          .hero-offer-box {
            padding: 22px 16px 20px;

            border-radius: 17px;
          }

          .hero-offer-price strong {
            font-size: 38px;
          }

          .hero-offer-price del {
            font-size: 18px;
          }

          .hero-offer-actions {
            grid-template-columns: 1fr;
          }

          .hero-offer-actions .primary-button,
          .hero-offer-actions .secondary-button {
            min-height: 54px;
          }

          .hero-offer-checks {
            font-size: 12px;

            gap: 9px 18px;
          }

          .hero-offer-urgency {
            margin-top: 26px;
            gap: 9px;
          }

          .hero-offer-limit {
            min-height: 42px;
            padding: 0 16px;
            font-size: 14px;
          }

          .hero-offer-countdown {
            min-height: 58px;
            padding: 0 13px;
            border-radius: 15px;
            font-size: 14px;
          }

          .hero-offer-limit strong {
            margin: 0 10px;
            padding-left: 10px;
          }

          .hero-offer-countdown {
            width: 100%;
            justify-content: center;
            font-size: 14px;
          }

          .hero-offer-time {
            font-size: 16px;
          }

          .hero-offer-time span {
            min-width: 35px;
            height: 35px;
          }

          .final-offer-box {
            padding: 24px 16px 25px;

            border-radius: 17px;
          }

          .final-offer-price strong {
            font-size: 40px;
          }

          .final-offer-price del {
            font-size: 18px;
          }

          .final-offer-button {
            font-size: 17px;

            min-height: 56px;
          }


          .save-badge {
            min-width: 125px;
            padding: 9px 15px;
            font-size: 13px;
            border-radius: 0 17px 0 17px;
          }

          .reviews-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .review-card {
            padding: 24px 20px;
          }

          .review-text {
            font-size: 14px;
            line-height: 1.75;
          }

          /* VIDEO MOBILE GAP FIX */

          .video-section-tight {
            padding-top: 45px !important;

            padding-bottom: 10px !important;
          }

          .video-section-tight .section-heading {
            margin-bottom: 20px !important;
          }

          .video-section-tight .course-video video {
            width: 100%;

            height: auto;

            max-height: 78vh;

            border-radius: 14px;
          }

          .video-section-tight + .intro-section {
            padding-top: 25px !important;
          }
        }

      `}</style>

      <div className="page">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="hero">

          <div className="hero-glow glow-one"></div>

          <div className="hero-glow glow-two"></div>

          <div className="container hero-content">

            <div className="modal-logo-wrapper">
              <img
                src={logo}
                alt="QNAYDS"
                className="modal-logo"
              />
            </div>

            <div className="hero-offer-urgency" aria-live="polite">

              <div className="hero-offer-limit">
                <span>🔥 Limited Offer</span>

                <strong>Only 20 seats available</strong>
              </div>

              <div className="hero-offer-countdown">
                <Clock size={16} />

                Offer ends in

                <span className="hero-offer-time" aria-label={`${offerHours} hours, ${offerMinutes} minutes, ${offerSeconds} seconds`}>
                  <span>{offerHours}</span>
                  :
                  <span>{offerMinutes}</span>
                  :
                  <span>{offerSeconds}</span>
                </span>
              </div>

            </div>

            <div className="hero-badge">

              <Sparkles size={16} />

              അധ്യാപകർക്കായി പ്രത്യേകമായി തയ്യാറാക്കിയത്

            </div>

      <h1>
  <span>Smart Teacher</span>
  <br />
  <span>ആകാൻ ആഗ്രഹമുണ്ടോ?</span>

  <small>
    എവിടെ തുടങ്ങണം എന്നറിയില്ലേ?
  </small>
</h1>

            <p className="hero-description">
  Lesson Plans മുതൽ Question Papers വരെ…{" "}
  <strong>AI ഉപയോഗിച്ച് നിങ്ങളുടെ Teaching Preparation എളുപ്പമാക്കാൻ പഠിക്കാം.</strong>
</p>

            <div className="hero-offer-box">

              <div className="save-badge">
                SAVE ₹3,001
              </div>

              <span className="hero-offer-label">
                Course Fee
              </span>

              <div className="hero-offer-price">

                <del><h2>₹5,000</h2></del>

                <strong><h6>₹1,999</h6></strong>

              </div>

              <span className="hero-offer-note">
                One-time payment
              </span>

              <div className="hero-offer-actions">

                <button
                  type="button"
                  className="primary-button"
                  onClick={openEnrollment}
                >
                  ഇപ്പോൾ Join ചെയ്യാം

                  <ArrowRight size={18} />

                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={scrollToSyllabus}
                >
                  Syllabus കാണാം
                </button>

              </div>

              <div className="hero-offer-checks">

                <span>
                  <Check size={17} />

                  Teacher Focused
                </span>

                <span>
                  <Check size={17} />

                  Practical Learning
                </span>

              </div>

            </div>

            <div className="hero-stats">

              <div>
                <strong>07</strong>

                <span>Modules</span>
              </div>

              <div>
                <strong>AI</strong>

                <span>Practical Skills</span>
              </div>

              <div>
                <strong>100%</strong>

                <span>Teacher Focus</span>
              </div>

            </div>

            

          </div>

        </section>


        {/* =================================================
            WATCH BEFORE YOU ENROLL
        ================================================= */}

        <section className="section video-section video-section-tight">

          <div className="container narrow">

            <div className="section-heading">

              <span className="section-tag">
                WATCH BEFORE YOU ENROLL
              </span>

              <h2>
                ഈ course നിങ്ങൾക്ക്
                <span> എങ്ങനെ ഉപകാരപ്പെടും?</span>
              </h2>

              <p>
                Enroll ചെയ്യുന്നതിന് മുമ്പ് course-നെ കുറിച്ച്
                ഒരു ചെറിയ introduction കാണാം.
              </p>

            </div>

            <div className="course-video">

              <video
                controls
                playsInline
                preload="metadata"
                poster={teacherThumbnail}
              >
                <source
                  src={teacherVideo}
                  type="video/mp4"
                />

                Your browser does not support the video tag.

              </video>



            </div>


          </div>


          <div className=" w-screen h-20 flex items-center justify-center">
             <button
                  type="button"
                  className="primary-button"
                  onClick={openEnrollment}
                >
                  ഇപ്പോൾ Join ചെയ്യാം

                  <ArrowRight size={18} />

                </button>

          </div>
        </section>


        {/* =================================================
            INTRO
        ================================================= */}

        <section className="section intro-section">

          <div className="container narrow">

            <span className="section-tag">
              AI FOR TEACHERS
            </span>

            <h2>
              അധ്യാപകരുടെ സമയം
              <span> AI ഉപയോഗിച്ച് ലാഭിക്കാം</span>
            </h2>

            <p className="section-description">
              Lesson plan തയ്യാറാക്കുന്നത് മുതൽ question paper,
              worksheet, presentation, notice, parent message
              എന്നിവ തയ്യാറാക്കുന്നത് വരെ അധ്യാപകർ ദിവസവും
              നിരവധി repetitive tasks ചെയ്യുന്നു.
            </p>

            <div className="intro-grid">

              <div className="info-card">

                <Clock size={28} />

                <h3>
                  സമയം ലാഭിക്കാം
                </h3>

                <p>
                  ആവർത്തിച്ച് ചെയ്യേണ്ട teaching tasks
                  വേഗത്തിൽ പൂർത്തിയാക്കാം.
                </p>

              </div>

              <div className="info-card">

                <Sparkles size={28} />

                <h3>
                  Smart ആയി Create ചെയ്യാം
                </h3>

                <p>
                  AI ഉപയോഗിച്ച് teaching resources
                  കൂടുതൽ വേഗത്തിൽ തയ്യാറാക്കാം.
                </p>

              </div>

              <div className="info-card">

                <Users size={28} />

                <h3>
                  Teacher remains in control
                </h3>

                <p>
                  AI സഹായിക്കും. Final decision
                  എപ്പോഴും teacher-ന്റേതായിരിക്കും.
                </p>

              </div>

            </div>

            <button
              type="button"
              className="section-join-button"
              onClick={openEnrollment}
            >
              ഇപ്പോൾ Join ചെയ്യാം

              <ArrowRight size={18} />

            </button>

          </div>

        </section>


        {/* =================================================
            MENTOR
        ================================================= */}

        <section className="section mentor-section">

          <div className="container">

            <div className="section-heading">

              <span className="section-tag">
                MEET YOUR MENTOR
              </span>

              <h2>
                Practical experience.
                <span> Teacher-focused guidance.</span>
              </h2>

              <p>
                AI tools പഠിപ്പിക്കുന്നതിൽ മാത്രം അല്ല, അവയെ real teaching work-ൽ
                എങ്ങനെ ഉപയോഗിക്കാം എന്നതിലാണ് mentor-ന്റെ focus.
              </p>

            </div>

            <div className="mentor-profile">

              <aside className="mentor-intro">

                <img
                  src={mentorImage}
                  alt="AI for Teachers mentor"
                  className="mentor-image"
                />

                <div className="mentor-info">

                  <h3>AI for Teachers Mentor</h3>

                  <span className="mentor-role">
                    AI Integration Lead & Program Coordinator
                  </span>

                  <div className="mentor-credential">
                    <Award size={16} />

                    <span>
                      Certified in <strong>AI Prompt Engineering</strong> through
                      the One Million Prompters Initiative by Dubai Future
                      Foundation.
                    </span>
                  </div>

                </div>

              </aside>

              <div className="mentor-details">

                <div className="mentor-highlights">

                  <div className="mentor-highlight">
                    <Award size={23} />
                    <strong>C-TET And K-TET Certified</strong>
                  </div>

                  <div className="mentor-highlight">
                    <BriefcaseBusiness size={23} />
                    <strong>AI Integration Lead</strong>
                  </div>

                  <div className="mentor-highlight">
                    <Users size={23} />
                    <strong>AI Integration & Prompt Engineering</strong>
                  </div>

                  <div className="mentor-highlight">
                    <Clock size={23} />
                    <strong>7 Years of Experience</strong>
                  </div>

                </div>

                <blockquote className="mentor-quote">
                  “As an AI Integration Lead, educator, and prompt-engineering
                  trainer, I help teachers turn AI into practical classroom
                  support, from lesson plans and question papers to
                  presentations and learning materials. My goal is simple:
                  make every teacher more confident, creative, and productive
                  with AI.”
                </blockquote>

              </div>

            </div>

            <div className="section-cta-row">

              <button
                type="button"
                className="section-join-button"
                onClick={openEnrollment}
              >
                ഇപ്പോൾ Join ചെയ്യാം

                <ArrowRight size={18} />

              </button>

            </div>

          </div>

        </section>


        {/* =================================================
            USE CASES
        ================================================= */}

        <section className="section usecase-section">

          <div className="container">

            <div className="section-heading">

              <span className="section-tag">
                REAL TEACHER USE CASES
              </span>

              <h2>
                നിങ്ങളുടെ daily teaching work
                <span> കൂടുതൽ എളുപ്പമാക്കാം</span>
              </h2>

            </div>

            <div className="usecase-grid">

              <div className="usecase-card">
                <span>01</span>

                <h3>Lesson Plan</h3>

                <p>
                  ഒരു topic നൽകി structured lesson plan
                  തയ്യാറാക്കാൻ AI ഉപയോഗിക്കാം.
                </p>
              </div>

              <div className="usecase-card">
                <span>02</span>

                <h3>Question Paper</h3>

                <p>
                  MCQ, descriptive questions, answer key
                  എന്നിവ തയ്യാറാക്കാം.
                </p>
              </div>

              <div className="usecase-card">
                <span>03</span>

                <h3>Worksheet</h3>

                <p>
                  Different difficulty levels ഉള്ള
                  worksheets create ചെയ്യാം.
                </p>
              </div>

              <div className="usecase-card">
                <span>04</span>

                <h3>Parent Message</h3>

                <p>
                  Professional parent communication
                  drafts തയ്യാറാക്കാം.
                </p>
              </div>

              <div className="usecase-card">
                <span>05</span>

                <h3>Presentation</h3>

                <p>
                  Classroom-ready slides വേഗത്തിൽ
                  തയ്യാറാക്കാം.
                </p>
              </div>

              <div className="usecase-card">
                <span>06</span>

                <h3>Concept Simplification</h3>

                <p>
                  Difficult concepts students-ന്
                  എളുപ്പത്തിൽ explain ചെയ്യാം.
                </p>
              </div>

            </div>

            <div className="section-cta-row">

              <button
                type="button"
                className="section-join-button"
                onClick={openEnrollment}
              >
                ഇപ്പോൾ Join ചെയ്യാം

                <ArrowRight size={18} />

              </button>

            </div>

          </div>

        </section>


        {/* =================================================
            SYLLABUS
        ================================================= */}

        <section
          className="section syllabus-section"
          id="syllabus"
        >

          <div className="container">

            <div className="section-heading">

              <span className="section-tag">
                COURSE SYLLABUS
              </span>

              <h2>
                7 Modules.
                <span> Practical AI Skills.</span>
              </h2>

              <p>
                ഒരു അധ്യാപകന് classroom-ലും daily work-ലും
                AI ഉപയോഗിക്കാൻ ആവശ്യമായ പ്രധാന skills.
              </p>

            </div>

            <div className="module-grid">

              {modules.map((module) => {

                const Icon = module.icon;

                return (
                  <article
                    className="module-card"
                    key={module.number}
                  >

                    <div className="module-top">

                      <div className="module-number">
                        {module.number}
                      </div>

                      <div className="module-icon">

                        <Icon size={23} />

                      </div>

                    </div>

                    <h3>
                      {module.title}
                    </h3>

                    <p className="module-subtitle">
                      {module.subtitle}
                    </p>

                  </article>
                );
              })}

            </div>


            {/* PRICE CARD */}

            <div className="modules-price-card">

              <div className="save-badge">
                SAVE ₹3,001
              </div>

              <span className="modules-price-label">
                AI FOR TEACHERS
              </span>

              <div className="modules-price-values">

                <del><h2>₹5,000</h2></del>

                <strong><h6>₹1,999</h6></strong>

              </div>

              <span className="modules-price-note">
                One-time payment • Course access
              </span>

              <button
                type="button"
                className="modules-price-button"
                onClick={openEnrollment}
              >
                ഇപ്പോൾ Join ചെയ്യാം

                <ArrowRight size={19} />

              </button>

              <div className="modules-price-features">

                <span>
                  <Check size={16} />
                  Teacher Focused
                </span>

                <span>
                  <Check size={16} />
                  Practical Learning
                </span>

                <span>
                  <Check size={16} />
                  Secure Payment
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            WORKFLOW
        ================================================= */}

        <section className="section workflow-section">

          <div className="container">

            <div className="section-heading">

              <span className="section-tag">
                HOW AI HELPS
              </span>

              <h2>
                AI Assists.
                <span> Teachers Lead.</span>
              </h2>

              <p>
                AI ഒരു assistant ആണ്. Teaching decision,
                verification, classroom application എന്നിവ
                teacher തന്നെ നിയന്ത്രിക്കും.
              </p>

            </div>

            <div className="workflow">

              <div className="workflow-step">

                <span>01</span>

                <h3>Teaching Need</h3>

                <p>
                  എന്താണ് വേണ്ടതെന്ന് തീരുമാനിക്കുക
                </p>

              </div>

              <ArrowRight className="workflow-arrow" />

              <div className="workflow-step">

                <span>02</span>

                <h3>Ask AI</h3>

                <p>
                  ശരിയായ prompt നൽകുക
                </p>

              </div>

              <ArrowRight className="workflow-arrow" />

              <div className="workflow-step">

                <span>03</span>

                <h3>Generate</h3>

                <p>
                  AI content തയ്യാറാക്കുന്നു
                </p>

              </div>

              <ArrowRight className="workflow-arrow" />

              <div className="workflow-step">

                <span>04</span>

                <h3>Verify</h3>

                <p>
                  Teacher content പരിശോധിക്കുന്നു
                </p>

              </div>

              <ArrowRight className="workflow-arrow" />

              <div className="workflow-step">

                <span>05</span>

                <h3>Classroom Ready</h3>

                <p>
                  Final resource classroom-ൽ ഉപയോഗിക്കുക
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            CREATIONS
        ================================================= */}

        <section className="section creations-section">

          <div className="container">

            <div className="section-heading">

              <span className="section-tag">
                WHAT YOU CAN CREATE
              </span>

              <h2>
                AI ഉപയോഗിച്ച്
                <span> എന്തൊക്കെ തയ്യാറാക്കാം?</span>
              </h2>

            </div>

            <div className="creation-grid">

              {creations.map((item, index) => (

                <div
                  className="creation-item"
                  key={index}
                >

                  <Check size={19} />

                  <span>
                    {item}
                  </span>

                </div>

              ))}

            </div>

            <div className="section-cta-row">

              <button
                type="button"
                className="section-join-button"
                onClick={openEnrollment}
              >
                ഇപ്പോൾ Join ചെയ്യാം

                <ArrowRight size={18} />

              </button>

            </div>

          </div>

        </section>


        {/* =================================================
            TOOLS
        ================================================= */}

        <section className="section tools-section">

          <div className="container narrow">

            <div className="section-heading">

              <span className="section-tag">
                AI TOOLS
              </span>

              <h2>
                Teachers ഉപയോഗിക്കുന്ന
                <span> പ്രധാന AI Tools</span>
              </h2>

            </div>

            <div className="tools">

              <div className="tool-card">

                <strong>ChatGPT</strong>

                <span>
                  AI Assistant
                </span>

              </div>

              <div className="tool-card">

                <strong>Canva</strong>

                <span>
                  Design & Presentations
                </span>

              </div>

              <div className="tool-card">

                <strong>Gamma</strong>

                <span>
                  AI Presentations
                </span>

              </div>

              <div className="tool-card">

                <strong>Google Tools</strong>

                <span>
                  Teacher Productivity
                </span>

              </div>

            </div>

            <div className="section-cta-row">

              <button
                type="button"
                className="section-join-button"
                onClick={openEnrollment}
              >
                ഇപ്പോൾ Join ചെയ്യാം

                <ArrowRight size={18} />

              </button>

            </div>

          </div>

        </section>


        {/* =================================================
            SAFE AI
        ================================================= */}

        <section className="section safe-section">

          <div className="container">

            <div className="safe-box">

              <div className="safe-icon">

                <ShieldCheck size={38} />

              </div>

              <div>

                <span className="section-tag">
                  SAFE & RESPONSIBLE AI
                </span>

                <h2>
                  AI ഉപയോഗിക്കുമ്പോൾ
                  <span> Safety ആദ്യം</span>
                </h2>

                <p>
                  AI-generated content verify ചെയ്യുക,
                  student data protect ചെയ്യുക, privacy പാലിക്കുക,
                  academic integrity നിലനിർത്തുക എന്നിവ course-ന്റെ
                  പ്രധാന ഭാഗമാണ്.
                </p>

                <div className="safe-list">

                  <span>
                    <Check size={16} />
                    Fact Checking
                  </span>

                  <span>
                    <Check size={16} />
                    Student Privacy
                  </span>

                  <span>
                    <Check size={16} />
                    Ethical Usage
                  </span>

                  <span>
                    <Check size={16} />
                    Academic Integrity
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

{/* ================= REVIEWS SECTION ================= */}
<section className="section reviews-section" id="reviews">
  <div className="container">

    <div className="section-heading">
      <div className="section-tag">TEACHER REVIEWS</div>

      <h2>
        അധ്യാപകർ <span>പറയുന്നു...</span>
      </h2>

      <p>
        AI പഠിച്ച ശേഷം teaching കൂടുതൽ എളുപ്പമായതിനെക്കുറിച്ച്
        ഞങ്ങളുടെ learners പറയുന്നത്
      </p>
    </div>

    <div className="reviews-grid">

      {/* Review 1 */}
      <div className="review-card">
        <div className="review-stars">
          ★★★★★
        </div>

        <p className="review-text">
          “Lesson Plan തയ്യാറാക്കാൻ എടുക്കുന്ന സമയം വളരെ കുറച്ചു.
          AI tools എങ്ങനെ practical ആയി ഉപയോഗിക്കാം എന്ന് ഈ course
          വഴി മനസ്സിലായി.”
        </p>

        <div className="review-user">
          <div className="review-avatar">A</div>

          <div>
            <h4>Anitha Teacher</h4>
            <span>School Teacher</span>
          </div>
        </div>
      </div>

      {/* Review 2 */}
      <div className="review-card">
        <div className="review-stars">
          ★★★★★
        </div>

        <p className="review-text">
          “Question papers, worksheets, presentations എന്നിവ
          തയ്യാറാക്കുന്നത് ഇപ്പോൾ വളരെ എളുപ്പമായി. Beginners-നും
          മനസ്സിലാകുന്ന രീതിയിലാണ് course.”
        </p>

        <div className="review-user">
          <div className="review-avatar">R</div>

          <div>
            <h4>Rashid Teacher</h4>
            <span>Higher Secondary Teacher</span>
          </div>
        </div>
      </div>

      {/* Review 3 */}
      <div className="review-card">
        <div className="review-stars">
          ★★★★★
        </div>

        <p className="review-text">
          “AI-യെക്കുറിച്ച് മുമ്പ് വലിയ knowledge ഇല്ലായിരുന്നു.
          Course complete ചെയ്ത ശേഷം daily teaching tasks-ൽ
          AI ഉപയോഗിക്കാൻ confidence കിട്ടി.”
        </p>

        <div className="review-user">
          <div className="review-avatar">S</div>

          <div>
            <h4>Shahana Teacher</h4>
            <span>Primary School Teacher</span>
          </div>
        </div>
      </div>

      {/* Review 4 */}
      <div className="review-card">
        <div className="review-stars">
          ★★★★★
        </div>

        <p className="review-text">
          “Presentations and teaching materials തയ്യാറാക്കുന്നതിൽ
          AI tools വളരെ helpful ആണെന്ന് ഈ course വഴി പഠിച്ചു.
          വളരെ practical ആയ learning experience.”
        </p>

        <div className="review-user">
          <div className="review-avatar">N</div>

          <div>
            <h4>Naseema Teacher</h4>
            <span>High School Teacher</span>
          </div>
        </div>
      </div>

      {/* Review 5 */}
      <div className="review-card">
        <div className="review-stars">
          ★★★★★
        </div>

        <p className="review-text">
          “Teaching-നൊപ്പം technology എങ്ങനെ smart ആയി use ചെയ്യാം
          എന്നത് വളരെ simple ആയി explain ചെയ്തിട്ടുണ്ട്.
          Especially the practical sessions were useful.”
        </p>

        <div className="review-user">
          <div className="review-avatar">F</div>

          <div>
            <h4>Fathima Teacher</h4>
            <span>Government School Teacher</span>
          </div>
        </div>
      </div>

      {/* Review 6 */}
      <div className="review-card">
        <div className="review-stars">
          ★★★★★
        </div>

        <p className="review-text">
          “AI tools പഠിക്കണമെന്ന് ആഗ്രഹിച്ചിരുന്നെങ്കിലും എവിടെ
          തുടങ്ങണം എന്ന് അറിയില്ലായിരുന്നു. ഈ course ഒരു നല്ല
          starting point ആയി.”
        </p>

        <div className="review-user">
          <div className="review-avatar">M</div>

          <div>
            <h4>Meera Teacher</h4>
            <span>Private School Teacher</span>
          </div>
        </div>
      </div>

    </div>

    {/* Review CTA */}
    <div className="section-cta-row">
      <button
        className="section-join-button"
        onClick={openEnrollment}
      >
        ഇപ്പോൾ Join ചെയ്യാം →
      </button>
    </div>

  </div>
</section>
        {/* =================================================
            FAQ
        ================================================= */}

        <section className="section faq-section">

          <div className="container faq-container">

            <div className="section-heading">

              <span className="section-tag">
                FAQ
              </span>

              <h2>
                Frequently Asked
                <span> Questions</span>
              </h2>

            </div>

            <div className="faq-list">

              {faqs.map((faq, index) => {

                const isOpen = openFaq === index;

                return (

                  <div
                    className={`faq-item ${isOpen ? "active" : ""
                      }`}
                    key={index}
                  >

                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(
                          isOpen ? null : index
                        )
                      }
                    >

                      <span>
                        {faq.question}
                      </span>

                      <ChevronDown
                        size={20}
                        className={
                          isOpen ? "rotate" : ""
                        }
                      />

                    </button>

                    {isOpen && (
                      <div className="faq-answer">
                        {faq.answer}
                      </div>
                    )}

                  </div>

                );
              })}

            </div>

          </div>

        </section>

{/* ========================= ============================
                ENROLLEMENT FLOW
============================================= */}
        <EnrollmentFlow
          onEnroll={openEnrollment}
          whatsappUrl={whatsappUrl}
        />

        {/* =================================================
            FINAL CTA
        ================================================= */}

        <section className="final-cta">

          <div className="container">

            <h2>
              ഇനി AI നിങ്ങളെ സഹായിക്കട്ടെ.
              <br />

              <span>
                Teaching കൂടുതൽ Smart ആക്കാം.
              </span>

            </h2>

            <p>
              Practical AI skills പഠിച്ച് നിങ്ങളുടെ daily
              teaching work കൂടുതൽ എളുപ്പമാക്കൂ.
            </p>

            <div className="final-offer-box">

              <div className="save-badge">
                SAVE ₹3,001
              </div>

              <div className="final-offer-price">

                <del><h2>₹5,000</h2></del>

                <strong><h6>₹1,999</h6></strong>

              </div>

              <span className="final-offer-note">
                One-time payment • Course access
              </span>

              <button
                type="button"
                className="final-offer-button"
                onClick={openEnrollment}
              >
                ഇപ്പോൾ Join ചെയ്യാം

                <ArrowRight size={19} />

              </button>

            </div>

          </div>

        </section>


        {/* =================================================
            FOOTER INTRO
        ================================================= */}

        <section className="footer-intro">

          <div className="container">

            <h2>
              Created by QNAYDS Academy
            </h2>

            <p>
              Helping teachers build practical AI skills
              for smarter teaching and better productivity.
            </p>

          </div>

        </section>


        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="footer">

          <div className="container footer-content">

            <div className="footer-logo-area"></div>

            <div className="footer-help">

              <strong>
                Need Help?
              </strong>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >

                <FaWhatsapp size={21} />

                WhatsApp Us

              </a>

            </div>

            <p className="copyright">
              © 2026 QNAYDS ACADEMY.
              All rights reserved.
            </p>

            <div className="footer-links">

              <a href="#terms">
                Terms & Conditions
              </a>

              <a href="#privacy">
                Privacy Policy
              </a>

              <a href="#refund">
                Refund Policy
              </a>

              <a href="#contact">
                Contact
              </a>

            </div>

            <p className="footer-notice">
              This is a digital recorded course with instant access.
              Once access is provided, refunds cannot be issued.
              If you have any questions, please contact us on WhatsApp
              before enrolling.
            </p>

          </div>

        </footer>


        {/* =================================================
            FLOATING WHATSAPP
        ================================================= */}

        <FloatingWhatsApp />

        {/* Scroll down to reveal this; scroll up to hide it. */}
        <FloatingEnrollmentButton
          isVisible={showFloatingEnrollment && !showModal}
          onEnroll={openEnrollment}
          offerHours={offerHours}
          offerMinutes={offerMinutes}
          offerSeconds={offerSeconds}
        />


        {/* =================================================
            JOIN MODAL
        ================================================= */}

        {showModal && (

          <div
            className="modal-overlay"
            onClick={() => setShowModal(false)}
          >

            <div
              className="join-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="enrollment-header">

                <div>

                  <h2>
                    Complete Your Enrollment
                  </h2>

                  <p>
                    Enter your details to continue securely.
                  </p>

                </div>

                <button
                  type="button"
                  className="modal-close"
                  onClick={() =>
                    setShowModal(false)
                  }
                  aria-label="Close"
                >

                  <X size={22} />

                </button>

              </div>


              <div className="enrollment-body">

                <div className="enrollment-offer">

                  <div className="offer-course-name">
                    AI for Teachers
                  </div>

                  <div className="offer-price-row">

                    <div className="offer-prices">

                      <span className="offer-original-price">
                        <h2>₹5,000</h2>
                      </span>

                      <span className="offer-current-price">
                        <h6>₹1,999</h6>
                      </span>

                      <span className="offer-label">
                        LIMITED-TIME OFFER
                      </span>

                    </div>

                    <span className="offer-saving">
                      Save ₹3,001
                    </span>

                  </div>

                </div>


                {!paymentStarted ? (

                  <form
                    className="enrollment-form"
                    onSubmit={handleContinuePayment}
                  >

                    {paymentError && (

                      <p
                        className="payment-error"
                        role="alert"
                      >
                        {paymentError}
                      </p>

                    )}


                    <label>

                      Full Name

                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={
                          handleEnrollmentChange
                        }
                        placeholder="Enter your full name"
                        required
                      />

                    </label>


                    <label>

                      Phone Number

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={
                          handleEnrollmentChange
                        }
                        placeholder="Enter your phone number"
                        required
                      />

                    </label>


                    <label>

                      Email

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={
                          handleEnrollmentChange
                        }
                        placeholder="Enter your email"
                        required
                      />

                    </label>


                    <div className="enrollment-actions">

                      <button
                        type="submit"
                        className="payment-button"
                      >

                        Continue to Payment

                        <ArrowRight size={18} />

                      </button>


                      <button
                        type="button"
                        className="payment-button"
                        onClick={() =>
                          setShowModal(false)
                        }
                      >
                        Cancel
                      </button>

                    </div>

                  </form>

                ) : (

                  <div className="payment-ready">

                    <Clock size={42} />

                    <h3>
                      Opening secure checkout...
                    </h3>

                    <p>
                      Please wait while Razorpay opens.
                      Your payment details are entered
                      securely in the checkout window.
                    </p>

                    <button
                      type="button"
                      className="payment-button"
                      onClick={() =>
                        setPaymentStarted(false)
                      }
                    >
                      Cancel
                    </button>

                  </div>

                )}

              </div>

            </div>

          </div>

        )}

      </div>
    </>
  );
}

export default App;