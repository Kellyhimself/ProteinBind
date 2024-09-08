import DefaultLayout from "@/components/Layout/DefaultLayout";
import { Metadata } from "next";




//for search engine optimization
export const metadata: Metadata = {
  title: 'Protein bind',
description: 'A leading research platform for drug development',
}
import dynamic from 'next/dynamic'

/* const DashboardIndex = dynamic(() => import('@/app/Dashboard/Index'), {
  ssr: false
}) */

const AboutIndex = dynamic(() => import('@/components/about/AboutIndex'), {
  ssr: true
})



export default function Home() {
  return (
    <>
      <div className="h-screen">
        <DefaultLayout>
          <AboutIndex />
        </DefaultLayout>
      </div>
    </>
  );
}
