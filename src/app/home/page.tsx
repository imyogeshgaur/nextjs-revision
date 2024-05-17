"use client";
import dynamic from "next/dynamic";
const HomePage = dynamic(() => import("@/app/pages/HomePage"));

const Home = () => {
  return <HomePage />;
};

export default Home;
