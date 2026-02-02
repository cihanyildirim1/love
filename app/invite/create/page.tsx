"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./create.module.css";

interface InviteData {
  // Basic Info
  receiverName?: string;
  senderName: string;

  // Tone & Style (with defaults)
  tone: "cute" | "calm" | "confident" | "romantic" | "playful";
  colorTheme: string;
  animationSpeed: "slow" | "medium" | "fast";
  isAnonymous: boolean;

  // Content
  openingLine: string;
  traits: string;
  vulnerabilityLine: string;
  dateType: "coffee" | "dinner" | "walk" | "surprise" | "custom";
  customDateType: string;
  invitationSentence: string;

  // Date Details
  date: string;
  time: string;
  location: string;

  // Response Options
  responseOptions: {
    yes: { enabled: boolean; label: string; followUp: string };
    maybe: { enabled: boolean; label: string; followUp: string };
    no: { enabled: boolean; label: string; followUp: string };
  };

  // Final Touches
  enableMusic: boolean;
  backgroundTheme: "gradient" | "solid" | "pattern";
}

export default function CreateInvite() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<InviteData>({
    // Basic Info
    receiverName: "",
    senderName: "",

    // Tone & Style (defaults)
    tone: "romantic",
    colorTheme: "#ff91af",
    animationSpeed: "medium",
    isAnonymous: false,

    // Content
    openingLine: "Hey 👋 Someone made something for you…",
    traits: "",
    vulnerabilityLine: "This was a little scary to send…",
    dateType: "dinner",
    customDateType: "",
    invitationSentence: "Would you like to go on a date with me?",

    // Date Details
    date: "",
    time: "",
    location: "",

    // Response Options
    responseOptions: {
      yes: {
        enabled: true,
        label: "💖 Yes, I'd love to",
        followUp: "I can't wait! This is going to be wonderful.",
      },
      maybe: {
        enabled: true,
        label: "😊 Maybe, tell me more",
        followUp:
          "No pressure! Would it help if we talk about the details? I'm flexible.",
      },
      no: {
        enabled: true,
        label: "🤍 I'm flattered, but no",
        followUp:
          "Thank you for being honest. Your friendship means a lot to me.",
      },
    },

    // Final Touches
    enableMusic: false,
    backgroundTheme: "gradient",
  });

  const examples = {
    openingLine: [
      "Hey 👋 Someone made something for you…",
      "You have a special invitation waiting…",
      "Someone's been thinking about you…",
      "This is for you 💌",
    ],
    traits: [
      "kind, fun, and easy to smile around",
      "thoughtful, genuine, and full of light",
      "sweet, funny, and impossible not to think about",
      "warm, caring, and truly special",
    ],
    vulnerabilityLine: [
      "This was a little scary to send…",
      "I've been nervous about asking this…",
      "Took some courage to make this…",
      "Hope this doesn't feel too forward…",
    ],
    invitationSentence: [
      "Would you like to go on a date with me?",
      "Want to spend some time together?",
      "Can I take you out sometime?",
      "I'd love to get to know you better. Interested?",
    ],
    location: [
      "That cozy café downtown",
      "The new restaurant everyone's talking about",
      "A quiet spot by the park",
      "Somewhere special I found",
    ],
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleResponseOptionChange = (
    option: "yes" | "maybe" | "no",
    field: "label" | "followUp",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      responseOptions: {
        ...prev.responseOptions,
        [option]: {
          ...prev.responseOptions[option],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("invitePreview", JSON.stringify(formData));
    router.push("/invite/create/preview");
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href='/' className={styles.backLink}>
          ← Back to Home
        </Link>

        <div className={styles.formContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>

          <h1 className={styles.pageTitle}>Create Your Invitation</h1>
          <p className={styles.stepIndicator}>Step {currentStep} of 4</p>

          <form className={styles.inviteForm} onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>👋 Getting Started</h2>

                <div className={styles.formGroup}>
                  <label htmlFor='receiverName'>
                    Receiver's Name (optional)
                  </label>
                  <input
                    type='text'
                    id='receiverName'
                    value={formData.receiverName || ""}
                    onChange={(e) =>
                      handleInputChange("receiverName", e.target.value)
                    }
                    placeholder='Who is this invitation for?'
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='senderName'>Your Name (optional)</label>
                  <input
                    type='text'
                    id='senderName'
                    value={formData.senderName}
                    onChange={(e) =>
                      handleInputChange("senderName", e.target.value)
                    }
                    placeholder='Leave blank to keep it mysterious...'
                  />
                </div>
              </div>
            )}

            {/* Step 2: Content */}
            {currentStep === 2 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>✍️ Your Message</h2>

                <div className={styles.formGroup}>
                  <label htmlFor='openingLine'>Opening Line</label>
                  <input
                    type='text'
                    id='openingLine'
                    value={formData.openingLine}
                    onChange={(e) =>
                      handleInputChange("openingLine", e.target.value)
                    }
                    placeholder='Simple, friendly, low-pressure...'
                    required
                  />
                  <div className={styles.examples}>
                    {examples.openingLine.map((example, i) => (
                      <button
                        key={i}
                        type='button'
                        className={styles.exampleChip}
                        onClick={() =>
                          handleInputChange("openingLine", example)
                        }
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='traits'>What do you like about them?</label>
                  <input
                    type='text'
                    id='traits'
                    value={formData.traits}
                    onChange={(e) =>
                      handleInputChange("traits", e.target.value)
                    }
                    placeholder='e.g., kind, fun, and easy to smile around'
                    required
                  />
                  <div className={styles.examples}>
                    {examples.traits.map((example, i) => (
                      <button
                        key={i}
                        type='button'
                        className={styles.exampleChip}
                        onClick={() => handleInputChange("traits", example)}
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='vulnerabilityLine'>
                    Vulnerability Line (optional but recommended)
                  </label>
                  <input
                    type='text'
                    id='vulnerabilityLine'
                    value={formData.vulnerabilityLine}
                    onChange={(e) =>
                      handleInputChange("vulnerabilityLine", e.target.value)
                    }
                    placeholder='Keeps it human and sincere...'
                  />
                  <div className={styles.examples}>
                    {examples.vulnerabilityLine.map((example, i) => (
                      <button
                        key={i}
                        type='button'
                        className={styles.exampleChip}
                        onClick={() =>
                          handleInputChange("vulnerabilityLine", example)
                        }
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Type of Date</label>
                  <div className={styles.optionGrid}>
                    {(["coffee", "dinner", "walk", "surprise"] as const).map(
                      (type) => (
                        <button
                          key={type}
                          type='button'
                          className={`${styles.optionCard} ${
                            formData.dateType === type ? styles.selected : ""
                          }`}
                          onClick={() => handleInputChange("dateType", type)}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      )
                    )}
                    <button
                      type='button'
                      className={`${styles.optionCard} ${
                        formData.dateType === "custom" ? styles.selected : ""
                      }`}
                      onClick={() => handleInputChange("dateType", "custom")}
                    >
                      Custom
                    </button>
                  </div>
                </div>

                {formData.dateType === "custom" && (
                  <div className={styles.formGroup}>
                    <input
                      type='text'
                      value={formData.customDateType}
                      onChange={(e) =>
                        handleInputChange("customDateType", e.target.value)
                      }
                      placeholder='Describe your custom date idea...'
                      required
                    />
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label htmlFor='invitationSentence'>Main Invitation</label>
                  <input
                    type='text'
                    id='invitationSentence'
                    value={formData.invitationSentence}
                    onChange={(e) =>
                      handleInputChange("invitationSentence", e.target.value)
                    }
                    placeholder='Clear and straightforward...'
                    required
                  />
                  <div className={styles.examples}>
                    {examples.invitationSentence.map((example, i) => (
                      <button
                        key={i}
                        type='button'
                        className={styles.exampleChip}
                        onClick={() =>
                          handleInputChange("invitationSentence", example)
                        }
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Date Details & Responses */}
            {currentStep === 3 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>📅 Date Details</h2>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor='date'>Date</label>
                    <input
                      type='date'
                      id='date'
                      value={formData.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor='time'>Time</label>
                    <input
                      type='time'
                      id='time'
                      value={formData.time}
                      onChange={(e) =>
                        handleInputChange("time", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='location'>Location</label>
                  <input
                    type='text'
                    id='location'
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    placeholder='Where should they meet you?'
                    required
                  />
                  <div className={styles.examples}>
                    {examples.location.map((example, i) => (
                      <button
                        key={i}
                        type='button'
                        className={styles.exampleChip}
                        onClick={() => handleInputChange("location", example)}
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                <h2 className={styles.stepTitle} style={{ marginTop: "3rem" }}>
                  💬 Response Options
                </h2>

                {(["yes", "maybe", "no"] as const).map((option) => (
                  <div key={option} className={styles.responseOption}>
                    <h3 className={styles.responseTitle}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}{" "}
                      Response
                    </h3>
                    <div className={styles.formGroup}>
                      <label>Button Label</label>
                      <input
                        type='text'
                        value={formData.responseOptions[option].label}
                        onChange={(e) =>
                          handleResponseOptionChange(
                            option,
                            "label",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Follow-up Message</label>
                      <textarea
                        value={formData.responseOptions[option].followUp}
                        onChange={(e) =>
                          handleResponseOptionChange(
                            option,
                            "followUp",
                            e.target.value
                          )
                        }
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 4: Final Touches */}
            {currentStep === 4 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>✨ Final Touches</h2>

                <div className={styles.formGroup}>
                  <label>Background Theme</label>
                  <div className={styles.optionGrid}>
                    {(["gradient", "solid", "pattern"] as const).map(
                      (theme) => (
                        <button
                          key={theme}
                          type='button'
                          className={`${styles.optionCard} ${
                            formData.backgroundTheme === theme
                              ? styles.selected
                              : ""
                          }`}
                          onClick={() =>
                            handleInputChange("backgroundTheme", theme)
                          }
                        >
                          {theme.charAt(0).toUpperCase() + theme.slice(1)}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type='checkbox'
                      checked={formData.enableMusic}
                      onChange={(e) =>
                        handleInputChange("enableMusic", e.target.checked)
                      }
                    />
                    Enable soft background music
                  </label>
                </div>

                <div className={styles.previewNote}>
                  <p>
                    🎉 You're all set! Click below to preview your invitation
                    exactly as your special someone will see it.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className={styles.navigationButtons}>
              {currentStep > 1 && (
                <button
                  type='button'
                  onClick={prevStep}
                  className={styles.prevBtn}
                >
                  ← Previous
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  type='button'
                  onClick={nextStep}
                  className={styles.nextBtn}
                >
                  Next →
                </button>
              ) : (
                <button type='submit' className={styles.submitBtn}>
                  Preview Invitation ✨
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
