import React, { useEffect, useRef, useState } from "react";
import logo from "./assets/QNAYDS_LOGO.png";
import teacherVideo from "./assets/Teacher using ai.mp4";
import teacherThumbnail from "./assets/thumbnail.webp";
import mentorImage from "./assets/mentor_image.webp";

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
import PaymentSuccess from "./pages/PaymentSuccess";
import "./pages/PaymentSuccess.css";

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

const trackMetaEvent = (eventName, params = {}) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, params);
  }
};

/* =====================================================
   PAYMENT
===================================================== */

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
        <FaWhatsapp className="whatsapp-icon" />
      </a>
    </div>
  );
};

/* =====================================================
   SCROLL ENROLLMENT BUTTON
   Appears while scrolling down and hides before footer.
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
      className={`floating-enrollment-button ${isVisible ? "is-visible " : ""}`}
      onClick={onEnroll}
      aria-label="₹1,999-ന് ഇപ്പോൾ ചേരൂ"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <div className="floating-enrollment-copy">
        <div className="floating-enrollment-main">
          <h6>അധ്യാപകർക്കുള്ള AI കോഴ്സ്</h6>

          <p>
            <del>
              <h2>₹5,000</h2>
            </del>
            <strong>
              <h6>₹1,999</h6>
            </strong>
            <span className="text-white">ഇപ്പോൾ ചേരൂ</span>
          </p>
        </div>

        <div className="floating-enrollment-urgency">
          <span>
            <Clock size={13} />
            പരിമിതകാല ഓഫർ
          </span>
          <small>
            ഓഫർ അവസാനിക്കാൻ: {offerHours}:{offerMinutes}:{offerSeconds}
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
    title: "ഡിജിറ്റൽ & AI അടിസ്ഥാനങ്ങൾ",
    subtitle: "കമ്പ്യൂട്ടറും AI-യും ക്ലാസ്റൂമിൽ",
    icon: Brain,
  },
  {
    number: "02",
    title: "AI ടൂളുകൾ ഉപയോഗിച്ച് തുടങ്ങാം",
    subtitle: "ChatGPT, Canva, Gamma തുടക്കം",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "ടീച്ചിംഗ് മാനുവലുകളും ലെസൺ പ്ലാനുകളും തയ്യാറാക്കാം",
    subtitle: "ഘടനാപരമായ പാഠ്യപദ്ധതി തയ്യാറാക്കൽ",
    icon: BookOpen,
  },
  {
    number: "04",
    title: "ചോദ്യപേപ്പറുകൾ എളുപ്പത്തിൽ തയ്യാറാക്കാം",
    subtitle: "MCQ-കളും ഉത്തരസൂചികകളും",
    icon: ClipboardList,
  },
  {
    number: "05",
    title: "പ്രസന്റേഷനുകൾ വേഗത്തിൽ ഉണ്ടാക്കാം",
    subtitle: "സ്മാർട്ട് സ്ലൈഡുകളും വിഷ്വലുകളും",
    icon: Presentation,
  },
  {
    number: "06",
    title: "ദൈനംദിന അധ്യാപന ജോലികൾക്ക് AI",
    subtitle: "വർക്ക്ഷീറ്റുകൾ & രക്ഷിതാക്കൾക്കുള്ള സന്ദേശങ്ങൾ",
    icon: FileText,
  },
  {
    number: "07",
    title: "സുരക്ഷിതവും ഉത്തരവാദിത്തമുള്ളതുമായ AI ഉപയോഗം",
    subtitle: "സ്വകാര്യതയും ധാർമ്മിക ഉപയോഗവും",
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
    question: "1. ഈ കോഴ്സ് ആർക്കൊക്കെ പഠിക്കാം?",
    answer:
      "സ്കൂൾ, കോളേജ് അധ്യാപകർ, ട്യൂഷൻ അധ്യാപകർ, ട്രെയിനർമാർ, അധ്യാപന രംഗത്ത് പ്രവർത്തിക്കുന്ന എല്ലാവർക്കും ഈ കോഴ്സ് പ്രയോജനപ്പെടും.",
  },
  {
    question: "2. AI പഠിക്കാൻ കോഡിംഗ് അറിയണമോ?",
    answer:
      "ഒട്ടും ആവശ്യമില്ല. സാധാരണ മലയാളത്തിൽ, തുടക്കക്കാർക്ക് പോലും എളുപ്പത്തിൽ മനസ്സിലാകുന്ന രീതിയിലാണ് ക്ലാസുകൾ.",
  },
  {
    question: "3. കോഴ്സിൽ ഏതെല്ലാം ടൂളുകൾ പഠിക്കും?",
    answer:
      "ChatGPT, Canva, Gamma, Google Tools തുടങ്ങിയ പ്രമുഖ അധ്യാപക പ്രൊഡക്റ്റിവിറ്റി AI ടൂളുകൾ practical ആയി ഉപയോഗിക്കാൻ പഠിക്കും.",
  },
  {
    question: "4. ലാപ്‌ടോപ്പ് നിർബന്ധമാണോ, അതോ ഫോണിൽ പഠിക്കാമോ?",
    answer:
      "അല്ല, ലാപ്ടോപ്പ് നിർബന്ധമില്ല. മൊബൈൽ ഫോൺ, ടാബ്‌ലെറ്റ്, ലാപ്ടോപ്പ് എന്നിവയിൽ ഏതിലും എളുപ്പത്തിൽ ക്ലാസുകൾ കാണാം.",
  },
  {
    question: "5. കോഴ്സിൽ എന്തെല്ലാം ലഭിക്കും?",
    answer:
      "7 പ്രാക്ടിക്കൽ മൊഡ്യൂളുകൾ, ലെസൺ പ്ലാൻ & ചോദ്യപേപ്പർ മാതൃകകൾ, ലൈഫ് ടൈം ആക്സസ്, കോഴ്സ് സർട്ടിഫിക്കറ്റ്, സംശയങ്ങൾക്ക് WhatsApp സപ്പോർട്ട് എന്നിവ ലഭിക്കും.",
  },
  {
    question: "ക്ലാസുകൾ ലൈവ് ആണോ, റെക്കോർഡ് ചെയ്തതാണോ?",
    answer:
      "റെക്കോർഡ് ചെയ്ത ഹൈ-ക്വാളിറ്റി ക്ലാസുകളാണ്. നിങ്ങളുടെ സൗകര്യപ്രദമായ ഏത് സമയത്തും സ്വന്തം വേഗതയിൽ ഫോണിലോ ലാപ്ടോപ്പിലോ കണ്ടുപഠിക്കാം.",
  },
  {
    question: "കോഴ്സ് എത്ര മണിക്കൂർ ഉണ്ട്?",
    answer:
      "ആകെ 6+ മണിക്കൂർ ദൈർഘ്യമുള്ള സമഗ്രവും പ്രായോഗികവുമായ ക്ലാസുകളാണ് കോഴ്സിലുള്ളത്.",
  },
  {
    question: "ആക്സസ് എത്ര കാലം ലഭിക്കും?",
    answer:
      "ലൈഫ് ടൈം ആക്സസ് (Life-time Access) ലഭ്യമാണ്. ഭാവിയിലും ക്ലാസുകൾ എപ്പോൾ വേണമെങ്കിലും വീണ്ടും കാണാവുന്നതാണ്.",
  },
  {
    question: "സർട്ടിഫിക്കറ്റ് ലഭിക്കുമോ?",
    answer:
      "അതെ, കോഴ്സ് വിജയകരമായി പൂർത്തിയാക്കുമ്പോൾ QNAYDS അക്കാദമിയുടെ വെരിഫൈഡ് കോഴ്സ് സർട്ടിഫിക്കറ്റ് ലഭിക്കും.",
  },
  {
    question: "AI ടൂളുകൾ സൗജന്യമാണോ?",
    answer:
      "അതെ, ChatGPT, Canva, Gamma, Google Tools തുടങ്ങിയവയുടെ സൗജന്യ (Free) വേർഷനുകൾ തന്നെയാണ് പഠിപ്പിക്കുന്നത്. അധിക ചിലവുകളൊന്നും വരുന്നില്ല.",
  },
  {
    question: "റീഫണ്ട് ലഭിക്കുമോ?",
    answer:
      "ഇത് ഇൻസ്റ്റന്റ് ആക്സസ് ലഭിക്കുന്ന ഡിജിറ്റൽ റെക്കോർഡ് കോഴ്സ് ആയതിനാൽ ആക്സസ് നൽകിയ ശേഷം റീഫണ്ട് നൽകുന്നതല്ല. ചേരുന്നതിന് മുമ്പ് എന്തെങ്കിലും സംശയങ്ങൾ ഉണ്ടെങ്കിൽ WhatsApp വഴി ചോദിക്കാവുന്നതാണ്.",
  },
];

/* =====================================================
   APP
===================================================== */

