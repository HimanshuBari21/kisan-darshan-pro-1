import React from "react";
import { Link } from "react-router-dom";
import "../style/globle.css";
function Footer() {
  return (
    <>
      <footer id="site-footer">
        <section
          className="horizontal-footer-section"
          id="footer-middle-section"
        >
          <div
            id="footer-about"
            className="footer-columns footer-columns-large"
          >
            <h1>Our Address</h1>
            <address>
              <p>
                <img src="https://img.icons8.com/ios-filled/14/eeeeee/marker.png" />
                Loknathpur, Dalsinghsarai-848114, Samastipur, Bihar
              </p>
              <p>
                <img src="https://img.icons8.com/ios-filled/14/eeeeee/mail.png" />
                pksharma211@gmail.com
              </p>
              <p>
                <img src="https://img.icons8.com/ios-filled/14/eeeeee/phone.png" />
                9424824272
              </p>
              <p>
                <img src="https://img.icons8.com/ios-filled/14/eeeeee/clock.png" />
                9:00 AM – 5:00 PM
              </p>
            </address>
          </div>
          <div className="footer-columns">
            <ul className="footer-column-menu" role="menu">
              <li className="footer-column-menu-item" role="menuitem">
                <Link to="/about" className="footer-column-menu-item-link">
                  About Us
                </Link>
              </li>
              <li className="footer-column-menu-item" role="menuitem">
                <Link to="/about" className="footer-column-menu-item-link">
                  Bussiness with us
                </Link>
              </li>

              <li className="footer-column-menu-item" role="menuitem">
                <Link to="/contact" className="footer-column-menu-item-link">
                  Leave a feedback
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section
          className="horizontal-footer-section"
          id="footer-bottom-section"
        >
          <div id="footer-copyright-info">
            &copy; eKisan Darshan PVT. LTD. 2022. All rights reserved.
          </div>
          <div id="footer-social-buttons">
            <img src="https://img.icons8.com/ios-filled/25/999999/facebook--v1.png" />
            <img src="https://img.icons8.com/ios-filled/25/999999/telegram-app.png" />
            <img src="https://img.icons8.com/ios-filled/25/999999/pinterest--v1.png" />
            <img src="https://img.icons8.com/ios-filled/25/999999/instagram--v1.png" />
          </div>
        </section>
      </footer>
    </>
  );
}

export default Footer;
