"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/app/Context/UserContext";
import { signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, Settings, User2, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ClickOutside from "@/components/ClickOutside";
import { useSession } from "next-auth/react";


const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useUser();
  const router = useRouter();

  const { data: session } = useSession();
  const user_1 = session?.user?.email

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth-page/signin");
  };

  const handleLogin = async () => {
    router.push("/auth-page/signin");
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user.firstName} {user.lastName}
          </span>
          <span className="block text-xs">{user.jobTitle}</span>
        </span>

        <span className="h-11 w-11 rounded-full">
          <Image
            width={80}
            height={80}
            src={user.photo}
            className="rounded-full"
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="User"
          />
        </span>

        <ChevronDown />
      </Link>

      {dropdownOpen && (
        <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <User2 />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <Settings />
                Account Settings
              </Link>
            </li>
          </ul>
          {
            user_1 && (
              <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          >
            <LogOut />
            Log Out
          </button>
            )
          }
          {
            !user_1 && (
              <button
            onClick={handleLogin}
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          >
            <LogIn />
            Sign In
          </button>
            )
          }
          
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;