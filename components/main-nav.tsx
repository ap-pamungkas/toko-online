"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { usePathname, useParams } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  const params = useParams();
  const pathname = usePathname();

  const routes = [
    {
      href: `${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `${params.storeId}/settings`,
    },
  ];
  return (
    <nav
      className={cn("flex items-center flex-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link 
        key={route.href} 
        href={route.href} className={cn("text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-dark dark:text-white" : "text-muted-foreground"
        )}>

          {route.label}
        </Link>
      ))}
    </nav>
  );
}
