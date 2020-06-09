/**
 * Footer.js
 * Creates link at the bottom of each page, except the landing page, to the
 * Clean Oceans International website.
 */
import React from 'react';

/**
 * JSX code for footer.
 * @return JSX code
 */
export function Footer() {
  return (
    <div className="uk-grid uk-padding-large uk-margin-medium-top">
      <a
        className="uk-width-expand uk-text-center uk-text-muted"
        href="https://cleanoceansinternational.org/"
      >
        Clean Oceans International
      </a>
    </div>
  );
}
  
export default Footer;
  