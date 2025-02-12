"use client";

import {cn} from "@/lib/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";

const links = [
    {
        name: "Dashboard",
        href: "/admin/dashboard",
    }, {
        name: "Users",
        href: "/admin/dashboard/users"
    },
    {
        name: "Categories",
        href: "/admin/dashboard/categories",
    },
    {
        name: "Models",
        href: "/admin/dashboard/models",
    },
    {
        name: "Colors",
        href: "/admin/dashboard/colors",
    },
    {
        name: "Products",
        href: "/admin/dashboard/products",
    },
    {
        name: "Orders",
        href: "/admin/dashboard/orders",
    },
    {
        name: "Settings",
        href: "/admin/dashboard/settings",
    },
];

export function DashboardNavigation() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        link.href === pathname
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    {link.name}
                </Link>
            ))}
        </>
    );
}
