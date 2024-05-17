"use client";
import dynamic from "next/dynamic";
const RegisterPage = dynamic(() => import("@/app/pages/RegisterPage"));

const Register = () => {
  return <RegisterPage />;
};

export default Register;
