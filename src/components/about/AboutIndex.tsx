"use client";
import React from "react";
import Link from "next/link";
import { Info, Atom, MessageSquare } from "lucide-react";
import ComponentHeader from "@/components/ComponentHeader/ComponentHeader";

const About: React.FC = () => {
  return (
    <>
      <ComponentHeader pageName="About ProteinBind" />

      <div className="rounded-lg border border-stroke bg-gradient-to-r from-blue-100 to-green-100 shadow-lg dark:border-strokedark dark:bg-gradient-to-r dark:from-blue-900 dark:to-green-900">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full max-w-6xl px-4 py-8">
            <p className="mb-8 text-lg font-light text-gray-800 dark:text-gray-200">
              ProteinBind is an advanced platform that empowers researchers and developers to visualize molecular structures,
              generate custom molecules using SMILES notation, and collaborate in real-time using group messaging features.
              Leveraging AI and modern web technologies, ProteinBind aims to streamline the molecular research process,
              facilitating faster insights and improved decision-making.
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* div 1 */}
              <div className="flex flex-col rounded-lg border border-stroke bg-white p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out dark:border-strokedark dark:bg-boxdark">
                <Info size={48} className="text-blue-500 mb-4 self-center" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center">Visualize Molecular Structures</h3>
                <p className="text-base text-gray-600 dark:text-gray-300 text-center mt-4">
                  Our platform provides powerful tools for visualizing complex molecular structures with ease.
                </p>
              </div>
              {/* div 2 */}
              <div className="flex flex-col rounded-lg border border-stroke bg-white p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out dark:border-strokedark dark:bg-boxdark">
                <Atom size={48} className="text-yellow-500 mb-4 self-center" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center">Generate Custom Molecules</h3>
                <p className="text-base text-gray-600 dark:text-gray-300 text-center mt-4">
                  Create and modify molecules using SMILES notation to suit your research needs.
                </p>
              </div>
              {/* div 3 */}
              <div className="flex flex-col rounded-lg border border-stroke bg-white p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out dark:border-strokedark dark:bg-boxdark">
                <MessageSquare size={48} className="text-green-500 mb-4 self-center" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center">Real-Time Collaboration</h3>
                <p className="text-base text-gray-600 dark:text-gray-300 text-center mt-4">
                  Collaborate with peers using our integrated group messaging features.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/contact"
                className="inline-block rounded-lg border border-primary bg-primary p-4 text-white text-lg font-medium transition-all duration-300 hover:bg-primary-dark"
              >
                Contact Us
              </Link>
              <div className="mt-6 space-y-2 text-gray-700 dark:text-gray-300">
                <p>
                  Don’t have an account?{" "}
                  <Link href="/auth-page/signup" className="text-primary hover:underline">
                    Sign Up
                  </Link>
                </p>
                <p>
                  Already have an account?{" "}
                  <Link href="/auth-page/signin" className="text-primary hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
