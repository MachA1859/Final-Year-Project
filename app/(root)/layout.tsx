import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Image from "next/image";
import { ThemeProvider } from "@/context/ThemeContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if(!loggedIn) redirect("/sign-in");

  return (
    <ThemeProvider>
      <main className="flex h-screen w-full font-geist-sans no-scrollbar">
          <Sidebar user={loggedIn}/>

          <div className="flex size-full flex-col no-scrollbar">
            <div className="root-layout">
              <Image 
                src="/icons/myntpay_logo-removebg-preview.png"
                width={60}
                height={60}
                alt="logo"
              />
              <div>
                <MobileNav
                  user={loggedIn}
                />
              </div>
            </div>
            {children}
          </div>
      </main>
    </ThemeProvider>
  );
}
