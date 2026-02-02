"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./themes.module.css";

interface Theme {
  id: string;
  name: string;
  tone: "cute" | "calm" | "confident" | "romantic" | "playful";
  colorTheme: string;
  backgroundTheme: "gradient" | "solid" | "pattern";
  description: string;
  preview: string;
}

const themeExamples: Theme[] = [
  {
    id: "romantic-sunset",
    name: "Romantic Sunset",
    tone: "romantic",
    colorTheme: "#ff91af",
    backgroundTheme: "gradient",
    description: "Warm, romantic vibes with soft pink tones",
    preview: "Perfect for a heartfelt dinner invitation",
  },
  {
    id: "cute-pastel",
    name: "Cute Pastel",
    tone: "cute",
    colorTheme: "#ffb3d9",
    backgroundTheme: "gradient",
    description: "Sweet and playful with pastel colors",
    preview: "Great for a casual coffee date",
  },
  {
    id: "calm-ocean",
    name: "Calm Ocean",
    tone: "calm",
    colorTheme: "#6eb5ff",
    backgroundTheme: "gradient",
    description: "Serene and peaceful blue tones",
    preview: "Ideal for a relaxing walk or quiet moment",
  },
  {
    id: "confident-bold",
    name: "Confident Bold",
    tone: "confident",
    colorTheme: "#ff6b6b",
    backgroundTheme: "solid",
    description: "Strong and direct with bold colors",
    preview: "For when you want to make a statement",
  },
  {
    id: "playful-fun",
    name: "Playful Fun",
    tone: "playful",
    colorTheme: "#ffd93d",
    backgroundTheme: "pattern",
    description: "Energetic and fun with bright colors",
    preview: "Perfect for a spontaneous adventure",
  },
  {
    id: "elegant-dark",
    name: "Elegant Dark",
    tone: "romantic",
    colorTheme: "#2d2d2d",
    backgroundTheme: "solid",
    description: "Sophisticated and mysterious",
    preview: "For an upscale dining experience",
  },
  {
    id: "spring-bloom",
    name: "Spring Bloom",
    tone: "cute",
    colorTheme: "#f8b4d9",
    backgroundTheme: "pattern",
    description: "Fresh and blooming with floral vibes",
    preview: "Great for a spring picnic date",
  },
  {
    id: "minimalist-clean",
    name: "Minimalist Clean",
    tone: "calm",
    colorTheme: "#ffffff",
    backgroundTheme: "solid",
    description: "Simple and elegant with clean lines",
    preview: "For those who prefer simplicity",
  },
];

export default function ThemesPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredThemes =
    selectedFilter === "all"
      ? themeExamples
      : themeExamples.filter((theme) => theme.tone === selectedFilter);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href='/invite/create' className={styles.backButton}>
          ← Back to Create
        </Link>
        <h1 className={styles.title}>Theme Examples</h1>
        <p className={styles.subtitle}>
          Explore different themes to inspire your invitation
        </p>
      </header>

      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${
            selectedFilter === "all" ? styles.active : ""
          }`}
          onClick={() => setSelectedFilter("all")}
        >
          All Themes
        </button>
        <button
          className={`${styles.filterButton} ${
            selectedFilter === "romantic" ? styles.active : ""
          }`}
          onClick={() => setSelectedFilter("romantic")}
        >
          Romantic
        </button>
        <button
          className={`${styles.filterButton} ${
            selectedFilter === "cute" ? styles.active : ""
          }`}
          onClick={() => setSelectedFilter("cute")}
        >
          Cute
        </button>
        <button
          className={`${styles.filterButton} ${
            selectedFilter === "calm" ? styles.active : ""
          }`}
          onClick={() => setSelectedFilter("calm")}
        >
          Calm
        </button>
        <button
          className={`${styles.filterButton} ${
            selectedFilter === "confident" ? styles.active : ""
          }`}
          onClick={() => setSelectedFilter("confident")}
        >
          Confident
        </button>
        <button
          className={`${styles.filterButton} ${
            selectedFilter === "playful" ? styles.active : ""
          }`}
          onClick={() => setSelectedFilter("playful")}
        >
          Playful
        </button>
      </div>

      <div className={styles.grid}>
        {filteredThemes.map((theme) => (
          <Link
            href={`/themes/${theme.id}`}
            key={theme.id}
            className={styles.card}
          >
            <div
              className={styles.cardPreview}
              style={{
                background:
                  theme.backgroundTheme === "gradient"
                    ? `linear-gradient(135deg, ${theme.colorTheme}, ${theme.colorTheme}dd)`
                    : theme.colorTheme,
              }}
            >
              <div className={styles.cardOverlay}>
                <span className={styles.viewButton}>View Example →</span>
              </div>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{theme.name}</h3>
              <p className={styles.cardTone}>{theme.tone}</p>
              <p className={styles.cardDescription}>{theme.description}</p>
              <p className={styles.cardPreviewText}>{theme.preview}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
