"use client";
import dynamic from "next/dynamic";
import React from "react";

import CTACard from "./components/CTAcard";
import { AtomIcon, MessageCircle, Network, SearchIcon } from "lucide-react";

const DashboardCardMap = dynamic(
  () => import("@/components/Dashboard/components/DashboardCardMap"),
  { ssr: false }
);

const DashboardCardChat = dynamic(
  () => import("@/components/Dashboard/components/DashboardCardChat"),
  { ssr: false }
);

const Index: React.FC = () => {
  return (
    <>
      <main className="flex-grow p-6 bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <CTACard subtitle="Access more molecules" title="Molecule Bank" className="bg-blue-100 hover:shadow-lg transition-shadow">
            <AtomIcon className="text-blue-500" />
          </CTACard>
          <CTACard subtitle="Create new molecules" title="Generate Molecule" className="bg-green-100 hover:shadow-lg transition-shadow">
            <Network className="text-green-500" />
          </CTACard>
          <CTACard subtitle="Find compounds" title="Search Compounds" className="bg-yellow-100 hover:shadow-lg transition-shadow">
            <SearchIcon className="text-yellow-500" />
          </CTACard>
          <CTACard subtitle="Work together" title="Collaborative Research" className="bg-purple-100 hover:shadow-lg transition-shadow">
            <MessageCircle className="text-purple-500" />
          </CTACard>
         
        </div>
        <div className="mt-18 grid grid-cols-1 lg:grid-cols-2 gap-3 flex-grow bg-gray-100">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Chat</h2>
            <DashboardCardChat />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Map</h2>
            <DashboardCardMap />
          </div>
        </div>
      
      </main>
      
      <footer className="bg-gray-800 text-white py-4 px-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 ProteinBind. Developed by Kelly. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Index;