function App() {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeSample, setActiveSample] = useState("lesson");
  const hasTrackedViewContent = useRef(false);

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
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (hasTrackedViewContent.current) {
      return;
    }

    hasTrackedViewContent.current = true;

    trackMetaEvent("ViewContent", {
      content_name: "AI for Teachers Course",
      content_category: "Education",
      content_ids: [courseId],
      content_type: "product",
    });
  }, []);

  useEffect(() => {
    const updateOfferTime = () => {
      setOfferTimeLeft(Math.max(0, offerEndsAt - Date.now()));
    };

    updateOfferTime();

    const timer = window.setInterval(updateOfferTime, 1000);

    return () => window.clearInterval(timer);
  }, [offerEndsAt]);

  const totalOfferSeconds = Math.floor(offerTimeLeft / 1000);
  const offerHours = String(Math.floor(totalOfferSeconds / 3600)).padStart(
    2,
    "0",
  );
  const offerMinutes = String(
    Math.floor((totalOfferSeconds % 3600) / 60),
  ).padStart(2, "0");
  const offerSeconds = String(totalOfferSeconds % 60).padStart(2, "0");

  /* =====================================================
     SCROLL-AWARE ENROLLMENT CTA
  ===================================================== */

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const distanceFromBottom = documentHeight - (currentScrollY + windowHeight);

      if (currentScrollY < 180 || distanceFromBottom < 380) {
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

    trackMetaEvent("Lead", {
      content_name: "AI for Teachers Course",
      content_category: "Education",
      content_ids: [courseId],
      content_type: "product",
    });

    setPaymentError("");

    setPaymentStarted(true);

    try {
      if (!razorpayKeyId) {
        throw new Error(
          "Payment is not configured yet. Please try again later.",
        );
      }

      if (!apiUrl || !courseId) {
        throw new Error(
          "Unable to create your payment order. Please try again.",
        );
      }

      let orderData;

      try {
        const orderResponse = await fetch(`${apiUrl}/landing/create-order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.fullName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            courseId,
          }),
        });

        if (!orderResponse.ok) {
          throw new Error(
            "Unable to create your payment order. Please try again.",
          );
        }

        const responseBody = await orderResponse.json();
        orderData = responseBody.data;

        if (!orderData?.order || !orderData?.student || !orderData?.course) {
          throw new Error(
            "Unable to create your payment order. Please try again.",
          );
        }
      } catch (error) {
        throw new Error(
          error.message ===
            "Unable to create your payment order. Please try again."
            ? error.message
            : "Unable to create your payment order. Please try again.",
        );
      }

      await loadRazorpay();

      const checkout = new window.Razorpay({
        key: razorpayKeyId,
        amount: orderData.order.amount,
        currency: orderData.order.currency,

        name: "QNAYDS Academy",

        description: orderData.course.title,
        order_id: orderData.order.id,

        prefill: {
          name: orderData.student.name,
          email: orderData.student.email,
          contact: formData.phone.trim(),
        },

        notes: {
          course: "AI for Teachers",
          course_id: courseId,
        },

        theme: {
          color: "#108dcc",
        },

        handler: async (response) => {
          try {
            const verificationResponse = await fetch(
              `${apiUrl}/payments/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              },
            );

            if (!verificationResponse.ok) {
              throw new Error(
                "Payment verification failed. Please contact support.",
              );
            }

            trackMetaEvent("Purchase", {
              content_name: "AI for Teachers Course",
              content_category: "Education",
              content_ids: [courseId],
              content_type: "product",
              value: orderData.order.amount / 100,
              currency: orderData.order.currency || "INR",
              transaction_id: response.razorpay_payment_id,
            });

            setPaymentStarted(false);
            setShowModal(false);
            setPaymentSuccess(true);
          } catch (error) {
            setPaymentStarted(false);
            setPaymentError(
              "Payment verification failed. Please contact support.",
            );
          }
        },

        modal: {
          ondismiss: () => setPaymentStarted(false),
        },
      });

      checkout.on("payment.failed", (response) => {
        setPaymentStarted(false);

        setPaymentError(
          response.error?.description || "Payment failed. Please try again.",
        );
      });

      trackMetaEvent("InitiateCheckout", {
        content_name: "AI for Teachers Course",
        content_category: "Education",
        content_ids: [courseId],
        content_type: "product",
        value: orderData.order.amount / 100,
        currency: orderData.order.currency || "INR",
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
    setPaymentSuccess(false);

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
           HERO REFINEMENTS & SLIM BANNER
        ===================================================== */

        .hero-slim-banner {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 999px;
          background: #eaf7fd;
          border: 1px solid #cde7f7;
          color: #087ab3;
          font-size: 14px;
          font-weight: 700;
          margin: 0 auto 20px;
        }

        .hero-slim-banner svg {
          color: #087ab3;
        }

        .banner-dot, .facts-dot {
          opacity: 0.5;
        }

        .hero-slim-banner .banner-timer {
          font-family: 'Inter', monospace;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: #0d172d;
          background: #ffffff;
          padding: 2px 8px;
          border-radius: 6px;
          border: 1px solid #d6e8f5;
        }

        .hero-title-main {
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
          color: var(--navy);
          font-family: "Manjari", "Noto Sans Malayalam", sans-serif;
          font-size: clamp(30px, 4vw, 50px);
          line-height: 1.35;
          font-weight: 700;
          letter-spacing: -0.3px;
          text-align: center;
        }

        .hero-title-main span {
          color: var(--navy);
          display: inline;
        }

        .hero-title-main small {
          display: block;
          margin-top: 10px;
          color: var(--blue);
          font-size: clamp(23px, 3.1vw, 36px);
          font-weight: 800;
        }

        .hero-cta-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          margin-top: 28px;
        }

        .hero-main-button {
          min-width: 270px;
          padding: 16px 36px;
          font-size: 18px;
          font-weight: 800;
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 12px;
          background: var(--blue);
          color: #fff;
          border: none;
          box-shadow: 0 12px 28px rgba(16, 141, 204, 0.28);
          transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }

        .hero-main-button:hover {
          background: var(--blue-dark);
          transform: translateY(-2px);
          box-shadow: 0 16px 32px rgba(16, 141, 204, 0.35);
        }

        .hero-facts-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          font-size: 14px;
          font-weight: 600;
          color: #49637b;
        }

        .video-presenter-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
          font-size: 14px;
          color: #526a82;
        }

        .video-presenter-badge strong {
          color: #0d172d;
        }

        .video-presenter-badge svg {
          color: var(--blue);
        }

        /* =====================================================
           PRICE CARD INCLUDES & REFUND
        ===================================================== */

        .price-card-includes {
          margin: 22px 0;
          padding: 18px 22px;
          background: #f7fbfe;
          border: 1px solid #ddecfa;
          border-radius: 14px;
          text-align: left;
        }

        .price-card-includes-title {
          margin-bottom: 12px;
          font-size: 15px;
          font-weight: 800;
          color: #0d172d;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .price-card-includes-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .price-card-includes-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14.5px;
          line-height: 1.5;
          color: #203b59;
        }

        .price-card-includes-list li svg {
          color: var(--blue);
          flex-shrink: 0;
          margin-top: 3px;
        }

        .price-card-refund {
          margin-top: 18px;
          padding: 12px 18px;
          background: #f0f7fd;
          border-radius: 10px;
          font-size: 13.5px;
          line-height: 1.55;
          color: #3b5773;
          text-align: center;
        }

        .price-card-refund strong {
          color: var(--navy);
        }

        .price-card-refund a {
          color: var(--blue);
          font-weight: 700;
          text-decoration: underline;
        }

        .creation-extra-chips {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 32px;
        }

        .creation-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 999px;
          background: #f0f7fd;
          border: 1px solid #d8e9f5;
          color: #203b59;
          font-size: 13.5px;
          font-weight: 600;
        }

        .creation-chip svg {
          color: var(--blue);
        }

        .tools-note {
          text-align: center;
          margin-top: 24px;
          font-size: 14.5px;
          color: #526a82;
          background: #f7fbfe;
          border: 1px solid #e1effa;
          padding: 10px 18px;
          border-radius: 10px;
          display: inline-block;
        }

        /* =====================================================
           AI SAMPLE SHOWCASE (Task 4 - Section C: Real Sample made with AI)
        ===================================================== */

        .ai-sample-showcase {
          margin-top: 45px;
          background: #ffffff;
          border: 1.5px solid #cfe0f4;
          border-radius: 18px;
          padding: 30px;
          box-shadow: 0 12px 30px rgba(16, 141, 204, 0.08);
          text-align: left;
        }

        .ai-sample-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .ai-sample-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 50px;
          background: #eaf7fd;
          color: var(--blue-dark);
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .ai-sample-header h3 {
          font-size: clamp(20px, 2.5vw, 26px);
          color: var(--navy);
          font-weight: 800;
          margin-bottom: 8px;
        }

        .ai-sample-header p {
          color: var(--muted);
          font-size: 15px;
          max-width: 600px;
          margin: 0 auto;
        }

        .ai-sample-tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 18px;
          flex-wrap: wrap;
        }

        .ai-sample-tab {
          padding: 10px 20px;
          border-radius: 10px;
          border: 1.5px solid #dce8f0;
          background: #f8fbfe;
          color: #3b5773;
          font-size: 14.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ai-sample-tab.active {
          background: var(--blue);
          color: #fff;
          border-color: var(--blue);
          box-shadow: 0 4px 14px rgba(16, 141, 204, 0.25);
        }

        .ai-sample-content {
          background: #fdfefe;
          border: 1px solid #e2eff8;
          border-radius: 14px;
          padding: 24px;
        }

        .ai-sample-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 24px;
          padding-bottom: 16px;
          margin-bottom: 18px;
          border-bottom: 1px solid #eef4f9;
          font-size: 14px;
          color: #435b75;
        }

        .ai-sample-body h4 {
          font-size: 15.5px;
          color: var(--navy);
          font-weight: 800;
          margin: 16px 0 8px;
        }

        .ai-sample-body ul {
          margin: 0 0 16px 20px;
          color: #2e4761;
          font-size: 14.5px;
          line-height: 1.6;
        }

        .ai-sample-step {
          background: #f6fafe;
          border-left: 3px solid var(--blue);
          padding: 10px 14px;
          margin-bottom: 8px;
          border-radius: 0 8px 8px 0;
          font-size: 14px;
          color: #203b59;
          line-height: 1.55;
        }

        .sample-answer {
          display: block;
          margin-top: 6px;
          padding: 6px 12px;
          background: #eafaf1;
          color: #1a7f47;
          border-radius: 6px;
          font-size: 13.5px;
          font-weight: 600;
        }

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

          /* FIRST SCREEN MOBILE OPTIMIZATION (Section 2: Fits on phone without scrolling) */
          .hero {
            padding: 30px 0 35px !important;
            min-height: auto !important;
          }

          .modal-logo {
            width: 88px !important;
            margin: 0 auto 10px !important;
          }

          .hero-slim-banner {
            font-size: 12px;
            padding: 5px 12px;
            margin: 0 auto 12px;
            gap: 5px;
          }

          .hero-slim-banner .banner-timer {
            padding: 2px 6px;
            font-size: 12px;
          }

          .hero-badge {
            font-size: 11.5px !important;
            padding: 5px 12px !important;
            margin-bottom: 12px !important;
          }

          .hero-title-main {
            font-size: 23px !important;
            line-height: 1.32 !important;
          }

          .hero-title-main small {
            font-size: 18px !important;
            margin-top: 6px !important;
          }

          .hero-description {
            font-size: 13.5px !important;
            line-height: 1.5 !important;
            margin: 10px auto 0 !important;
          }

          .hero-cta-container {
            margin-top: 16px !important;
            gap: 8px !important;
          }

          .hero-main-button {
            width: 100% !important;
            max-width: 310px !important;
            padding: 13px 20px !important;
            font-size: 16px !important;
          }

          .hero-facts-line {
            font-size: 12px !important;
            gap: 5px !important;
          }

          .hero-stats {
            margin: 18px auto 0 !important;
          }

          .hero-stats div {
            min-width: unset !important;
            padding: 8px 12px !important;
          }

          .hero-stats strong {
            font-size: 17px !important;
          }

          .hero-stats span {
            font-size: 10.5px !important;
          }

          /* VIDEO MOBILE GAP FIX */

          .video-section-tight {
            padding-top: 35px !important;
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
            1. HERO (HEADLINE + BUTTON + FACTS + STATS)
        ================================================= */}

        <section className="hero">
          <div className="hero-glow glow-one"></div>
          <div className="hero-glow glow-two"></div>

          <div className="container hero-content">
            <div className="modal-logo-wrapper">
              <img src={logo} alt="QNAYDS" className="modal-logo" />
            </div>

            <div className="hero-slim-banner" aria-live="polite">
              <Clock size={15} />
              <span>പരിമിതകാല ഓഫർ</span>
              <span className="banner-dot">•</span>
              <span>ഓഫർ അവസാനിക്കാൻ ബാക്കി:</span>
              <strong className="banner-timer">
                {offerHours}:{offerMinutes}:{offerSeconds}
              </strong>
            </div>

            <div className="hero-badge">
              <Sparkles size={16} />
              അധ്യാപകർക്കായി പ്രത്യേകമായി തയ്യാറാക്കിയത്
            </div>

            <h1 className="hero-title-main">
              <span>AI ഉപയോഗിച്ച് സ്മാർട്ട് ടീച്ചർ ആകാൻ ആഗ്രഹമുണ്ടോ?</span>
              <small>എവിടെ തുടങ്ങണം എന്നറിയില്ലേ?</small>
            </h1>

            <p className="hero-description">
              ലെസൺ പ്ലാൻ മുതൽ ചോദ്യപേപ്പർ വരെ —{" "}
              <strong>
                AI ഉപയോഗിച്ച് നിങ്ങളുടെ അധ്യാപന ഒരുക്കം എളുപ്പമാക്കാൻ പഠിക്കാം.
              </strong>
            </p>

            <div className="hero-cta-container">
              <button
                type="button"
                className="hero-main-button"
                onClick={openEnrollment}
              >
                <span>₹1,999-ന് ഇപ്പോൾ ചേരൂ</span>
                <ArrowRight size={18} />
              </button>

              <div className="hero-facts-line">
                <span>റെക്കോർഡ് ചെയ്ത ക്ലാസുകൾ</span>
                <span className="facts-dot">•</span>
                <span>6+ മണിക്കൂർ</span>
                <span className="facts-dot">•</span>
                <span>ലൈഫ് ടൈം ആക്സസ്</span>
                <span className="facts-dot">•</span>
                <span>സർട്ടിഫിക്കറ്റ്</span>
              </div>
            </div>

            <div className="hero-stats">
              <div>
                <strong>07</strong>
                <span>മൊഡ്യൂളുകൾ</span>
              </div>

              <div>
                <strong>AI</strong>
                <span>പ്രായോഗിക പരിശീലനം</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>അധ്യാപകർക്കായി മാത്രം</span>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            2. VIDEO (WATCH BEFORE YOU ENROLL)
        ================================================= */}

        <section className="section video-section video-section-tight">
          <div className="container narrow">
            <div className="section-heading">
              <span className="section-tag">വീഡിയോ കാണൂ</span>

              <h2>
                ചേരുന്നതിന് മുമ്പ് <span>ഈ വീഡിയോ കാണൂ</span>
              </h2>

              <p>
                ഈ കോഴ്സ് നിങ്ങൾക്ക് എങ്ങനെ ഉപകാരപ്പെടും? ചേരുന്നതിന് മുമ്പ്
                കോഴ്സിനെക്കുറിച്ച് ഒരു ചെറിയ പരിചയം കാണാം.
              </p>
            </div>

            <div className="course-video">
              <video
                controls
                playsInline
                preload="metadata"
                poster={teacherThumbnail}
              >
                <source src={teacherVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="video-presenter-badge">
              <Users size={16} />
              <span>
                വീഡിയോ അവതാരകൻ: <strong>മുഹമ്മദ് നിഷാദ്</strong> (AI ഇൻസ്ട്രക്ടർ & എഡ്ടെക് ട്രെയിനർ)
              </span>
            </div>
          </div>
        </section>

        {/* =================================================
            3. PRICE CARD (FACTS + WHAT YOU GET + REFUND LINE)
        ================================================= */}

        <div className="hero-offer-box" id="pricing">
          <div className="save-badge">₹3,001 ലാഭം</div>

          <span className="hero-offer-label">കോഴ്സ് ഫീസ് (പരിമിതകാല ഓഫർ)</span>

          <div className="hero-offer-price">
            <del style={{ fontSize: "28px", fontWeight: "700" }}>₹5,000</del>

            <strong style={{ fontSize: "42px", fontWeight: "900" }}>
              ₹1,999
            </strong>
          </div>

          <span className="hero-offer-note">
            ഒറ്റത്തവണ പേയ്മെന്റ് • ₹3,001 ലാഭം
          </span>

          <div className="price-card-includes">
            <div className="price-card-includes-title">
              <Sparkles size={16} style={{ color: "var(--blue)" }} />
              <span>ഈ കോഴ്സിൽ നിങ്ങൾക്ക് കിട്ടുന്നത്:</span>
            </div>
            <ul className="price-card-includes-list">
              <li>
                <Check size={16} />
                <span>
                  <strong>7 മൊഡ്യൂളുകൾ:</strong> AI അടിസ്ഥാനങ്ങൾ മുതൽ സുരക്ഷിത AI ഉപയോഗം വരെ
                </span>
              </li>
              <li>
                <Check size={16} />
                <span>
                  <strong>പ്രായോഗിക നിർമ്മിതികൾ:</strong> ലെസൺ പ്ലാൻ, ചോദ്യപേപ്പർ, വർക്ക്ഷീറ്റ്, പ്രസന്റേഷൻ എന്നിവ തയ്യാറാക്കാൻ പഠിക്കാം
                </span>
              </li>
              <li>
                <Check size={16} />
                <span>
                  <strong>ക്ലാസ് രീതി:</strong> റെക്കോർഡ് ചെയ്ത ക്ലാസുകൾ • ആകെ 6+ മണിക്കൂർ • ലൈഫ് ടൈം ആക്സസ്
                </span>
              </li>
              <li>
                <Check size={16} />
                <span>
                  <strong>സർട്ടിഫിക്കറ്റും സപ്പോർട്ടും:</strong> കോഴ്സ് സർട്ടിഫിക്കറ്റ് • WhatsApp സപ്പോർട്ട്
                </span>
              </li>
            </ul>
          </div>

          <div className="hero-offer-actions">
            <button
              type="button"
              className="primary-button"
              onClick={openEnrollment}
            >
              <span>₹1,999-ന് ഇപ്പോൾ ചേരൂ</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={scrollToSyllabus}
            >
              സിലബസ് കാണാം
            </button>
          </div>

          <div className="hero-offer-checks">
            <span>
              <Check size={17} />
              അധ്യാപകർക്കായി
            </span>

            <span>
              <Check size={17} />
              പ്രായോഗിക പഠനം
            </span>

            <span>
              <Check size={17} />
              സുരക്ഷിത പേയ്മെന്റ്
            </span>
          </div>

          <div className="price-card-refund">
            <strong>റീഫണ്ട് നയം:</strong> ഇത് റെക്കോർഡ് ചെയ്ത ഡിജിറ്റൽ കോഴ്സ് ആയതിനാൽ ആക്സസ് നൽകിയ ശേഷം റീഫണ്ട് നൽകുന്നതല്ല. ചേരുന്നതിന് മുമ്പ് സംശയങ്ങൾ{" "}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              WhatsApp-ൽ ചോദിക്കാം
            </a>
            .
          </div>
        </div>

        {/* =================================================
            4. TIME SAVING (3 CARDS)
        ================================================= */}

        <section className="section intro-section">
          <div className="container narrow">
            <span className="section-tag">സമയം ലാഭിക്കാം</span>

            <h2>
              അധ്യാപകരുടെ സമയം
              <span> AI ഉപയോഗിച്ച് ലാഭിക്കാം</span>
            </h2>

            <p className="section-description">
              ലെസൺ പ്ലാൻ തയ്യാറാക്കുന്നത് മുതൽ ചോദ്യപേപ്പർ, വർക്ക്ഷീറ്റ്,
              പ്രസന്റേഷൻ, നോട്ടീസ്, രക്ഷിതാക്കൾക്കുള്ള സന്ദേശം വരെ അധ്യാപകർ
              ദിവസവും ആവർത്തിച്ചുള്ള ഒട്ടേറെ ജോലികൾ ചെയ്യുന്നു.
            </p>

            <div className="intro-grid">
              <div className="info-card">
                <Clock size={28} />

                <h3>1. സമയം ലാഭിക്കാം</h3>

                <p>
                  ആവർത്തിച്ച് ചെയ്യേണ്ട അധ്യാപന ജോലികൾ വേഗത്തിൽ പൂർത്തിയാക്കാം.
                </p>
              </div>

              <div className="info-card">
                <Sparkles size={28} />

                <h3>2. സ്മാർട്ടായി തയ്യാറാക്കാം</h3>

                <p>
                  AI ഉപയോഗിച്ച് അധ്യാപന സാമഗ്രികൾ കൂടുതൽ വേഗത്തിൽ തയ്യാറാക്കാം.
                </p>
              </div>

              <div className="info-card">
                <Users size={28} />

                <h3>3. നിയന്ത്രണം അധ്യാപകന്റെ കയ്യിൽ</h3>

                <p>
                  AI സഹായിക്കും. അവസാന തീരുമാനം എപ്പോഴും അധ്യാപകന്റേതായിരിക്കും.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            5. WHAT YOU CAN CREATE (MERGED WITH REAL USE CASES)
        ================================================= */}

        <section className="section usecase-section">
          <div className="container">
            <div className="section-heading">
              <span className="section-tag">പ്രായോഗിക നിർമ്മിതികൾ</span>

              <h2>
                AI ഉപയോഗിച്ച്
                <span> എന്തൊക്കെ തയ്യാറാക്കാം?</span>
              </h2>

              <p>
                നിങ്ങളുടെ ദൈനംദിന അധ്യാപന ജോലി കൂടുതൽ എളുപ്പമാക്കാം.
              </p>
            </div>

            <div className="usecase-grid">
              <div className="usecase-card">
                <span>01</span>

                <h3>ലെസൺ പ്ലാൻ</h3>

                <p>
                  ഒരു വിഷയം നൽകി ഘടനയുള്ള ലെസൺ പ്ലാൻ തയ്യാറാക്കാം.
                </p>
              </div>

              <div className="usecase-card">
                <span>02</span>

                <h3>ചോദ്യപേപ്പർ</h3>

                <p>
                  MCQ, വിവരണാത്മക ചോദ്യങ്ങൾ, ഉത്തരസൂചിക എന്നിവ തയ്യാറാക്കാം.
                </p>
              </div>

              <div className="usecase-card">
                <span>03</span>

                <h3>വർക്ക്ഷീറ്റ്</h3>

                <p>
                  വ്യത്യസ്ത നിലവാരത്തിലുള്ള വർക്ക്ഷീറ്റുകൾ ഉണ്ടാക്കാം.
                </p>
              </div>

              <div className="usecase-card">
                <span>04</span>

                <h3>രക്ഷിതാക്കൾക്കുള്ള സന്ദേശം</h3>

                <p>
                  മാന്യമായ ഔദ്യോഗിക സന്ദേശങ്ങൾ വേഗത്തിൽ തയ്യാറാക്കാം.
                </p>
              </div>

              <div className="usecase-card">
                <span>05</span>

                <h3>പ്രസന്റേഷൻ</h3>

                <p>
                  ക്ലാസ്സിൽ ഉപയോഗിക്കാവുന്ന ആകർഷകമായ സ്ലൈഡുകൾ വേഗത്തിൽ തയ്യാറാക്കാം.
                </p>
              </div>

              <div className="usecase-card">
                <span>06</span>

                <h3>ആശയം ലളിതമാക്കാം</h3>

                <p>
                  ബുദ്ധിമുട്ടുള്ള ആശയങ്ങൾ വിദ്യാർത്ഥികൾക്ക് മനസ്സിലാകുന്ന രീതിയിൽ വിശദീകരിക്കാം.
                </p>
              </div>
            </div>

            <div className="creation-extra-chips">
              <span className="creation-chip">
                <Check size={14} /> ടീച്ചിംഗ് മാനുവലുകൾ
              </span>
              <span className="creation-chip">
                <Check size={14} /> MCQ & ക്വിസുകൾ
              </span>
              <span className="creation-chip">
                <Check size={14} /> ലേണിംഗ് ഔട്ട്കംസ്
              </span>
              <span className="creation-chip">
                <Check size={14} /> പഠന സാമഗ്രികൾ
              </span>
              <span className="creation-chip">
                <Check size={14} /> രക്ഷിതാക്കളുമായുള്ള ആശയവിനിമയം
              </span>
            </div>

            {/* REAL AI SAMPLE SHOWCASE (Section 4 Checklist C: Real Sample made with AI) */}
            <div className="ai-sample-showcase">
              <div className="ai-sample-header">
                <div className="ai-sample-badge">
                  <Sparkles size={15} />
                  <span>യഥാർത്ഥ AI മാതൃക (Live AI Samples)</span>
                </div>
                <h3>AI ഉപയോഗിച്ച് അധ്യാപകർ തയ്യാറാക്കിയ സാമ്പിളുകൾ കാണാം</h3>
                <p>നിങ്ങൾ കോഴ്സ് പൂർത്തിയാക്കുമ്പോൾ ഇത്തരത്തിലുള്ള സാമഗ്രികൾ ഏതാനും നിമിഷങ്ങൾക്കുള്ളിൽ തയ്യാറാക്കാം</p>

                <div className="ai-sample-tabs">
                  <button
                    type="button"
                    className={`ai-sample-tab ${activeSample === 'lesson' ? 'active' : ''}`}
                    onClick={() => setActiveSample('lesson')}
                  >
                    📝 ലെസൺ പ്ലാൻ മാതൃക (Lesson Plan)
                  </button>
                  <button
                    type="button"
                    className={`ai-sample-tab ${activeSample === 'question' ? 'active' : ''}`}
                    onClick={() => setActiveSample('question')}
                  >
                    📋 ചോദ്യപേപ്പർ & ഉത്തരസൂചിക (Question Paper)
                  </button>
                </div>
              </div>

              {activeSample === 'lesson' ? (
                <div className="ai-sample-content">
                  <div className="ai-sample-meta">
                    <span><strong>വിഷയം:</strong> ജീവശാസ്ത്രം (Biology - Class 10)</span>
                    <span><strong>പാഠം:</strong> പാരമ്പര്യവും പരിണാമവും (Genetics)</span>
                    <span><strong>സമയം:</strong> 45 മിനിറ്റ്</span>
                  </div>
                  <div className="ai-sample-body">
                    <h4>🎯 പഠന ലക്ഷ്യങ്ങൾ (Learning Objectives):</h4>
                    <ul>
                      <li>DNA യുടെ ഘടനയും സ്വഭാവ സവിശേഷതകളും തിരിച്ചറിയുക.</li>
                      <li>മാതാപിതാക്കളിൽ നിന്ന് മക്കളിലേക്ക് ഗുണങ്ങൾ കൈമാറ്റം ചെയ്യപ്പെടുന്ന രീതി വിശകലനം ചെയ്യുക.</li>
                    </ul>

                    <h4>⏱️ ക്ലാസ്സ്റൂം ഘട്ടങ്ങൾ (Classroom Workflow):</h4>
                    <div className="ai-sample-step">
                      <strong>01. ആമുഖം (5 മിനിറ്റ്):</strong> ദൈനംദിന ജീവിതത്തിലെ സാദൃശ്യങ്ങളെക്കുറിച്ചുള്ള ചോദ്യങ്ങളിലൂടെ താല്പര്യം ഉണർത്തൽ.
                    </div>
                    <div className="ai-sample-step">
                      <strong>02. ആശയാവതരണം (20 മിനിറ്റ്):</strong> AI നിർമ്മിച്ച ഡിജിറ്റൽ ചാർട്ടുകൾ ഉപയോഗിച്ച് ജീനുകളുടെ പ്രവർത്തനം വിശദീകരിക്കൽ.
                    </div>
                    <div className="ai-sample-step">
                      <strong>03. ഗ്രൂപ്പ് പ്രവർത്തനം (10 മിനിറ്റ്):</strong> വിദ്യാർത്ഥികൾ സ്വന്തം കുടുംബ ഗുണങ്ങളുടെ ലളിതമായ ഫാമിലി ട്രീ ചാർട്ട് തയ്യാറാക്കൽ.
                    </div>
                    <div className="ai-sample-step">
                      <strong>04. മൂല്യനിർണ്ണയം & ഉപസംഹാരം (10 മിനിറ്റ്):</strong> 3 ദ്രുത ചോദ്യങ്ങൾ വഴി ആശയം ഉറപ്പിക്കൽ.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="ai-sample-content">
                  <div className="ai-sample-meta">
                    <span><strong>പരീക്ഷ:</strong> യൂണിറ്റ് ടെസ്റ്റ് - ഭൗതികശാസ്ത്രം (Physics - Class 9)</span>
                    <span><strong>പാഠം:</strong> ചലനവും ബലവും (Motion & Laws of Motion)</span>
                    <span><strong>ആകെ മാർക്ക്:</strong> 20</span>
                  </div>
                  <div className="ai-sample-body">
                    <h4>വിഭാഗം A: ശരിയുത്തരം തിരഞ്ഞെടുക്കുക (1 മാർക്ക് വീതം)</h4>
                    <p style={{ margin: "6px 0", color: "#203b59" }}>
                      <strong>ചോദ്യം 1:</strong> താഴെ പറയുന്നവയിൽ സദിശ അളവ് (Vector Quantity) ഏതാണ്?<br />
                      (A) വേഗത &nbsp;&nbsp;(B) പ്രവേഗം &nbsp;&nbsp;(C) ദൂരം &nbsp;&nbsp;(D) സമയം
                      <span className="sample-answer">✓ ഉത്തരം: (B) പ്രവേഗം</span>
                    </p>

                    <h4>വിഭാഗം B: ഹ്രസ്വ ഉത്തര ചോദ്യങ്ങൾ (2 മാർക്ക് വീതം)</h4>
                    <p style={{ margin: "6px 0", color: "#203b59" }}>
                      <strong>ചോദ്യം 2:</strong> ന്യൂട്ടന്റെ രണ്ടാം ചലനനിയമം പ്രസ്താവിച്ച് സമവാക്യം എഴുതുക.
                      <span className="sample-answer">✓ ഉത്തരം: ഒരു വസ്തുവിന്റെ സംവേഗ വ്യതിയാന നിരക്ക് അതിന്മേൽ പ്രയോഗിക്കുന്ന അസന്തുലിത ബാഹ്യബലത്തിന് നേർ അനുപാതത്തിലായിരിക്കും (F = ma).</span>
                    </p>

                    <h4>വിഭാഗം C: കണക്കുകൂട്ടൽ & വിശദീകരണം (4 മാർക്ക്)</h4>
                    <p style={{ margin: "6px 0", color: "#203b59" }}>
                      <strong>ചോദ്യം 3:</strong> 1000 kg പിണ്ഡമുള്ള ഒരു വാഹനം 20 m/s വേഗതയിൽ സഞ്ചരിക്കുന്നു. 5 സെക്കൻഡിനുള്ളിൽ വാഹനം നിശ്ചലാവസ്ഥയിലെത്താൻ ആവശ്യമായ ബലം കണക്കാക്കുക.
                      <span className="sample-answer">✓ ഉത്തരസൂചിക: u = 20 m/s, v = 0, t = 5 s → a = (0 - 20) / 5 = -4 m/s² → F = m × a = 1000 × (-4) = -4000 N (മന്ദീകരണ ബലം).</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            6. TEACHER REVIEWS
        ================================================= */}

        <section className="section reviews-section" id="reviews">
          <div className="container">
            <div className="section-heading">
              <div className="section-tag">അധ്യാപകരുടെ അഭിപ്രായങ്ങൾ</div>

              <h2>
                അധ്യാപകർ <span>പറയുന്നു...</span>
              </h2>

              <p>
                AI പഠിച്ച ശേഷം അധ്യാപനം എളുപ്പമായതിനെക്കുറിച്ച് ഞങ്ങളുടെ
                പഠിതാക്കൾ പറയുന്നത്.
              </p>
            </div>

            <div className="reviews-grid">
              {/* Review 1 */}
              <div className="review-card">
                <div className="review-stars">★★★★★</div>

                <p className="review-text">
                  “Lesson Plan തയ്യാറാക്കാൻ എടുക്കുന്ന സമയം വളരെ കുറച്ചു. AI
                  tools എങ്ങനെ practical ആയി ഉപയോഗിക്കാം എന്ന് ഈ course വഴി
                  മനസ്സിലായി.”
                </p>

                <div className="review-user">
                  <div className="review-avatar">A</div>

                  <div>
                    <h4>Anitha M.</h4>
                    <span>HSST Physics, St. Joseph's HSS, Kozhikode</span>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="review-card">
                <div className="review-stars">★★★★★</div>

                <p className="review-text">
                  “Question papers, worksheets, presentations എന്നിവ
                  തയ്യാറാക്കുന്നത് ഇപ്പോൾ വളരെ എളുപ്പമായി. തുടക്കക്കാർക്കും
                  മനസ്സിലാകുന്ന ലളിതമായ ശൈലിയിലാണ് ക്ലാസുകൾ.”
                </p>

                <div className="review-user">
                  <div className="review-avatar">R</div>

                  <div>
                    <h4>Rashid K.</h4>
                    <span>High School Teacher, GHSS Malappuram</span>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="review-card">
                <div className="review-stars">★★★★★</div>

                <p className="review-text">
                  “AI-യെക്കുറിച്ച് കേട്ടിട്ടുണ്ടെങ്കിലും ക്ലാസ്റൂമിൽ എങ്ങനെ
                  ഉപയോഗിക്കണം എന്ന് അറിയില്ലായിരുന്നു. കോഴ്സിന് ശേഷം വലിയ
                  ആത്മവിശ്വാസം കിട്ടി.”
                </p>

                <div className="review-user">
                  <div className="review-avatar">S</div>

                  <div>
                    <h4>Dr. Sreekumar P.</h4>
                    <span>Assistant Professor, Thrissur</span>
                  </div>
                </div>
              </div>

              {/* Review 4 */}
              <div className="review-card">
                <div className="review-stars">★★★★★</div>

                <p className="review-text">
                  “Presentations and teaching materials തയ്യാറാക്കുന്നതിൽ AI
                  tools വളരെ helpful ആണെന്ന് ഈ course വഴി പഠിച്ചു. വളരെ
                  practical ആയ learning experience.”
                </p>

                <div className="review-user">
                  <div className="review-avatar">N</div>

                  <div>
                    <h4>Naseema P.</h4>
                    <span>Teacher, Model Residential School, Wayanad</span>
                  </div>
                </div>
              </div>

              {/* Review 5 */}
              <div className="review-card">
                <div className="review-stars">★★★★★</div>

                <p className="review-text">
                  “Teaching-നൊപ്പം technology എങ്ങനെ smart ആയി use ചെയ്യാം
                  എന്നത് വളരെ simple ആയി explain ചെയ്തിട്ടുണ്ട്. Especially the
                  practical sessions were useful.”
                </p>

                <div className="review-user">
                  <div className="review-avatar">F</div>

                  <div>
                    <h4>Fathima N.</h4>
                    <span>UP School Teacher, Calicut</span>
                  </div>
                </div>
              </div>

              {/* Review 6 */}
              <div className="review-card">
                <div className="review-stars">★★★★★</div>

                <p className="review-text">
                  “AI tools പഠിക്കണമെന്ന് ആഗ്രഹിച്ചിരുന്നെങ്കിലും എവിടെ തുടങ്ങണം
                  എന്ന് അറിയില്ലായിരുന്നു. അധ്യാപകർക്കായി മലയാളത്തിൽ ഇങ്ങനെയൊരു
                  കോഴ്സ് ലഭിച്ചത് വളരെ ഉപകാരമായി.”
                </p>

                <div className="review-user">
                  <div className="review-avatar">M</div>

                  <div>
                    <h4>Meera V.</h4>
                    <span>English Faculty, Kochi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review CTA */}
            <div className="section-cta-row">
              <button className="section-join-button" onClick={openEnrollment}>
                ₹1,999-ന് ഇപ്പോൾ ചേരൂ
              </button>
            </div>
          </div>
        </section>

        {/* =================================================
            7. MENTOR
        ================================================= */}

        <section className="section mentor-section">
          <div className="container">
            <div className="section-heading">
              <span className="section-tag">നിങ്ങളുടെ മെന്റർ</span>

              <h2>
                പ്രായോഗിക പരിചയം.
                <span> അധ്യാപകർക്കായുള്ള മാർഗനിർദേശം.</span>
              </h2>

              <p>
                AI ടൂളുകൾ പഠിപ്പിക്കുന്നതിൽ മാത്രമല്ല, അവയെ യഥാർത്ഥ അധ്യാപന
                ജോലിയിൽ എങ്ങനെ ഉപയോഗിക്കാം എന്നതിലാണ് മെന്ററുടെ ശ്രദ്ധ.
              </p>
            </div>

            <div className="mentor-profile">
              <aside className="mentor-intro">
                <img
                  src={mentorImage}
                  alt="മുഹമ്മദ് നിഷാദ് - AI for Teachers mentor"
                  className="mentor-image"
                />

                <div className="mentor-info">
                  <h3>മുഹമ്മദ് നിഷാദ്</h3>

                  <span className="mentor-role">
                    AI ഇന്റഗ്രേഷൻ ലീഡ് & പ്രോഗ്രാം കോർഡിനേറ്റർ
                  </span>

                  <div className="mentor-credential">
                    <Award size={16} />

                    <span>
                      <strong>പ്രോംപ്റ്റ് എൻജിനീയറിങ്ങിൽ സർട്ടിഫൈഡ്</strong> (Dubai Future Foundation)
                    </span>
                  </div>
                </div>
              </aside>

              <div className="mentor-details">
                <div className="mentor-highlights">
                  <div className="mentor-highlight">
                    <Award size={23} />
                    <strong>AI & എഡ്‌ടെക് വിദഗ്ധൻ</strong>
                  </div>

                  <div className="mentor-highlight">
                    <BriefcaseBusiness size={23} />
                    <strong>AI ഇന്റഗ്രേഷൻ ലീഡ്</strong>
                  </div>

                  <div className="mentor-highlight">
                    <Users size={23} />
                    <strong>AI ഇന്റഗ്രേഷനും പ്രോംപ്റ്റ് എൻജിനീയറിങ്ങും</strong>
                  </div>

                  <div className="mentor-highlight">
                    <Clock size={23} />
                    <strong>7 വർഷത്തെ പരിചയം</strong>
                  </div>
                </div>

                <blockquote className="mentor-quote">
                  “സാങ്കേതികവിദ്യ അധ്യാപകരെ മാറ്റിസ്ഥാപിക്കാനല്ല, മറിച്ച് അധ്യാപകരുടെ അധ്വാനം കുറയ്ക്കാനും കൂടുതൽ മിടുക്കോടെ പഠിപ്പിക്കാനും സഹായിക്കാനാണ് AI. ഓരോ അധ്യാപകനും AI-യിലൂടെ കൂടുതൽ ആത്മവിശ്വാസവും സമയലാഭവും നേടാൻ ഞാൻ ഒപ്പമുണ്ട്.”
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            8. SYLLABUS (7 MODULES)
        ================================================= */}

        <section className="section syllabus-section" id="syllabus">
          <div className="container">
            <div className="section-heading">
              <span className="section-tag">കോഴ്സ് സിലബസ്</span>

              <h2>
                7 മൊഡ്യൂളുകൾ.
                <span> പ്രായോഗിക AI കഴിവുകൾ.</span>
              </h2>

              <p>
                ഒരു അധ്യാപകന് ക്ലാസ്റൂമിലും ദൈനംദിന ജോലിയിലും AI ഉപയോഗിക്കാൻ
                ആവശ്യമായ പ്രധാന കഴിവുകൾ.
              </p>
            </div>

            <div className="module-grid">
              {modules.map((module) => {
                const Icon = module.icon;

                return (
                  <article className="module-card" key={module.number}>
                    <div className="module-top">
                      <div className="module-number">{module.number}</div>

                      <div className="module-icon">
                        <Icon size={23} />
                      </div>
                    </div>

                    <h3>{module.title}</h3>

                    <p className="module-subtitle">{module.subtitle}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =================================================
            9. WORKFLOW & SAFE AI (ONE COHESIVE SECTION)
        ================================================= */}

        <section className="section workflow-section">
          <div className="container">
            <div className="section-heading">
              <span className="section-tag">സുരക്ഷിത AI പഠനം</span>

              <h2>
                AI സഹായിക്കുന്നു.
                <span> അധ്യാപകർ നയിക്കുന്നു.</span>
              </h2>

              <p>
                AI ഒരു സഹായി മാത്രമാണ്. അധ്യാപന തീരുമാനം, പരിശോധന, ക്ലാസ്സിലെ
                ഉപയോഗം എന്നിവ അധ്യാപകൻ തന്നെ നിയന്ത്രിക്കും.
              </p>
            </div>

            <div className="workflow">
              <div className="workflow-step">
                <span>01</span>

                <h3>അധ്യാപന ആവശ്യം</h3>

                <p>എന്താണ് വേണ്ടതെന്ന് തീരുമാനിക്കുക</p>
              </div>

              <ArrowRight className="workflow-arrow" />

              <div className="workflow-step">
                <span>02</span>

                <h3>AI-യോട് ചോദിക്കുക</h3>

                <p>ശരിയായ പ്രോംപ്റ്റ് നൽകുക</p>
              </div>

              <ArrowRight className="workflow-arrow" />

              <div className="workflow-step">
                <span>03</span>

                <h3>തയ്യാറാക്കുക</h3>

                <p>AI ഉള്ളടക്കം തയ്യാറാക്കുന്നു</p>
              </div>

              <ArrowRight className="workflow-arrow" />

              <div className="workflow-step">
                <span>04</span>

                <h3>പരിശോധിക്കുക</h3>

                <p>അധ്യാപകൻ ഉള്ളടക്കം പരിശോധിക്കുന്നു</p>
              </div>

              <ArrowRight className="workflow-arrow" />

              <div className="workflow-step">
                <span>05</span>

                <h3>ക്ലാസ്സിന് തയ്യാർ</h3>

                <p>അന്തിമ സാമഗ്രി ക്ലാസ്സിൽ ഉപയോഗിക്കാം</p>
              </div>
            </div>

            <div className="safe-box" style={{ marginTop: "55px" }}>
              <div className="safe-icon">
                <ShieldCheck size={38} />
              </div>

              <div>
                <span className="section-tag">സുരക്ഷയും ഉത്തരവാദിത്തവും</span>

                <h2>
                  AI ഉപയോഗിക്കുമ്പോൾ
                  <span> സുരക്ഷയ്ക്ക് ആദ്യ സ്ഥാനം</span>
                </h2>

                <p>
                  AI ഉണ്ടാക്കിയ ഉള്ളടക്കം പരിശോധിക്കുക, വിദ്യാർത്ഥികളുടെ വിവരങ്ങൾ
                  സംരക്ഷിക്കുക, സ്വകാര്യത പാലിക്കുക, അക്കാദമിക സത്യസന്ധത
                  നിലനിർത്തുക എന്നിവ കോഴ്സിന്റെ പ്രധാന ഭാഗമാണ്.
                </p>

                <div className="safe-list">
                  <span>
                    <Check size={16} />
                    വസ്തുതാ പരിശോധന
                  </span>

                  <span>
                    <Check size={16} />
                    വിദ്യാർത്ഥികളുടെ സ്വകാര്യത
                  </span>

                  <span>
                    <Check size={16} />
                    ധാർമ്മിക ഉപയോഗം
                  </span>

                  <span>
                    <Check size={16} />
                    അക്കാദമിക സത്യസന്ധത
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            10. AI TOOLS
        ================================================= */}

        <section className="section tools-section">
          <div className="container narrow">
            <div className="section-heading">
              <span className="section-tag">AI ടൂളുകൾ</span>

              <h2>
                അധ്യാപകർ ഉപയോഗിക്കുന്ന
                <span> പ്രധാന AI ടൂളുകൾ</span>
              </h2>

              <p>
                ഈ ടൂളുകൾ അധ്യാപനത്തിൽ എങ്ങനെ ഉപയോഗിക്കാം എന്ന് പ്രായോഗികമായി പഠിക്കാം.
              </p>
            </div>

            <div className="tools">
              <div className="tool-card">
                <strong>ChatGPT</strong>

                <span>AI സഹായി</span>
              </div>

              <div className="tool-card">
                <strong>Canva</strong>

                <span>ഡിസൈനും പ്രസന്റേഷനും</span>
              </div>

              <div className="tool-card">
                <strong>Gamma</strong>

                <span>AI പ്രസന്റേഷനുകൾ</span>
              </div>

              <div className="tool-card">
                <strong>Google Tools</strong>

                <span>അധ്യാപക ഉൽപ്പാദനക്ഷമത</span>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <p className="tools-note">
                💡 <strong>ടൂളുകൾ സൗജന്യമാണോ?</strong> അതെ, ഇവയുടെ സൗജന്യ പതിപ്പുകൾ തന്നെ അധ്യാപകരുടെ ദൈനംദിന ആവശ്യങ്ങൾക്ക് പൂർണ്ണമായും പര്യാപ്തമാണ്.
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            11. FAQ
        ================================================= */}

        <section className="section faq-section">
          <div className="container faq-container">
            <div className="section-heading">
              <span className="section-tag">പതിവ് ചോദ്യങ്ങൾ</span>

              <h2>
                സംശയങ്ങളും
                <span> മറുപടികളും</span>
              </h2>
            </div>

            <div className="faq-list">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    className={`faq-item ${isOpen ? "active" : ""}`}
                    key={index}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span>{faq.question}</span>

                      <ChevronDown
                        size={20}
                        className={isOpen ? "rotate" : ""}
                      />
                    </button>

                    {isOpen && <div className="faq-answer">{faq.answer}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =================================================
            12. HOW TO ENROLL
        ================================================= */}
        <EnrollmentFlow onEnroll={openEnrollment} whatsappUrl={whatsappUrl} />

        {/* =================================================
            13. FINAL CTA & FOOTER
        ================================================= */}

        <section className="final-cta">
          <div className="container">
            <h2>
              ഇനി നിങ്ങളുടെ അധ്യാപനം
              <br />
              <span>കൂടുതൽ സ്മാർട്ട് ആക്കാം.</span>
            </h2>

            <p>
              പ്രായോഗിക AI കഴിവുകൾ നേടി സമയം ലാഭിക്കൂ, അധ്യാപന ഒരുക്കം കൂടുതൽ
              മികവുറ്റതാക്കൂ.
            </p>

            <div className="final-offer-box">
              <div className="save-badge">₹3,001 ലാഭം</div>

              <div className="hero-offer-price">
                <del style={{ fontSize: "34px", fontWeight: "700" }}>
                  ₹5,000
                </del>

                <strong style={{ fontSize: "40px", fontWeight: "900" }}>
                  ₹1,999
                </strong>
              </div>

              <span className="final-offer-note">
                ഒറ്റത്തവണ പേയ്മെന്റ് • കോഴ്സ് ആക്സസ്
              </span>

              <button
                type="button"
                className="final-offer-button"
                onClick={openEnrollment}
              >
                ₹1,999-ന് ഇപ്പോൾ ചേരൂ
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
            <h2>QNAYDS അക്കാദമി ഒരുക്കിയത്</h2>

            <p>
              അധ്യാപകർക്ക് സ്മാർട്ടായ അധ്യാപനത്തിനും മെച്ചപ്പെട്ട
              ഉൽപ്പാദനക്ഷമതയ്ക്കും വേണ്ട പ്രായോഗിക AI കഴിവുകൾ നേടാൻ സഹായിക്കുന്നു.
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
              <strong>സഹായം വേണോ?</strong>

              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <FaWhatsapp size={21} />
                WhatsApp ചെയ്യൂ
              </a>
            </div>

            <p className="copyright">
              © 2026 QNAYDS ACADEMY. എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം.
            </p>

            <div className="footer-links">
              <a href="#terms">നിബന്ധനകളും വ്യവസ്ഥകളും</a>

              <a href="#privacy">സ്വകാര്യതാ നയം</a>

              <a href="#refund">റീഫണ്ട് നയം</a>

              <a href="#contact">ബന്ധപ്പെടുക</a>
            </div>

            <p className="footer-notice">
              റീഫണ്ട് നയം: ഇത് റെക്കോർഡ് ചെയ്ത ഡിജിറ്റൽ കോഴ്സ് ആയതിനാൽ ആക്സസ്
              നൽകിയ ശേഷം റീഫണ്ട് നൽകുന്നതല്ല. ചേരുന്നതിന് മുമ്പ് സംശയങ്ങൾ
              WhatsApp-ൽ ചോദിക്കാം.
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

        {paymentSuccess && (
          <PaymentSuccess onBack={() => setPaymentSuccess(false)} />
        )}

        {/* =================================================
            JOIN MODAL
        ================================================= */}

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div
              className="join-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="enrollment-header">
                <div>
                  <h2>എൻറോൾമെന്റ് പൂർത്തിയാക്കൂ</h2>

                  <p>തുടരുന്നതിനായി നിങ്ങളുടെ വിവരങ്ങൾ നൽകുക.</p>
                </div>

                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="enrollment-body">
                <div className="enrollment-offer">
                  <div className="offer-course-name">അധ്യാപകർക്കുള്ള AI കോഴ്സ്</div>

                  <div className="offer-price-row">
                    <div className="offer-prices">
                      <span className="offer-original-price">
                        <h2>₹5,000</h2>
                      </span>

                      <span className="offer-current-price">
                        <h6>₹1,999</h6>
                      </span>

                      <span className="offer-label">പരിമിതകാല ഓഫർ</span>
                    </div>

                    <span className="offer-saving">₹3,001 ലാഭം</span>
                  </div>
                </div>

                {!paymentStarted ? (
                  <form
                    className="enrollment-form"
                    onSubmit={handleContinuePayment}
                  >
                    {paymentError && (
                      <p className="payment-error" role="alert">
                        {paymentError}
                      </p>
                    )}

                    <label>
                      പൂർണ്ണമായ പേര് (Full Name)
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleEnrollmentChange}
                        placeholder="നിങ്ങളുടെ പേര് നൽകുക"
                        required
                      />
                    </label>

                    <label>
                      ഫോൺ നമ്പർ (WhatsApp Number)
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleEnrollmentChange}
                        placeholder="നിങ്ങളുടെ ഫോൺ നമ്പർ"
                        required
                      />
                    </label>

                    <label>
                      ഇമെയിൽ വിലാസം (Email)
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleEnrollmentChange}
                        placeholder="നിങ്ങളുടെ ഇമെയിൽ നൽകുക"
                        required
                      />
                    </label>

                    <div className="enrollment-actions">
                      <button type="submit" className="payment-button">
                        പേയ്‌മെന്റിലേക്ക് തുടരുക (₹1,999)
                        <ArrowRight size={18} />
                      </button>

                      <button
                        type="button"
                        className="payment-button"
                        onClick={() => setShowModal(false)}
                      >
                        റദ്ദാക്കുക
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="payment-ready">
                    <Clock size={42} />

                    <h3>സുരക്ഷിത പേയ്‌മെന്റ് വിൻഡോ തുറക്കുന്നു...</h3>

                    <p>
                      ദയവായി കാത്തിരിക്കുക. നിങ്ങളുടെ വിവരങ്ങൾ പൂർണ്ണമായും സുരക്ഷിതമാണ്.
                    </p>

                    <button
                      type="button"
                      className="payment-button"
                      onClick={() => setPaymentStarted(false)}
                    >
                      റദ്ദാക്കുക
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
