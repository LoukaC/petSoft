"use client";

import { usePathname } from "next/navigation";
import Logo from "./logo";
import Link from "next/link";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
  },
  {
    label: "Account",
    path: "/app/account",
  },
];

export default function Header() {
  const activePathname = usePathname();

  return (
    <header className="flex justify-between items-center py-2 border-b border-white/10 ">
      <Logo />
      <nav>
        <ul className="flex gap-2 text-xs">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className={cn(
                  "text-white/70 px-2 py-1 rounded-sm hover:text-white focus:text-white transition",
                  {
                    "bg-black/10 text-white": activePathname === route.path,
                    //cn for conditional className
                  }
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
