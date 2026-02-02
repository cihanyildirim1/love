"use client";

import { useState, useEffect, use, useMemo } from "react";
import styles from "./invite.module.css";

export default function InvitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [screen, setScreen] = useState(1);
  const [response, setResponse] = useState<"yes" | "maybe" | "no" | null>(null);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [inviteData, setInviteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    // Try to load data from localStorage (temporary solution until we have a backend)
    const storedData = localStorage.getItem(`invite_${id}`);

    if (storedData) {
      // Use the actual data created by the user
      const parsedData = JSON.parse(storedData);
      console.log("Loaded invite data:", parsedData);
      console.log("Enable Music:", parsedData.enableMusic);
      console.log("YouTube Link:", parsedData.youtubeLink);
      setInviteData(parsedData);
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

  const parseYouTubeId = (url: string) => {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
      if (u.searchParams.has("v")) return u.searchParams.get("v");
      const path = u.pathname.split("/");
      return path[path.length - 1] || null;
    } catch {
      return null;
    }
  };

  const handlePlayMusic = () => {
    setMusicPlaying(true);
  };

  const handleStopMusic = () => {
    setMusicPlaying(false);
  };

  const generateCalendarLink = (type: "google" | "apple" | "outlook") => {
    const startDate = new Date(`${inviteData.date}T${inviteData.time}`);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const title = encodeURIComponent("Date Together");
    const details = encodeURIComponent(
      inviteData.invitationSentence || "Special date",
    );
    const location = encodeURIComponent(inviteData.location);

    if (type === "google") {
      const startStr = formatDate(startDate);
      const endStr = formatDate(endDate);
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startStr}/${endStr}`;
    } else if (type === "apple" || type === "outlook") {
      // Generate ICS file content
      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:Date Together
DESCRIPTION:${inviteData.invitationSentence || "Special date"}
LOCATION:${inviteData.location}
END:VEVENT
END:VCALENDAR`;
      const blob = new Blob([icsContent], { type: "text/calendar" });
      return URL.createObjectURL(blob);
    }
    return "";
  };

  const handleAddToCalendar = (type: "google" | "apple" | "outlook") => {
    const link = generateCalendarLink(type);
    if (type === "google") {
      window.open(link, "_blank");
    } else {
      const a = document.createElement("a");
      a.href = link;
      a.download = "date-invitation.ics";
      a.click();
    }
  };

  // Background Music Component - memoized to prevent re-renders
  const BackgroundMusic = useMemo(() => {
    if (!inviteData?.enableMusic || !inviteData?.youtubeLink) return null;

    const videoId = parseYouTubeId(inviteData.youtubeLink);
    if (!videoId) return null;

    return (
      <iframe
        key='persistent-music'
        title='background-music'
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&loop=1&playlist=${videoId}&enablejsapi=1&rel=0`}
        allow='autoplay; encrypted-media'
        style={{
          position: "fixed",
          width: 1,
          height: 1,
          left: -9999,
          top: -9999,
          opacity: 0,
          pointerEvents: "none",
        }}
      />
    );
  }, [inviteData?.enableMusic, inviteData?.youtubeLink]);

  if (loading || !inviteData) {
    return (
      <div className={styles.screenContainer}>
        <div className={styles.content}>
          <p className={styles.subtleText}>Loading your invitation...</p>
        </div>
      </div>
    );
  }

  // Music control button (shown on all screens if music is enabled)
  const MusicControl = () => {
    if (!inviteData?.enableMusic || !inviteData?.youtubeLink) return null;
    return (
      <div className={styles.musicControl}>
        {!musicPlaying ? (
          <button className={styles.musicBtn} onClick={handlePlayMusic}>
            Play Music
          </button>
        ) : (
          <button className={styles.musicBtn} onClick={handleStopMusic}>
            Stop Music
          </button>
        )}
      </div>
    );
  };

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

  const handleResponse = (answer: "yes" | "no") => {
    if (answer === "yes" && !showFollowUp) {
      setShowFollowUp(true);
      setResponse(answer);
    } else if (answer === "yes" && showFollowUp) {
      setConfirmed(true);
    } else if (answer === "no") {
      setResponse(answer);
      setScreen(7);
    }
  };
  // Render content based on screen
  let screenContent;

  // Screen 1: Curiosity Hook
  if (screen === 1) {
    screenContent = (
      <div className={styles.screenContainer} onClick={handleContinue}>
        <MusicControl />
        <div className={`${styles.content} ${styles.fadeIn}`}>
          <p className={styles.subtleText}>{inviteData.openingLine}</p>
          <div className={styles.tapHint}>Tap to continue</div>
        </div>
      </div>
    );
  }

  // Screen 2: Emotional Warm-up
  else if (screen === 2) {
    screenContent = (
      <div className={styles.screenContainer} onClick={handleContinue}>
        <MusicControl />
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
  else if (screen === 3) {
    screenContent = (
      <div className={styles.screenContainer} onClick={handleContinue}>
        <MusicControl />
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
  else if (screen === 4) {
    screenContent = (
      <div className={styles.screenContainer} onClick={handleContinue}>
        <MusicControl />
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
  else if (screen === 5) {
    screenContent = (
      <div className={styles.screenContainer} onClick={handleContinue}>
        <MusicControl />
        <div className={`${styles.content} ${styles.fadeIn}`}>
          <h1 className={styles.theAsk}>{inviteData.invitationSentence}</h1>
          <div className={styles.tapHint}>Tap to continue</div>
        </div>
      </div>
    );
  }

  // Screen 6: The Options
  else if (screen === 6 && !confirmed) {
    screenContent = (
      <div className={styles.screenContainer}>
        <MusicControl />
        <div className={`${styles.content} ${styles.fadeIn}`}>
          <div className={styles.dateDetails}>
            <p className={styles.detailLine}>{formatDate(inviteData.date)}</p>
            <p className={styles.detailLine}>{formatTime(inviteData.time)}</p>
            <p className={styles.detailLine}>{inviteData.location}</p>
          </div>

          {showFollowUp && (
            <div className={styles.followUpBanner}>
              <p className={styles.followUpText}>
                {inviteData.responseOptions.yes.followUp}
              </p>
            </div>
          )}

          <div className={styles.optionsContainer}>
            <button
              className={`${styles.optionBtn} ${styles.yesBtn}`}
              onClick={() => handleResponse("yes")}
            >
              {showFollowUp
                ? "Confirm Yes"
                : inviteData.responseOptions.yes.label}
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

  // Confirmation Page
  else if (confirmed) {
    screenContent = (
      <div className={styles.confirmationPage}>
        <div className={styles.confirmationCard}>
          <div className={styles.confirmationHeader}>
            <h1 className={styles.confirmationTitle}>It's a Date!</h1>
            <p className={styles.confirmationSubtitle}>
              Your response has been sent and they'll be so happy to hear from
              you.
            </p>
          </div>

          <div className={styles.dateCard}>
            <h2 className={styles.dateCardTitle}>Date Details</h2>
            <div className={styles.dateInfo}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Date</span>
                <span className={styles.infoValue}>
                  {formatDate(inviteData.date)}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Time</span>
                <span className={styles.infoValue}>
                  {formatTime(inviteData.time)}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Location</span>
                <span className={styles.infoValue}>{inviteData.location}</span>
              </div>
            </div>
          </div>

          <div className={styles.messageSection}>
            <p className={styles.sweetMessage}>
              Looking forward to spending time together. This is going to be
              wonderful.
            </p>
          </div>

          <div className={styles.calendarSection}>
            <h3 className={styles.calendarTitle}>Add to Calendar</h3>
            <div className={styles.calendarButtons}>
              <button
                className={styles.calendarBtn}
                onClick={() => handleAddToCalendar("google")}
              >
                Google Calendar
              </button>
              <button
                className={styles.calendarBtn}
                onClick={() => handleAddToCalendar("apple")}
              >
                Apple Calendar
              </button>
              <button
                className={styles.calendarBtn}
                onClick={() => handleAddToCalendar("outlook")}
              >
                Outlook
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Screen 7: After-Click Experience
  else if (screen === 7 && response) {
    if (response === "no") {
      screenContent = (
        <div className={styles.screenContainer}>
          <div className={`${styles.content} ${styles.fadeIn}`}>
            <h1 className={styles.respectTitle}>Thank you for being honest</h1>
            <p className={styles.respectText}>
              I really appreciate you taking the time to look at this. Your
              friendship means a lot to me.
            </p>
            <p className={styles.respectSubtext}>Take care</p>
          </div>
        </div>
      );
    }
  }

  // Render the screen content with persistent background music
  return (
    <>
      {musicPlaying && BackgroundMusic}
      {screenContent}
    </>
  );
}
