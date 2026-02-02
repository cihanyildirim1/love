import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Create Beautiful
              <span className={styles.highlight}> Date Invitations</span>
            </h1>
            <p className={styles.heroDescription}>
              Send romantic invitations to your special someone. Create
              personalized date invites with ease and make every moment
              memorable.
            </p>
            <div className={styles.ctas}>
              <Link href='/invite/create' className={styles.primary}>
                Create Invitation
              </Link>
              <Link href='/themes' className={styles.secondary}>
                View Examples
              </Link>
            </div>
          </div>
        </div>

        <section className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💌</div>
            <h3>Personalized</h3>
            <p>Customize every detail to make it uniquely yours</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎨</div>
            <h3>Beautiful Design</h3>
            <p>Stunning templates that capture the moment</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Instant Share</h3>
            <p>Send invitations instantly via unique links</p>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to Create Something Special?
            </h2>
            <p className={styles.ctaDescription}>
              Start creating your personalized date invitation now and make your
              special moment unforgettable.
            </p>
            <Link href='/invite/create' className={styles.ctaButton}>
              Get Started ✨
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
