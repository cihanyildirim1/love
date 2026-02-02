import Link from "next/link";
import styles from "./terms.module.css";

export default function TermsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href='/' className={styles.backLink}>
          ← Back to Home
        </Link>

        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.updated}>Last Updated: February 2, 2026</p>

        <section className={styles.section}>
          <h2>Acceptance of Terms</h2>
          <p>
            By using Love Invites, you agree to these terms. If you don't agree,
            please don't use our service.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Service Description</h2>
          <p>
            Love Invites is a free tool for creating and sharing romantic date
            invitations. All content is created by users and stored locally in
            their browser.
          </p>
        </section>

        <section className={styles.section}>
          <h2>User Responsibilities</h2>
          <ul>
            <li>You are responsible for all content you create</li>
            <li>Do not use copyrighted material without permission</li>
            <li>Be respectful and lawful in all communications</li>
            <li>Do not harass, abuse, or harm others</li>
            <li>
              Comply with YouTube's Terms of Service when embedding videos
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Music & Content</h2>
          <p>
            We use YouTube's official embed API. You must have permission to
            embed any content you share. We do not host or store any music or
            copyrighted material. YouTube handles all copyright detection and
            enforcement.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Privacy</h2>
          <p>
            Your invitation data is stored only in your browser's localStorage.
            We do not collect, store, or transmit your personal information to
            our servers.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Disclaimers</h2>
          <p>
            This service is provided "as is" without warranties of any kind. We
            are not responsible for:
          </p>
          <ul>
            <li>How users choose to use this platform</li>
            <li>Copyright violations by users</li>
            <li>Content of user-created invitations</li>
            <li>
              Availability or functionality of third-party services (YouTube)
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Limitation of Liability</h2>
          <p>
            We are not liable for any damages arising from your use of this
            service. Use at your own risk.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Changes to Terms</h2>
          <p>
            We may update these terms at any time. Continued use of the service
            constitutes acceptance of updated terms.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>
            Questions? Contact us at:{" "}
            <a href='mailto:support@loveinvites.com'>support@loveinvites.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
