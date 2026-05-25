import { socialLinks } from '../../data/social'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
   <footer
  className="border-t border-[var(--border)] mt-0"
  role="contentinfo"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">

    {/* Logo */}
    <div className="font-headline font-bold text-xl text-primary tracking-tight">
  Ahmed Mahmoud Abdelhalim
    </div>

    {/* Social links */}
    <div className="flex gap-6">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          className="text-[var(--text)] opacity-60 hover:opacity-100 hover:text-primary transition-all duration-200 font-label text-sm uppercase tracking-widest"
          target={link.href.startsWith('mailto') ? undefined : '_blank'}
          rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
        >
          {link.label}
        </a>
      ))}
    </div>

    {/* Copyright */}
    <p className="text-[var(--text)] opacity-50 text-xs font-label tracking-wide text-center">
      © {year} Ahmed Mahmoud Abdelhalim Crafted with technical precision.
    </p>

  </div>
</footer>
  )
}
