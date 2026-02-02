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

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <h3 className={styles.footerLogo}>💕 Love Invites</h3>
            <p className={styles.footerTagline}>
              Create beautiful date invitations that your special someone will
              never forget.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <h4>Product</h4>
              <ul>
                <li>
                  <Link href='/invite/create'>Create Invitation</Link>
                </li>
                <li>
                  <Link href='/themes'>Browse Themes</Link>
                </li>
                <li>
                  <Link href='#features'>Features</Link>
                </li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4>Support</h4>
              <ul>
                <li>
                  <a href='mailto:support@loveinvites.com'>Contact Us</a>
                </li>
                <li>
                  <Link href='#'>Help Center</Link>
                </li>
                <li>
                  <Link href='#'>FAQ</Link>
                </li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4>Legal</h4>
              <ul>
                <li>
                  <Link href='#'>Privacy Policy</Link>
                </li>
                <li>
                  <Link href='/terms'>Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Love Invites. Made with 💖</p>
        </div>
      </footer>
    </div>
  );
}
