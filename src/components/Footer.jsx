export default function Footer() {
  return (
    <footer className="global-footer" id="main-footer">
      <div className="footer-container">
        <div className="footer-left" id="footer-credits">
          <span className="footer-status-indicator"></span>
          <span>L2_ARCHITECT // DESIGNED BY KUNJ S. KAKA</span>
        </div>
        <div className="footer-right" id="footer-github">
          <a 
            href="https://github.com/kunj2006-msu/l2-architect" 
            target="_blank" 
            rel="noopener noreferrer" 
            id="github-link"
          >
            GITHUB_REPOSITORY
          </a>
        </div>
      </div>
    </footer>
  );
}
