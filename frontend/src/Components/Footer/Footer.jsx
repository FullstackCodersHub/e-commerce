import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src="" alt="" />
        <p>Learning Tools</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Product</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-socials-icon">
        <div className="footer-icons-container">
          <i className="fa fa-facebook"></i>
        </div>
        <div className="footer-icons-container">
          <i className="fa fa-instagram"></i>
        </div>
        <div className="footer-icons-container">
          <i className="fa fa-whatsapp"></i>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2023-All right Reserved</p>
      </div>
    </div>
  );
};
