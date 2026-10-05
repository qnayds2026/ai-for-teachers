import React from "react";
import {
  CreditCard,
  MailCheck,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import "./EnrollmentFlow.css";

const steps = [
  {
    num: "1",
    icon: CreditCard,
    title: "എൻറോൾ & പേയ്‌മെന്റ്",
    eng: "Enroll & Pay",
    desc: "പേരും നമ്പറും നൽകി GPay, PhonePe അല്ലെങ്കിൽ Cards വഴി സുരക്ഷിതമായി ഫീസ് അടയ്ക്കുക.",
  },
  {
    num: "2",
    icon: MailCheck,
    title: "ലോഗിൻ ലിങ്ക് ലഭിക്കുന്നു",
    eng: "Instant Access Link",
    desc: "പേയ്‌മെന്റ് കഴിഞ്ഞ ഉടൻ തന്നെ Email വഴി ലോഗിൻ ലിങ്ക് തൽക്ഷണം എത്തും.",
  },
  {
    num: "3",
    icon: GraduationCap,
    title: "പഠനം ആരംഭിക്കാം!",
    eng: "Start Learning",
    desc: "Password നൽകി ലോഗിൻ ചെയ്ത് ഫോണിലോ ലാപ്ടോപ്പിലോ ക്ലാസുകൾ കണ്ടുതുടങ്ങാം.",
    isLast: true,
  },
];

const EnrollmentFlow = ({ onEnroll, whatsappUrl }) => {
  return (
    <section className="simple-enroll-flow" id="how-to-enroll">
      <div className="container">
        {/* Compact Heading */}
        <div className="simple-flow-header">
          <span className="simple-flow-tag">
            <Sparkles size={13} />
            HOW IT WORKS
          </span>
          <h2>
            Start Learning in <span>3 Simple Steps</span>
          </h2>
          <p>സങ്കീർണ്ണമായ ഒന്നുമില്ല — 1 മിനിറ്റിൽ എൻറോൾ ചെയ്യാം</p>
        </div>

        {/* 3 Step Pipeline */}
        <div className="simple-steps-row">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.num}>
                <div
                  className={`simple-step-box ${
                    step.isLast ? "is-complete" : ""
                  }`}
                >
                  <div className="step-badge-circle">
                    <span>{step.num}</span>
                  </div>

                  <div className="step-icon-wrap">
                    <Icon size={22} />
                  </div>

                  <div className="step-text-wrap">
                    <span className="step-eng-sub">{step.eng}</span>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                </div>

                {idx < steps.length - 1 && (
                  <div className="simple-step-arrow" aria-hidden="true">
                    <ArrowRight size={20} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Reassurance & Fast Action Row */}
        <div className="simple-flow-footer">
          <div className="simple-flow-pills">
            <span>
              <ShieldCheck size={14} /> സുരക്ഷിത പേയ്‌മെന്റ്
            </span>
          </div>

          <div className="simple-flow-actions">
            {onEnroll && (
              <button
                type="button"
                className="simple-enroll-btn"
                onClick={onEnroll}
              >
                <span>ഇപ്പോൾ Enroll ചെയ്യാം</span>
                <ArrowRight size={15} />
              </button>
            )}

            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="simple-whatsapp-link"
              >
                <FaWhatsapp size={15} />
                <span>സംശയങ്ങൾ ചോദിക്കാം</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnrollmentFlow;