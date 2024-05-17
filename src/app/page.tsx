"use client";
import dynamic from "next/dynamic";
const LoginPage = dynamic(() => import("@/app/pages/LoginPage"));

const Home = () => {
  return <LoginPage />;
};

export default Home;
