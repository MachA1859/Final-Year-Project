"use client";

import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Footer from './Footer';
import { IoAlert } from "react-icons/io5";

const Sidebar = ({user}: SidebarProps) => {
    const pathname = usePathname();

    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-4">
                <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
                    <Image
                        src="/icons/myntpay_logo-removebg-preview.png"
                        width={60}
                        height={60}
                        alt="MyntPay Logo"
                        className="size-[48px] max-xl:size-14"
                    />
                    <h1 className='myntpay-gradient max-xl:hidden'>MyntPay</h1>
                </Link>

                {sidebarLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

                    return (
                        <Link href={item.route} key={item.label}
                            className={cn("sidebar-link", { "sidebar-button-gradient": isActive })}
                        >
                            <div className='relative size-6'>
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
                            <p className={cn("sidebar-label", {"!text-white": isActive})}>
                                {item.label}
                            </p>
                        </Link>
                        )
                })}
            </nav>
                
            <Footer user={user} />
        </section>
    )
}

export default Sidebar