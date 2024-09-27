import { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Simulate a successful signup. TODO: send the email to a newsletter service
    setStatus("success");
    setEmail("");
  };

  return (
    <div className="newsletter-card">
      <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          className="newsletter-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />{" "}
        <button type="submit" className="newsletter-button">
          Subscribe
        </button>
      </form>
      {status === "success" && (
        <div className="newsletter-alert">Thank you for subscribing!</div>
      )}
    </div>
  );
};

export default NewsletterSignup;
