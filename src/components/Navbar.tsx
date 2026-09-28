import { useState, useEffect } from 'react';
import { Send, Menu, X, ArrowUpRight, TrendingUp, Globe } from 'lucide-react';

interface NavbarProps {
  onOpenModal: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A3D91] border-b-2 border-[#F5B400] py-3 shadow-xl'
          : 'bg-[#0A3D91]/95 border-b border-white/10 py-4 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl lg:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex items-baseline font-display font-black tracking-tight text-3xl leading-none">
              <span className="text-[#F5B400] group-hover:text-amber-300 transition-colors duration-300">B</span>
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F5B400] group-hover:bg-amber-300 transition-colors duration-300 mx-1 relative top-[-1px] shadow-[0_0_12px_rgba(245,180,0,0.5)] overflow-hidden">
                <div className="flex items-end gap-[2px] h-4">
                  <div className="w-[3px] h-2 bg-[#0A3D91] rounded-sm" />
                  <div className="w-[3px] h-3.5 bg-[#0A3D91] rounded-sm animate-[pulse_1.5s_infinite]" />
                  <div className="w-[3px] h-2.5 bg-[#0A3D91] rounded-sm" />
                </div>
              </div>
              <span className="text-[#F5B400] group-hover:text-amber-300 transition-colors duration-300">A</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-display font-black tracking-widest text-white group-hover:text-[#F5B400] transition-colors duration-300 block leading-tight">
                BOA INTERNATIONAL ACADEMY
              </span>
              <span className="text-[9px] text-[#F5B400] flex items-center gap-1 leading-none font-mono tracking-widest mt-0.5">
                <span>GLOBAL TRADING COMMUNITY</span>
                <Globe className="w-3 h-3 text-[#F5B400]" />
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {[
              { label: 'Features', id: 'features' },
              { label: 'LiveChart', id: 'livechart' },
              { label: 'Signals', id: 'signals' },
              { label: 'Pricing', id: 'pricing' },
              { label: 'FAQ', id: 'faq' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className="text-sm font-semibold text-white hover:text-[#F5B400] transition cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://t.me/boacademy_bot"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm font-bold text-[#F5B400] hover:text-amber-300 transition"
            >
              <Send className="w-4 h-4" />
              <span>Telegram Channel</span>
            </a>
            <a
              href="https://t.me/boacademy_bot"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm font-bold text-white hover:text-[#F5B400] transition"
            >
              <Send className="w-4 h-4 text-[#F5B400]" />
              <span>Support</span>
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden sm:flex flex-col items-end">
            <a
              href="https://t.me/boacademy_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-[#F5B400] hover:bg-[#e0a400] text-[#1F2937] font-display font-black text-xs tracking-wider rounded-lg shadow-md transition cursor-pointer flex items-center gap-1.5 uppercase"
            >
              <span>GET STARTED FOR FREE</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#1F2937]" />
            </a>
            <span className="text-[9px] text-blue-200 font-bold mt-0.5 uppercase tracking-wider">
              TELEGRAM OFFICIAL LINK
            </span>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-white hover:text-[#F5B400] transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A3D91] border-b-2 border-[#F5B400] px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="flex flex-col gap-4">
            {[
              { label: 'Features', id: 'features' },
              { label: 'LiveChart', id: 'livechart' },
              { label: 'Signals', id: 'signals' },
              { label: 'Pricing', id: 'pricing' },
              { label: 'FAQ', id: 'faq' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className="text-left py-2 text-base font-semibold text-white hover:text-[#F5B400] transition"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://t.me/boacademy_bot"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 py-2 text-base font-bold text-[#F5B400] hover:text-amber-300 transition"
            >
              <Send className="w-5 h-5" />
              <span>Telegram Channel</span>
            </a>
            <a
              href="https://t.me/boacademy_bot"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 py-2 text-base font-bold text-white hover:text-[#F5B400] transition"
            >
              <Send className="w-5 h-5 text-[#F5B400]" />
              <span>Support (@boacademy_bot)</span>
            </a>

            <div className="pt-2 border-t border-white/20">
              <a
                href="https://t.me/boacademy_bot"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-[#F5B400] text-[#1F2937] font-black text-center rounded-lg shadow-lg transition text-sm tracking-wider font-display block uppercase"
              >
                GET STARTED FOR FREE
              </a>
              <div className="text-center text-[10px] text-blue-200 mt-1 uppercase">
                Direct Official Access
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
