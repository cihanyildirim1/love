"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./theme.module.css";

interface ThemeData {
  id: string;
  name: string;
  tone: "cute" | "calm" | "confident" | "romantic" | "playful";
  colorTheme: string;
  backgroundTheme: "gradient" | "solid" | "pattern";
  description: string;
  sampleInvite: {
    senderName: string;
    openingLine: string;
    traits: string;
    vulnerabilityLine: string;
    invitationSentence: string;
    dateType: string;
    date: string;
    time: string;
    location: string;
  };
}

const themes: Record<string, ThemeData> = {
  "romantic-sunset": {
    id: "romantic-sunset",
    name: "Romantic Sunset",
    tone: "romantic",
    colorTheme: "#ff91af",
    backgroundTheme: "gradient",
    description: "Warm, romantic vibes with soft pink tones",
    sampleInvite: {
      senderName: "Alex",
      openingLine: "Hey 👋 Someone made something special for you…",
      traits:
        "You make me smile every time we talk, and your laugh is contagious.",
      vulnerabilityLine: "I've been thinking about this for a while…",
      invitationSentence: "Would you like to have dinner with me?",
      dateType: "dinner",
      date: "February 14, 2026",
      time: "7:00 PM",
      location: "That cozy Italian place downtown",
    },
  },
  "cute-pastel": {
    id: "cute-pastel",
    name: "Cute Pastel",
    tone: "cute",
    colorTheme: "#ffb3d9",
    backgroundTheme: "gradient",
    description: "Sweet and playful with pastel colors",
    sampleInvite: {
      senderName: "Jamie",
      openingLine: "Hi! ✨ You've got a cute invitation waiting…",
      traits: "You're so much fun to be around and your energy is amazing!",
      vulnerabilityLine: "I'm a bit nervous but excited to ask…",
      invitationSentence: "Want to grab coffee with me? ☕",
      dateType: "coffee",
      date: "January 15, 2026",
      time: "2:00 PM",
      location: "The cute café near the park",
    },
  },
  "calm-ocean": {
    id: "calm-ocean",
    name: "Calm Ocean",
    tone: "calm",
    colorTheme: "#6eb5ff",
    backgroundTheme: "gradient",
    description: "Serene and peaceful blue tones",
    sampleInvite: {
      senderName: "Morgan",
      openingLine: "Hello 🌊 A peaceful invitation awaits you…",
      traits: "I really enjoy our conversations and the calm energy you bring.",
      vulnerabilityLine: "I'd love to spend more time with you…",
      invitationSentence: "Would you like to take a walk by the beach?",
      dateType: "walk",
      date: "January 20, 2026",
      time: "5:00 PM",
      location: "Sunset Beach boardwalk",
    },
  },
  "confident-bold": {
    id: "confident-bold",
    name: "Confident Bold",
    tone: "confident",
    colorTheme: "#ff6b6b",
    backgroundTheme: "solid",
    description: "Strong and direct with bold colors",
    sampleInvite: {
      senderName: "Taylor",
      openingLine: "Hey! 💪 I've got something to ask you…",
      traits:
        "You're confident, smart, and someone I genuinely want to know better.",
      vulnerabilityLine: "I believe in being direct, so here it is…",
      invitationSentence: "Let's go on a date. What do you say?",
      dateType: "dinner",
      date: "January 25, 2026",
      time: "8:00 PM",
      location: "The rooftop bar downtown",
    },
  },
  "playful-fun": {
    id: "playful-fun",
    name: "Playful Fun",
    tone: "playful",
    colorTheme: "#ffd93d",
    backgroundTheme: "pattern",
    description: "Energetic and fun with bright colors",
    sampleInvite: {
      senderName: "Riley",
      openingLine: "Yo! 🎉 Something fun is coming your way…",
      traits: "You're hilarious and every moment with you is an adventure!",
      vulnerabilityLine: "Okay, this is a bit wild but…",
      invitationSentence: "Want to go on a spontaneous adventure with me?",
      dateType: "surprise",
      date: "This weekend",
      time: "10:00 AM",
      location: "It's a surprise! 😉",
    },
  },
  "elegant-dark": {
    id: "elegant-dark",
    name: "Elegant Dark",
    tone: "romantic",
    colorTheme: "#2d2d2d",
    backgroundTheme: "solid",
    description: "Sophisticated and mysterious",
    sampleInvite: {
      senderName: "Chris",
      openingLine: "Good evening 🌙 An elegant invitation for you…",
      traits: "Your sophistication and grace never cease to impress me.",
      vulnerabilityLine: "I'd be honored if you'd consider…",
      invitationSentence:
        "Would you join me for dinner at an upscale restaurant?",
      dateType: "dinner",
      date: "January 30, 2026",
      time: "8:30 PM",
      location: "The Grand Bistro",
    },
  },
  "spring-bloom": {
    id: "spring-bloom",
    name: "Spring Bloom",
    tone: "cute",
    colorTheme: "#f8b4d9",
    backgroundTheme: "pattern",
    description: "Fresh and blooming with floral vibes",
    sampleInvite: {
      senderName: "Sam",
      openingLine: "Hi there! 🌸 Spring has brought something special…",
      traits: "Your warmth and kindness brighten my day like sunshine!",
      vulnerabilityLine: "I'd love to spend a beautiful day with you…",
      invitationSentence: "Want to have a picnic in the park with me?",
      dateType: "walk",
      date: "March 21, 2026",
      time: "12:00 PM",
      location: "Cherry Blossom Park",
    },
  },
  "minimalist-clean": {
    id: "minimalist-clean",
    name: "Minimalist Clean",
    tone: "calm",
    colorTheme: "#ffffff",
    backgroundTheme: "solid",
    description: "Simple and elegant with clean lines",
    sampleInvite: {
      senderName: "Jordan",
      openingLine: "Hello. Something simple yet meaningful for you…",
      traits:
        "I appreciate your thoughtfulness and the depth of our conversations.",
      vulnerabilityLine: "In the simplest way, I want to ask…",
      invitationSentence: "Would you like to spend some time together?",
      dateType: "coffee",
      date: "February 5, 2026",
      time: "3:00 PM",
      location: "The quiet bookshop café",
    },
  },
};

