"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./preview.module.css";

interface InviteData {
  // Tone & Style
  tone: "cute" | "calm" | "confident" | "romantic" | "playful";
  colorTheme: string;
  animationSpeed: "slow" | "medium" | "fast";
  isAnonymous: boolean;
  senderName: string;

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

export default function PreviewInvite() {
  const router = useRouter();
  const [formData, setFormData] = useState<InviteData | null>(null);
  const [screen, setScreen] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [showYesFollowUp, setShowYesFollowUp] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("invitePreview");
    if (stored) {
      setFormData(JSON.parse(stored));
    } else {
      router.push("/invite/create");
    }
  }, [router]);

  useEffect(() => {
    if (!formData) return;

    // Auto-advance through screens
    if (screen < 6) {
      const timer = setTimeout(() => {
        setScreen(screen + 1);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (screen === 6) {
      const controlsTimer = setTimeout(() => {
        setShowControls(true);
      }, 1000);
      return () => clearTimeout(controlsTimer);
    }
  }, [screen, formData]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleGenerateLink = () => {
    const mockId = Math.random().toString(36).substring(7);

    // Save the invitation data to localStorage (temporary solution until we have a backend)
    localStorage.setItem(`invite_${mockId}`, JSON.stringify(formData));

    const inviteUrl = `${window.location.origin}/invite/${mockId}`;

    setGeneratedLink(inviteUrl);
    setShowLinkModal(true);
    setLinkCopied(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  const handleCloseModal = () => {
    setShowLinkModal(false);
    setLinkCopied(false);
  };

  const handleReplay = () => {
    setScreen(1);
    setShowControls(false);
  };

  const handleContinue = () => {
    if (screen < 6) {
      setScreen(screen + 1);
    }
  };

  const handleYesClick = () => {
    setShowYesFollowUp(true);
  };

  const handleNoClick = () => {
    // Could add no follow-up later if needed
  };

  if (!formData) {
    return (
      <div className={styles.previewPage}>
        <p style={{ color: "white" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.previewPage}>
      <div className={styles.previewHeader}>
        <Link href='/invite/create' className={styles.editBtn}>
          ✏️ Edit
        </Link>
      </div>

      {/* Screen 1: Curiosity Hook */}
      {screen === 1 && (
        <div className={styles.screenContainer} onClick={handleContinue}>
          <div className={`${styles.content} ${styles.fadeIn}`}>
            <p className={styles.subtleText}>{formData.openingLine}</p>
            <div className={styles.tapHint}>Tap to continue (or wait 3s)</div>
          </div>
        </div>
      )}

      {/* Screen 2: Emotional Warm-up */}
      {screen === 2 && (
        <div className={styles.screenContainer} onClick={handleContinue}>
          <div className={`${styles.content} ${styles.fadeIn}`}>
            <p className={styles.anticipationText}>
              They've been wanting to ask you something…
            </p>
            <div className={styles.tapHint}>Tap to continue (or wait 3s)</div>
          </div>
        </div>
      )}

      {/* Screen 3: Personal Touch */}
      {screen === 3 && (
        <div className={styles.screenContainer} onClick={handleContinue}>
          <div className={`${styles.content} ${styles.fadeIn}`}>
            <p className={styles.personalText}>
              Because you're{" "}
              <span className={styles.highlight}>{formData.traits}</span>.
            </p>
            <div className={styles.tapHint}>Tap to continue (or wait 3s)</div>
          </div>
        </div>
      )}

      {/* Screen 4: Vulnerability */}
      {screen === 4 && (
        <div className={styles.screenContainer} onClick={handleContinue}>
          <div className={`${styles.content} ${styles.fadeIn}`}>
            <p className={styles.vulnerableText}>
              {formData.vulnerabilityLine}
            </p>
            <div className={styles.tapHint}>Tap to continue (or wait 3s)</div>
          </div>
        </div>
      )}

      {/* Screen 5: The Ask */}
      {screen === 5 && (
        <div className={styles.screenContainer} onClick={handleContinue}>
          <div className={`${styles.content} ${styles.fadeIn}`}>
            <h1 className={styles.theAsk}>{formData.invitationSentence}</h1>
            <div className={styles.tapHint}>Tap to continue (or wait 3s)</div>
          </div>
        </div>
      )}

      {/* Screen 6: The Options */}
      {screen >= 6 && (
        <div className={styles.screenContainer}>
          <div className={`${styles.content} ${styles.fadeIn}`}>
            {!showYesFollowUp && (
              <>
                <h1 className={styles.invitationQuestion}>
                  {formData.invitationSentence}
                </h1>

                <div className={styles.dateDetails}>
                  <p className={styles.detailLine}>
                    📅 {formatDate(formData.date)}
                  </p>
                  <p className={styles.detailLine}>
                    🕐 {formatTime(formData.time)}
                  </p>
                  <p className={styles.detailLine}>📍 {formData.location}</p>
                </div>

                <div className={styles.optionsContainer}>
                  <button
                    className={`${styles.optionBtn} ${styles.yesBtn}`}
                    onClick={handleYesClick}
                  >
                    {formData.responseOptions.yes.label}
                  </button>
                  <button
                    className={`${styles.optionBtn} ${styles.noBtn}`}
                    onClick={handleNoClick}
                  >
                    {formData.responseOptions.no.label}
                  </button>
                </div>
              </>
            )}

            {showYesFollowUp && (
              <div className={styles.followUpMessage}>
                <p className={styles.followUpText}>
                  {formData.responseOptions.yes.followUp}
                </p>
              </div>
            )}

            {showControls && (
              <div className={styles.controlsContainer}>
                <div className={styles.previewBadge}>
                  ✨ This is how your invitation will appear
                </div>

                <div className={styles.buttonGroup}>
                  <button onClick={handleReplay} className={styles.replayBtn}>
                    🔄 Replay
                  </button>
                  <button
                    onClick={handleGenerateLink}
                    className={styles.generateBtn}
                  >
                    Generate Link 🔗
                  </button>
                </div>

                <p className={styles.helpText}>
                  Your special someone will see each screen appear one at a time
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Link Modal */}
      {showLinkModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={handleCloseModal}>
              ✕
            </button>

            <div className={styles.modalHeader}>
              <div className={styles.successIcon}>🎉</div>
              <h2 className={styles.modalTitle}>Link Generated!</h2>
              <p className={styles.modalSubtitle}>
                Share this link with your special someone
              </p>
            </div>

            <div className={styles.linkContainer}>
              <input
                type='text'
                value={generatedLink}
                readOnly
                className={styles.linkInput}
              />
              <button onClick={handleCopyLink} className={styles.copyBtn}>
                {linkCopied ? "✓ Copied!" : "📋 Copy"}
              </button>
            </div>

            <div className={styles.shareOptions}>
              <p className={styles.shareLabel}>Or share via:</p>
              <div className={styles.shareButtons}>
                <a
                  href={`sms:?&body=Someone made something special for you! ${generatedLink}`}
                  className={styles.shareBtn}
                >
                  💬 Text
                </a>
                <a
                  href={`mailto:?subject=You have a special invitation&body=Someone made something special for you! Open this link: ${generatedLink}`}
                  className={styles.shareBtn}
                >
                  📧 Email
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Someone made something special for you! ${generatedLink}`,
                  )}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.shareBtn}
                >
                  📱 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
