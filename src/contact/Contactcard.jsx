import React from 'react';

const Contactcard = ({ name, email, bgcolor }) => {
  // build initials for avatar
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'NA';

  return (
    <div className="contact-card" style={{ '--card-bg': bgcolor || '#4a90e2' }}>
      <div className="contact-avatar" aria-hidden="true">{initials}</div>

      <div className="contact-info">
        <h3 className="contact-name">{name}</h3>
        <p className="contact-email">{email}</p>
      </div>

      <div className="contact-actions">
        <a className="contact-btn" href={`mailto:${email}`}>Email</a>
      </div>
    </div>
  );
};

export default Contactcard;
