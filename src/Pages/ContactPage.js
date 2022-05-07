import React from "react";
import ProductHeader from "../Component/ProductHeader";
import "../style/contactus.css";

function ContactPage() {
  return (
    <>
      <ProductHeader />
      <div className="main">
        <form className="form">
          <h1 className="contactus-heading"> Contact Us</h1>
          <br />
          <input
            className="inputs-contact"
            placeholder="Your Name"
            type="text"
            name="name"
            id="name"
          />
          <input
            className="inputs-contact"
            placeholder="Your email ID (optional)"
            type="email"
            name="mail"
            id="mail"
          />
          <input
            className="inputs-contact"
            placeholder="Mobile no."
            type="tel"
            name="phone"
            id="phone"
            maxlength="10"
          />
          <input
            className="inputs-contact"
            placeholder="Address (optional)"
            type="text"
            name="Address"
            id="Address"
          />
          <br />
          <input
            className="inputs-contact"
            placeholder="Subject (optional)"
            type="text"
            name="subject"
            id="subject"
          />
          <textarea
            className="inputs-contact"
            placeholder="Please describe your issue or message here Properly"
            name="message"
            id="message"
            cols="30"
            rows="10"
          ></textarea>
          <input className="inputs-contact" type="submit" value="Send" />
        </form>
      </div>
    </>
  );
}

export default ContactPage;
