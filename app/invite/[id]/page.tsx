"use client";

import { useState, useEffect, use } from "react";
import styles from "./invite.module.css";

export default function InvitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [screen, setScreen] = useState(1);
  const [response, setResponse] = useState<"yes" | "maybe" | "no" | null>(null);
  const [inviteData, setInviteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load data from localStorage (temporary solution until we have a backend)
    const storedData = localStorage.getItem(`invite_${id}`);

    if (storedData) {
      // Use the actual data created by the user
      setInviteData(JSON.parse(storedData));
    } else {
      // Fallback to mock data if nothing is stored
      setInviteData({
        openingLine: "Hey 👋 Someone made something for you…",
        traits: "kind, fun, and easy to smile around",
        vulnerabilityLine: "This was a little scary to send…",
        invitationSentence: "Would you like to go on a date with me?",
        date: "2026-02-14",
        time: "19:30",
        location: "Carbone Restaurant",
        responseOptions: {
          yes: {
            label: "💖 Yes, I'd love to",
            followUp: "I can't wait! This is going to be wonderful.",
          },
          maybe: {
            label: "😊 Maybe, tell me more",
            followUp:
              "No pressure! Would it help if we talk about the details? I'm flexible.",
          },
          no: {
            label: "🤍 I'm flattered, but no",
            followUp:
              "Thank you for being honest. Your friendship means a lot to me.",
          },
        },
      });
    }

    setLoading(false);
  }, [id]);

  if (loading || !inviteData) {
    return (
      <div className={styles.screenContainer}>
        <div className={styles.content}>
          <p className={styles.subtleText}>Loading your invitation...</p>
        </div>
      </div>
    );
  }

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

  const handleContinue = () => {
    if (screen < 6) {
      setScreen(screen + 1);
    }
  };

  const handleResponse = (answer: "yes" | "maybe" | "no") => {
    setResponse(answer);
    setScreen(7);
  };

  // Screen 1: Curiosity Hook
  if (screen === 1) {
    return (
      <div className={styles.screenContainer} onClick={handleContinue}>
        <div className={`${styles.content} ${styles.fadeIn}`}>
          <p className={styles.subtleText}>{inviteData.openingLine}</p>
          <div className={styles.tapHint}>Tap to continue</div>
        </div>
      </div>
    );
  }

  // Screen 2: Emotional Warm-up
  if (screen === 2) {
    return (
      <div className={styles.screenContainer} onClick={handleContinue}>
        <div className={`${styles.content} ${styles.fadeIn}`}>
          <p className={styles.anticipationText}>
            They've been wanting to ask you something…
          </p>
          <div className={styles.tapHint}>Tap to continue</div>
        </div>
      </div>
    );
  }

  // Screen 3: Personal Touch
  if (screen === 3) {
    return (
      <div className={styles.screenContainer} onClick={handleContinue}>
        <div className={`${styles.content} ${styles.fadeIn}`}>
          <p className={styles.personalText}>
            Because you're{" "}
            <span className={styles.highlight}>{inviteData.traits}</span>.
          </p>
          <div className={styles.tapHint}>Tap to continue</div>
        </div>
      </div>
    );
  }

  // Screen 4: Vulnerability
  if (screen === 4) {
    return (
      <div className={styles.screenContainer} onClick={handleContinue}>
        <div className={`${styles.content} ${styles.fadeIn}`}>
          <p className={styles.vulnerableText}>
            {inviteData.vulnerabilityLine}
          </p>
          <div className={styles.tapHint}>Tap to continue</div>
        </div>
      </div>
    );
  }

  // Screen 5: The Ask
  if (screen === 5) {
    return (
      <div className={styles.screenContainer} onClick={handleContinue}>
        <div className={`${styles.content} ${styles.fadeIn}`}>
          <h1 className={styles.theAsk}>{inviteData.invitationSentence}</h1>
          <div className={styles.tapHint}>Tap to continue</div>
        </div>
      </div>
    );
  }

  // Screen 6: The Options
  if (screen === 6) {
    return (
      <div className={styles.screenContainer}>
        <div className={`${styles.content} ${styles.fadeIn}`}>
          <div className={styles.dateDetails}>
            <p className={styles.detailLine}>
              📅 {formatDate(inviteData.date)}
            </p>
            <p className={styles.detailLine}>
              🕐 {formatTime(inviteData.time)}
            </p>
            <p className={styles.detailLine}>📍 {inviteData.location}</p>
          </div>

          <div className={styles.optionsContainer}>
            <button
              className={`${styles.optionBtn} ${styles.yesBtn}`}
              onClick={() => handleResponse("yes")}
            >
              {inviteData.responseOptions.yes.label}
            </button>
            <button
              className={`${styles.optionBtn} ${styles.maybeBtn}`}
              onClick={() => handleResponse("maybe")}
            >
              {inviteData.responseOptions.maybe.label}
            </button>
            <button
              className={`${styles.optionBtn} ${styles.noBtn}`}
              onClick={() => handleResponse("no")}
            >
              {inviteData.responseOptions.no.label}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Screen 7: After-Click Experience
  if (screen === 7 && response) {
    if (response === "yes") {
      return (
        <div className={styles.screenContainer}>
          <div
            className={`${styles.content} ${styles.fadeIn} ${styles.confetti}`}
          >
            <h1 className={styles.celebrationTitle}>🎉 Amazing! 🎉</h1>
            <p className={styles.celebrationText}>
              I can't wait! This is going to be wonderful.
            </p>
            <div className={styles.replyBox}>
              <p className={styles.replyLabel}>Want to add a message?</p>
              <textarea
                className={styles.replyInput}
                placeholder='Type something sweet (optional)...'
                rows={3}
              />
              <button className={styles.sendReplyBtn}>Send Reply 💌</button>
            </div>
          </div>
        </div>
      );
    }

    if (response === "maybe") {
      return (
        <div className={styles.screenContainer}>
          <div className={`${styles.content} ${styles.fadeIn}`}>
            <h1 className={styles.followUpTitle}>No pressure! 💗</h1>
            <p className={styles.followUpText}>
              Would it help if we talk about the details? I'm flexible on timing
              and location.
            </p>
            <div className={styles.replyBox}>
              <textarea
                className={styles.replyInput}
                placeholder='What would work better for you?'
                rows={3}
              />
              <button className={styles.sendReplyBtn}>Send Message</button>
            </div>
          </div>
        </div>
      );
    }

    if (response === "no") {
      return (
        <div className={styles.screenContainer}>
          <div className={`${styles.content} ${styles.fadeIn}`}>
            <h1 className={styles.respectTitle}>
              Thank you for being honest 🤍
            </h1>
            <p className={styles.respectText}>
              I really appreciate you taking the time to look at this. Your
              friendship means a lot to me.
            </p>
            <p className={styles.respectSubtext}>Take care 💫</p>
          </div>
        </div>
      );
    }
  }

  return null;
}
