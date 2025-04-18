import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = {firstName: "Maciej", lastName: "Lapczynski"};

  return (
    <main className="flex h-screen w-full font-geist-sans">
        <Sidebar user={loggedIn}/>

        <div className="flex size-full flex-col">
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
  );
}
