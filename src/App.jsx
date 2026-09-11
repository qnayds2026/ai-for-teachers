import React, { useEffect, useState } from "react";
import logo from "./assets/QNAYDS_LOGO.png";

import {
  Check,
  ChevronDown,
  MessageCircle,
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
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa6";

/* =====================================================
   WHATSAPP
===================================================== */

const WHATSAPP_NUMBER = "919074871204";

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi, I want to learn about the AI for Teachers Course. Please share the details."
)}`;

const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const courseId = String(import.meta.env.VITE_COURSE_ID || "").trim();

const fetchCourse = async () => {
  if (!apiUrl || !courseId) {
    throw new Error("Course payment is not configured yet. Please try again later.");
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
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
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
    script.onerror = () => reject(new Error("Unable to load the payment gateway."));
    document.body.appendChild(script);
  });

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
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [coursePrice, setCoursePrice] = useState(null);

  useEffect(() => {
    fetchCourse()
      .then(({ priceInRupees }) => setCoursePrice(priceInRupees))
      .catch(() => setCoursePrice(null));
  }, []);

  const handleEnrollmentChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleContinuePayment = async (event) => {
    event.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      return;
    }

    setPaymentError("");
    setPaymentStarted(true);

    try {
      if (!razorpayKeyId) {
        throw new Error("Payment is not configured yet. Please try again later.");
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
          console.info("Razorpay payment completed", response.razorpay_payment_id);
        },
        modal: {
          ondismiss: () => setPaymentStarted(false),
        },
      });

      checkout.on("payment.failed", (response) => {
        setPaymentStarted(false);
        setPaymentError(
          response.error?.description || "Payment failed. Please try again."
        );
      });

      checkout.open();
    } catch (error) {
      setPaymentStarted(false);
      setPaymentError(error.message || "Unable to start payment. Please try again.");
    }
  };

  const openEnrollment = () => {
    setPaymentStarted(false);
    setPaymentError("");
    setShowModal(true);
  };

  const scrollToSyllabus = () => {
    document.getElementById("syllabus")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="hero">

        <div className="hero-glow glow-one"></div>
        <div className="hero-glow glow-two"></div>

        <div className="container hero-content">

          {/* QNAYDS LOGO */}
       <div className="modal-logo-wrapper">
       <img
          src={logo}
          alt="QNAYDS"
          className="modal-logo"
         />
        </div>

          <div className="academy-label">
            QNAYDS ACADEMY
          </div>

          <div className="hero-badge">
            <Sparkles size={16} />
            അധ്യാപകർക്കായി പ്രത്യേകമായി തയ്യാറാക്കിയത്
          </div>

          <h1>
            അധ്യാപനത്തിൽ
            <span> AI ഉപയോഗിക്കാം</span>
            <br />
            കൂടുതൽ Smart ആക്കാം.
          </h1>

          <p className="hero-description">
            Lesson Plans, Question Papers, Presentations,
            Worksheets, Study Materials എന്നിവ തയ്യാറാക്കാൻ
            AI എങ്ങനെ practical ആയി ഉപയോഗിക്കാം എന്ന് പഠിക്കാം.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={openEnrollment}
            >
              ഇപ്പോൾ Join ചെയ്യാം
              <ArrowRight size={18} />
            </button>

            <button
              className="secondary-button"
              onClick={scrollToSyllabus}
            >
              Syllabus കാണാം
            </button>

          </div>

          <div className="hero-checks">

            <span>
              <Check size={17} />
              Teacher Focused
            </span>

            <span>
              <Check size={17} />
              Practical Learning
            </span>

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

      <section className="section video-section">

        <div className="container narrow">

          <div className="section-heading">

            <span className="section-tag">
              WATCH BEFORE YOU ENROLL
            </span>

            <h2>
              ഈ course നിങ്ങള്‍ക്ക്
              <span> എങ്ങനെ സഹായിക്കും?</span>
            </h2>

            <p>
              Enroll ചെയ്യുന്നതിന് മുമ്പ് course-നെ കുറിച്ച്
              ഒരു ചെറിയ introduction കാണാം.
            </p>

          </div>

          <div className="course-video">

            <div className="video-placeholder">

              <button
                type="button"
                className="video-play-button"
              >
                ▶
              </button>

              <h3>
                AI for Teachers Course
              </h3>

              <p>
                Course Introduction Video
              </p>

            </div>

          </div>

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
                AI സഹായിക്കും. Final decision എപ്പോഴും
                teacher-ന്റേതായിരിക്കും.
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
              <p>എന്താണ് വേണ്ടതെന്ന് തീരുമാനിക്കുക</p>
            </div>

            <ArrowRight className="workflow-arrow" />

            <div className="workflow-step">
              <span>02</span>
              <h3>Ask AI</h3>
              <p>ശരിയായ prompt നൽകുക</p>
            </div>

            <ArrowRight className="workflow-arrow" />

            <div className="workflow-step">
              <span>03</span>
              <h3>Generate</h3>
              <p>AI content തയ്യാറാക്കുന്നു</p>
            </div>

            <ArrowRight className="workflow-arrow" />

            <div className="workflow-step">
              <span>04</span>
              <h3>Verify</h3>
              <p>Teacher content പരിശോധിക്കുന്നു</p>
            </div>

            <ArrowRight className="workflow-arrow" />

            <div className="workflow-step">
              <span>05</span>
              <h3>Classroom Ready</h3>
              <p>Final resource classroom-ൽ ഉപയോഗിക്കുക</p>
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
                <span>{item}</span>
              </div>

            ))}

          </div>

          <div className="section-cta-row">
            <button type="button" className="section-join-button" onClick={openEnrollment}>
              ഇപ്പോൾ Join ചെയ്യാം <ArrowRight size={18} />
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
              <span>AI Assistant</span>
            </div>

            <div className="tool-card">
              <strong>Canva</strong>
              <span>Design & Presentations</span>
            </div>

            <div className="tool-card">
              <strong>Gamma</strong>
              <span>AI Presentations</span>
            </div>

            <div className="tool-card">
              <strong>Google Tools</strong>
              <span>Teacher Productivity</span>
            </div>

          </div>

          <div className="section-cta-row">
            <button type="button" className="section-join-button" onClick={openEnrollment}>
              ഇപ്പോൾ Join ചെയ്യാം <ArrowRight size={18} />
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
                MCQ, descriptive questions,
                answer key എന്നിവ തയ്യാറാക്കാം.
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
                Classroom-ready slides
                വേഗത്തിൽ തയ്യാറാക്കാം.
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
            <button type="button" className="section-join-button" onClick={openEnrollment}>
              ഇപ്പോൾ Join ചെയ്യാം <ArrowRight size={18} />
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
                student data protect ചെയ്യുക,
                privacy പാലിക്കുക, academic integrity
                നിലനിർത്തുക എന്നിവ course-ന്റെ പ്രധാന ഭാഗമാണ്.
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
                  className={`faq-item ${
                    isOpen ? "active" : ""
                  }`}
                  key={index}
                >

                  <button
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
            Practical AI skills പഠിച്ച് നിങ്ങളുടെ
            daily teaching work കൂടുതൽ എളുപ്പമാക്കൂ.
          </p>

          <button
            type="button"
            className="cta-button join-highlight-button"
            onClick={openEnrollment}
          >
            ഇപ്പോൾ Join ചെയ്യാം
            <ArrowRight size={19} />
          </button>

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

          <div className="footer-logo-area">

           

          </div>

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
            © 2026 QNAYDS ACADEMY. All rights reserved.
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
            This is a digital recorded course with instant
            access. Once access is provided, refunds cannot
            be issued. If you have any questions, please
            contact us on WhatsApp before enrolling.
          </p>

        </div>

      </footer>

      {/* =================================================
          FLOATING WHATSAPP
      ================================================= */}

      <FloatingWhatsApp />

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
                <h2>Complete Your Enrollment</h2>
                <p>Enter your details to continue securely.</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
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
                    <span className="offer-original-price">₹5,000</span>
                    <span className="offer-current-price">
                      {coursePrice === null ? "Loading price..." : `₹${coursePrice.toLocaleString("en-IN")}`}
                    </span>
                    <span className="offer-label">LIMITED-TIME OFFER</span>
                  </div>

                  {coursePrice !== null && coursePrice < 5000 && (
                    <span className="offer-saving">
                      Save ₹{(5000 - coursePrice).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>

            {!paymentStarted ? (
              <form className="enrollment-form" onSubmit={handleContinuePayment}>
                {paymentError && (
                  <p className="payment-error" role="alert">
                    {paymentError}
                  </p>
                )}

                <label>
                  Full Name
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleEnrollmentChange}
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
                    onChange={handleEnrollmentChange}
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
                    onChange={handleEnrollmentChange}
                    placeholder="Enter your email"
                    required
                  />
                </label>

                <div className="enrollment-actions">
                  <button type="submit" className="payment-button">
                    Continue to Payment
                    <ArrowRight size={18} />
                  </button>

                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="payment-ready">
                <Clock size={42} />
                <h3>Opening secure checkout...</h3>
                <p>
                  Please wait while Razorpay opens. Your payment details are
                  entered securely in the checkout window.
                </p>

                <button
                  type="button"
                  className="payment-button"
                  onClick={() => setPaymentStarted(false)}
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
  );
}

export default App;