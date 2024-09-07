"use client";
import React,{useState, useLayoutEffect} from 'react'
import Sidebar from './Sidebar'
import Header from '../Header'
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = [
    "/auth-page/signin",
    "/auth-page/signup",
    "/verify-email",
    "/reset-password",
  ];

  useLayoutEffect(() => {
    if (status === "unauthenticated" && !publicRoutes.includes(pathname)) {
      router.push("/auth-page/signin");
    }
  }, [status, router, pathname]);

  return (
    <>
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className='mx-auto max-w-screen-2xl p-4  bg-white md:p-6 2xl:p-10'>
                {children}
            </div>
        </main>
        <footer className="bg-gray-800 text-white py-4 px-6">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 ProteinBind. Developed by Kelly. All rights reserved.</p>
          </div>
        </footer>
        </div>
      </div>
    </>
  );
}