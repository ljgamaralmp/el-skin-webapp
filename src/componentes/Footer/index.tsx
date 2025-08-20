"use client"
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faPinterest,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css';
import Link from 'next/link';
 
interface FooterLink {
  label: string;
  href: string;
}
 
interface FooterSection {
  title: string;
  links: FooterLink[];
}
 
interface SocialLink {
  icon: IconDefinition;
  href: string;
  label: string;
}
 
const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      icon: faInstagram,
      href: 'https://instagram.com/alskin',
      label: 'Instagram'
    },
    {
      icon: faFacebook,
      href: 'https://facebook.com/alskin',
      label: 'Facebook'
    },
    {
      icon: faYoutube,
      href: 'https://youtube.com/alskin',
      label: 'YouTube'
    },
    {
      icon: faPinterest,
      href: 'https://pinterest.com/alskin',
      label: 'Pinterest'
    },
    {
      icon: faTwitter,
      href: 'https://twitter.com/alskin',
      label: 'Twitter'
    },
    {
      icon: faLinkedin,
      href: 'https://linkedin.com/company/alskin',
      label: 'LinkedIn'
    },
    {
      icon: faGlobe,
      href: 'https://alskin.com.br',
      label: 'Website'
    }
  ];
 
  const footerSections: FooterSection[] = [
    {
      title: 'Sobre a AL SKIN',
      links: [
        { label: '- quem somos', href: '/about' },
        { label: '- time AL SKIN', href: '/about' },
        { label: '- carreiras', href: '/about' }
      ]
    },
    {
      title: 'Loja AL SKIN',
      links: [
        { label: '- lojas físicas', href: '/lojas' },
        { label: '- devolução', href: '/devolucao' }
      ]
    },
    {
      title: 'Atendimento',
      links: [
        { label: '- oi@alskin.com.br', href: 'mailto:oi@alskin.com.br' },
        { label: '- ajuda', href: '/ajuda' }
      ]
    },
    {
      title: 'Blog AL SKIN',
      links: [
        { label: '- Minha pele', href: '/blog/minha-pele' },
        { label: '- Ingredientes', href: '/blog/ingredientes' }
      ]
    }
  ];
 
  const handleSocialClick = (socialLink: SocialLink) => {
    console.log(`Abrindo ${socialLink.label}: ${socialLink.href}`);
  };
 
  return (
    <footer className="footer">
      {/* Social Icons Section */}
      <div className="footer-social">
        <div className="footer-container">
          <div className="social-icons">
            {socialLinks.map((social) => (
              <button
                key={social.label}
                className="social-icon"
                onClick={() => handleSocialClick(social)}
                aria-label={`Abrir ${social.label}`}
                type="button"
              >
                <FontAwesomeIcon icon={social.icon} />
              </button>
            ))}
          </div>
        </div>
      </div>
 
      {/* Links Section */}
      <div className="footer-links">
        <div className="footer-container">
          <div className="footer-sections">
            {footerSections.map((section) => (
              <div key={section.title} className="footer-section">
                <h3 className="footer-section-title">{section.title}</h3>
                <ul className="footer-section-links">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {/* <a className="footer-link" href={link.href} key={link.label}>{link.label}</a> */}
                      <Link className="footer-link" href={link.href} key={link.label}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-brand">
            <h2 className="footer-brand-name">AL SKIN</h2>
            <p className="footer-copyright">
              2025 AL SKIN. Todos os direitos reservados.
            </p>
            <p className="footer-address">
              Av. Sete de Setembro, 467 - São Paulo/SP - CEP: 05240-010
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
 
export default Footer;