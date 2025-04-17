"use client";

import {
    Sheet,
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

const MobileNav = ({user}: MobileNavProps) => {
    const pathname = usePathname();
    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src="/icons/hamburger.svg"
                        width={30}
                        height={30}
                        alt="menu"
                        className="cursor-pointer"
                    />
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-white">
                    <Link href="/" className="cursor-pointer flex items-center gap-1 px-4">
                        <Image
                            src="/icons/myntpay_logo-removebg-preview.png"
                            width={60}
                            height={60}
                            alt="MyntPay Logo"
                        />
                        <h1 className='text-26 font-geist-sans font-bold text-black-1'>MyntPay</h1>
                    </Link>

                    {sidebarLinks.map((item) => {
                        const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

                        return (
                            <Link href={item.route} key={item.label}
                                className={cn("sidebar-link", "bg-bank-gradient")}
                            >
                                <div className='relative size-6'>
                                    <Image
                                        src={item.imgURL}
                                        alt={item.label}
                                        fill
                                        className={cn({
                                            'brightness-[3] invert-0': isActive
                                        })}
                                    />
                                </div>
                                <p className={cn("sidebar-label", {"!text-white": isActive})}>
                                    {item.label}
                                </p>
                            </Link>
                            )
                        })
                    }
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav