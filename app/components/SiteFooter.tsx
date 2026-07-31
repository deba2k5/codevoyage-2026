"use client"

import { MapPin, Calendar, Clock, Mail, Phone } from "lucide-react"
import { Instagram, Linkedin } from "@/components/ui/social-icons"

export default function SiteFooter() {
  const contacts = [
    { name: "Sreyasi Mondal", phone: "9883177160" },
    { name: "Debangkita Saha", phone: "8777494652" },
    { name: "Debangshu Chatterjee", phone: "6290277345" },
  ]

  return (
    <footer id="footer" className="bg-card/50 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 lg:grid-cols-3 max-w-6xl mx-auto">
          {/* Venue & map */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold tracking-wide mb-4 text-[#fffffe]">
              Venue
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-[#fffffecc] mb-4">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>IEM Gurukul Building, Kolkata</span>
              </li>
              <li className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-0.5 shrink-0" />
                <span>20th September 2025</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <span>10:00 AM - 6:00 PM (8-Hour Hackathon)</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <a href="mailto:support@codevoyage.tech" className="hover:text-[#fffffe] transition-colors">
                  support@codevoyage.tech
                </a>
              </li>
            </ul>
            <div className="mapContainer">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4183.014318067142!2d88.43129347580617!3d22.574513679490387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02751153ddb371%3A0x816e6fee5a5aac55!2sIEM%20Gurukul%20Building!5e1!3m2!1sen!2sin!4v1785183122102!5m2!1sen!2sin"
                className="mapIframe"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="IEM Gurukul Building Venue Map"
              />
            </div>
          </div>

          {/* Event leads */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold tracking-wide mb-4 text-[#fffffe]">
              Event Leads
            </h3>
            <ul className="space-y-3">
              {contacts.map((c) => (
                <li key={c.phone}>
                  <a href={`tel:${c.phone}`} aria-label={`Call ${c.name}`} className="contactRow">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    <span className="name">{c.name}</span>
                    <span className="dash">-</span>
                    <span className="phoneChip">{c.phone}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold tracking-wide mb-4 text-[#fffffe]">
              Connect
            </h3>
            <ul className="space-y-2 text-sm sm:text-base text-[#fffffecc] mb-6">
              <li><a href="#hero" className="hover:text-[#fffffe] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#fffffe] transition-colors">About</a></li>
              <li><a href="#tracks" className="hover:text-[#fffffe] transition-colors">Themes</a></li>
              <li><a href="#timeline" className="hover:text-[#fffffe] transition-colors">Timeline</a></li>
              <li><a href="#prizes" className="hover:text-[#fffffe] transition-colors">Prizes</a></li>
              <li><a href="#faq" className="hover:text-[#fffffe] transition-colors">FAQs</a></li>
            </ul>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/iemhackoasis2.0?igsh=YmdoMGE2eWw5bmVj" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="iconLink">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/your_company" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="iconLink">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between max-w-6xl mx-auto"
          style={{ borderTop: "1px solid #7f1d1d66" }}
        >
          <p className="text-xs sm:text-sm text-[#fffffecc] text-center sm:text-left">
            © 2025 Code Voyage
          </p>
        </div>
      </div>

      <style jsx>{`
        .mapContainer {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }
        .mapIframe {
          width: 100%;
          height: 220px;
          border: none;
          display: block;
        }
        .contactRow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 12px;
          color: #fffffe;
          text-decoration: none;
          background: linear-gradient(90deg, rgba(220, 38, 38,0.16), rgba(220, 38, 38,0.08));
          border: 1px solid rgba(248, 113, 113,0.3);
          transition: transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease, background 120ms ease;
        }
        .contactRow:hover {
          transform: translateY(-1px);
          background: linear-gradient(90deg, rgba(220, 38, 38,0.24), rgba(220, 38, 38,0.14));
          border-color: rgba(248, 113, 113,0.5);
          box-shadow: 0 8px 18px rgba(220, 38, 38,0.18);
        }
        .name { color: #fffffe; font-weight: 600; font-size: 0.875rem; }
        .dash { color: #ffffff80; }
        .phoneChip {
          color: #fffffe;
          font-weight: 800;
          letter-spacing: 0.25px;
          padding: 2px 8px;
          border-radius: 9px;
          background: linear-gradient(90deg, rgba(220, 38, 38,0.28), rgba(220, 38, 38,0.16));
          border: 1px solid rgba(248, 113, 113,0.5);
          text-shadow: 0 0 5px rgba(0,0,0,0.35);
          font-size: 0.75rem;
        }
        .iconLink {
          color: #fffffecc;
          transition: color 180ms ease, filter 180ms ease, transform 180ms ease;
        }
        .iconLink:hover {
          color: #fffffe;
          filter: drop-shadow(0 0 6px rgba(220, 38, 38,0.55));
          transform: translateY(-1px);
        }
      `}</style>
    </footer>
  )
}
