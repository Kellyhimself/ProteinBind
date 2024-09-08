"use client";
import React, { useState, useLayoutEffect } from 'react';
import Sidebar from './Sidebar';
import Header from '../Header';
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
    "/dashboard",
    "/"
  ];

  useLayoutEffect(() => {
    if (status === "unauthenticated" && !publicRoutes.includes(pathname)) {
      router.push("/auth-page/signin");
    }
  }, [status, router, pathname]);


  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 flex-col">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1">
            <div className='mx-auto max-w-screen-2xl p-4 bg-white md:p-6 2xl:p-10'>
              {children}
            </div>
          </main>
        </div>
      </div>
      <footer className="sticky bottom-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-[#121212] dark:drop-shadow-xl py-6 px-6 border-t-1 border-gray-200 dark:border-gray-600">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 ProteinBind. Developed by Kelly. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
