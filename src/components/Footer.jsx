export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <a href="#" className="nav-logo">
            <div className="nav-logo-icon">🥗</div>
            <span>NutriScope</span>
          </a>
          <p className="footer-desc">
            AI-powered nutrition analysis and personalized diet recommendations.
            Eat smarter. Live healthier. Feel your best.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
            {['𝕏', 'in', 'ig', 'yt'].map((icon, i) => (
              <a
                key={i}
                href="#"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  transition: 'all 0.3s',
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="footer-col-title">Product</div>
          <ul className="footer-links">
            <li><a href="#">Food Analysis</a></li>
            <li><a href="#">BMI Calculator</a></li>
            <li><a href="#">Calorie Tracker</a></li>
            <li><a href="#">Diet Plans</a></li>
            <li><a href="#">Meal Scanner</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Company</div>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Support</div>
          <ul className="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">API Docs</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Status</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 NutriScope. All rights reserved.</span>
        <span>Crafted with 🥑 for a healthier world.</span>
      </div>
    </footer>
  );
}
