"use client";
import dynamic from "next/dynamic";
import React from "react";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import ComponentHeader from "@/components/ComponentHeader/ComponentHeader";
import CTACard from "./components/CTAcard";
import { AtomIcon, MessageCircle, Network, SearchIcon } from "lucide-react";

const DashboardCardMap = dynamic(
  () => import("./components/DashboardCardMap"),
  { ssr: false }
);

const DashboardCardChat = dynamic(
  () => import("./components/DashboardCardChat"),
  { ssr: false }
);

const Dashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <ComponentHeader pageName="Dashboard" />

      <div className="flex-grow p-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 mb-12">
          <CTACard 
            subtitle="Access more molecules" 
            title="Molecule Bank" 
            className="bg-blue-200 hover:bg-blue-300 hover:shadow-xl transition-all duration-300 rounded-lg"
          >
            <AtomIcon className="text-blue-600 text-4xl" />
          </CTACard>
          <CTACard 
            subtitle="Create new molecules" 
            title="Generate Molecule" 
            className="bg-green-200 hover:bg-green-300 hover:shadow-xl transition-all duration-300 rounded-lg"
          >
            <Network className="text-green-600 text-4xl" />
          </CTACard>
          <CTACard 
            subtitle="Find compounds" 
            title="Search Compounds" 
            className="bg-yellow-200 hover:bg-yellow-300 hover:shadow-xl transition-all duration-300 rounded-lg"
          >
            <SearchIcon className="text-yellow-600 text-4xl" />
          </CTACard>
          <CTACard 
            subtitle="Work together" 
            title="Collaborative Research" 
            className="bg-purple-200 hover:bg-purple-300 hover:shadow-xl transition-all duration-300 rounded-lg"
          >
            <MessageCircle className="text-purple-600 text-4xl" />
          </CTACard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Chat</h2>
            <DashboardCardChat />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Map</h2>
            <DashboardCardMap />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
