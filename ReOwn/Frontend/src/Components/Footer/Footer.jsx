import React from 'react';
import style from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={style.mainFooter}>
      <div className={style.container}>
        <div className={style.footerTop}>
          <div className={style.footerSection}>
            <h2 className={style.logo}>ReOwn</h2>
            <p>Give your items a new home</p>
          </div>

          <div className={style.footerSection}>
            <h3>Contact Us</h3>
            <ul className={style.footerLinks}>
              <li><a href="#">WhatsApp</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">About Us</a></li>
            </ul>
          </div>

          <div className={style.footerSection}>
            <h3>Help</h3>
            <ul className={style.footerLinks}>
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">Delivery Details</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}