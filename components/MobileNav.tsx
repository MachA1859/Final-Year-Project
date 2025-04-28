"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Footer from "./Footer";
import { Menu } from "lucide-react";
import { IoAlert } from "react-icons/io5";

const MobileNav = ({user}: MobileNavProps) => {
    const pathname = usePathname();
    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger>
                    <Menu size={24} className="cursor-pointer" />
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-white">
                    <SheetHeader>
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    </SheetHeader>
                    <Link href="/" className="cursor-pointer flex items-center gap-1 px-4 pl-10">
                        <Image
                            src="/icons/myntpay_logo-removebg-preview.png"
                            width={60}
                            height={60}
                            alt="MyntPay Logo"
                        />
                        <h1 className='text-26 font-geist-sans font-bold text-black-1'>MyntPay</h1>
                    </Link>
                    <div className="mobilenav-sheet pl-10">
                        <SheetClose asChild>
                            <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                                {sidebarLinks.map((item) => {
                                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

                                    return (
                                        <Link href={item.route} key={item.label}
                                            className={cn("mobilenav-sheet_close w-full", { "sidebar-button-gradient": isActive })}
                                        >
                                            <div className="relative size-6">
                                                {item.icon ? (
                                                    <IoAlert 
                                                        className={cn("size-6 text-gray-600", {
                                                            'text-white': isActive
                                                        })}
                                                    />
                                                ) : item.imgURL ? (
                                                    <Image
                                                        src={item.imgURL}
                                                        alt={item.label}
                                                        fill
                                                        className={cn({
                                                            'brightness-[3] invert-0': isActive
                                                        })}
                                                    />
                                                ) : null}
                                            </div>
                                            <p className={cn("text-16 font-semibold text-black-2", { "!text-white": isActive })}>
                                                {item.label}
                                            </p>
                                        </Link>
                                    )
                                })}

                                USER
                            </nav>
                        </SheetClose>

                        <Footer user={user} type="mobile" />
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav