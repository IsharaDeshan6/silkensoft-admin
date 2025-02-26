'use client';
import {ReactNode, useEffect, useState} from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardNavigation } from "@/components/admin/dashboard/DasboardNavigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {useAdminDetails} from "@/hooks/useAdminDetails";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { logout } = useAuth();
    const {adminDetails, loading, error} = useAdminDetails();
    const [avatar, setAvatar] = useState("https://github.com/shadcn.png");
    const { isAuthenticated } = useAuth();


    useEffect(() => {
        if (adminDetails) {
            setAvatar(adminDetails.admin_has_avatar ? `${process.env.NEXT_PUBLIC_API_URL}images/admin/admin.jpg?timestamp=${Date.now()}` : "https://github.com/shadcn.png");
        }
    }, [adminDetails]);

    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <div className="flex w-full flex-col px-4 sm:px-6 lg:px-8">
            <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white">
                <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <DashboardNavigation />
                </nav>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            className="shrink-0 md:hidden"
                            variant="outline"
                            size="icon"
                        >
                            <MenuIcon className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="flex flex-col gap-6 text-lg font-medium mt-5">
                            <DashboardNavigation />
                        </nav>
                    </SheetContent>
                </Sheet>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src={avatar} alt="@shadcn" />
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={'/admin/dashboard/settings'}>
                            <DropdownMenuItem asChild className={'hover:cursor-pointer'}>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem asChild className={'hover:cursor-pointer'} onClick={logout}>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <main className="my-5 w-full">{children}</main>
        </div>
    );
}
