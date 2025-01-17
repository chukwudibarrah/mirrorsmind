// components/Navlinks.tsx

"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { heroin } from "@/styles/fonts";

interface NavLink {
  href: string;
  label: string;
}

export default function Navlinks({ navLinks }: { navLinks: NavLink[] }) {
  const pathname = usePathname();

  return (
    <div className={`flex space-x-8 md:space-x-24 py-16`}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
        
        return (
            <Link
            key={link.href}
            href={link.href}
            className={`menu-text ${heroin.className} ${isActive ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