export default function ThemeExample() {
  const params = useParams();
  const themeId = params.id as string;
  const [screen, setScreen] = useState(1);
  const [showAll, setShowAll] = useState(false);

  const theme = themes[themeId];

  useEffect(() => {
    if (!showAll && screen < 6) {
      const timer = setTimeout(() => {
        setScreen(screen + 1);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [screen, showAll]);

  if (!theme) {
    return (
      <div className={styles.notFound}>
        <h1>Theme not found</h1>
        <Link href='/themes'>← Back to Themes</Link>
      </div>
    );
  }

  const getBackgroundStyle = () => {
    if (theme.backgroundTheme === "gradient") {
      return {
        background: `linear-gradient(135deg, ${theme.colorTheme}, ${theme.colorTheme}dd)`,
      };
    }
    return { background: theme.colorTheme };
  };

  return (
    <div className={styles.container} style={getBackgroundStyle()}>
      <div className={styles.controls}>
        <Link href='/themes' className={styles.backLink}>
          ← Back to Themes
        </Link>
        <div className={styles.controlButtons}>
          <button
            className={styles.controlButton}
            onClick={() => {
              setScreen(1);
              setShowAll(false);
            }}
          >
            Reset
          </button>
          <button
            className={styles.controlButton}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Animate" : "Show All"}
          </button>
        </div>
        <Link href='/invite/create' className={styles.useButton}>
          Use This Theme →
        </Link>
      </div>

      <div className={styles.themeInfo}>
        <h2 className={styles.themeName}>{theme.name}</h2>
        <p className={styles.themeDescription}>{theme.description}</p>
      </div>

      <div className={styles.previewContainer}>
        {(showAll || screen >= 1) && (
          <div
            className={`${styles.screen} ${styles.fadeIn}`}
            style={{ animationDelay: "0s" }}
          >
            <p className={styles.text}>{theme.sampleInvite.openingLine}</p>
          </div>
        )}

        {(showAll || screen >= 2) && (
          <div
            className={`${styles.screen} ${styles.fadeIn}`}
            style={{ animationDelay: showAll ? "0s" : "0.5s" }}
          >
            <p className={styles.text}>From: {theme.sampleInvite.senderName}</p>
          </div>
        )}

        {(showAll || screen >= 3) && (
          <div
            className={`${styles.screen} ${styles.fadeIn}`}
            style={{ animationDelay: showAll ? "0s" : "1s" }}
          >
            <p className={styles.text}>{theme.sampleInvite.traits}</p>
          </div>
        )}

        {(showAll || screen >= 4) && (
          <div
            className={`${styles.screen} ${styles.fadeIn}`}
            style={{ animationDelay: showAll ? "0s" : "1.5s" }}
          >
            <p className={styles.text}>
              {theme.sampleInvite.vulnerabilityLine}
            </p>
          </div>
        )}

        {(showAll || screen >= 5) && (
          <div
            className={`${styles.screen} ${styles.fadeIn}`}
            style={{ animationDelay: showAll ? "0s" : "2s" }}
          >
            <p className={styles.invitation}>
              {theme.sampleInvite.invitationSentence}
            </p>
          </div>
        )}

        {(showAll || screen >= 6) && (
          <div
            className={`${styles.screen} ${styles.fadeIn}`}
            style={{ animationDelay: showAll ? "0s" : "2.5s" }}
          >
            <div className={styles.details}>
              <p>📅 {theme.sampleInvite.date}</p>
              <p>🕐 {theme.sampleInvite.time}</p>
              <p>📍 {theme.sampleInvite.location}</p>
            </div>
            <div className={styles.responses}>
              <button className={styles.responseYes}>
                💖 Yes, I'd love to
              </button>
              <button className={styles.responseMaybe}>
                😊 Maybe, tell me more
              </button>
              <button className={styles.responseNo}>
                🤍 I'm flattered, but no
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
