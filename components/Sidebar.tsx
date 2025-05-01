"use client";

import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Footer from './Footer';
import { IoAlert } from "react-icons/io5";
import { useTheme } from '@/context/ThemeContext';
import { Switch } from '@/components/ui/switch';

const Sidebar = ({user}: SidebarProps) => {
    const pathname = usePathname();
    const { isDarkMode, toggleDarkMode } = useTheme();

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

            <div className="flex items-center justify-between px-4 py-2 mb-4">
                <span className="text-14 font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
                <Switch
                    checked={isDarkMode}
                    onCheckedChange={toggleDarkMode}
                    className="data-[state=checked]:bg-primary"
                />
            </div>
                
            <Footer user={user} />
        </section>
    )
}

export default Sidebar