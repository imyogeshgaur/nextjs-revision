"use client";
import Button from "@/Components/Button";
import TextInput from "@/Components/TextInput";
import { LoginInterface } from "@/interface/AuthInterface";
import { TextInputInterface } from "@/interface/TextInputInterface";
import { isValidEmail } from "@/validations/validate";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  LOGIN_EMAIL_API_URL,
  LOGIN_PHONE_API_URL,
} from "@/constants/Constants";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      router.push("/home");
    }
  }, []);

  const [user, setUser] = useState<LoginInterface>({
    emailOrPhone: "",
    password: "",
  });

  const [emailOrPhoneError, setEmailOrPhoneError] = useState({
    errorText: "",
    errorState: false,
  });
  const [passwordError, setPasswordError] = useState({
    errorText: "",
    errorState: false,
  });

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    setEmailOrPhoneError({
      errorState: false,
      errorText: "",
    });
    setPasswordError({
      errorState: false,
      errorText: "",
    });
  };

  const propsArray = [
    {
      type: "text",
      name: "emailOrPhone",
      placeholder: "Enter Your Email Or Phone",
      onChange: onChangeHandler,
      value: user.emailOrPhone,
      error: emailOrPhoneError.errorText,
      isError: emailOrPhoneError.errorState,
    },
    {
      type: "password",
      name: "password",
      placeholder: "Enter Your Password",
      onChange: onChangeHandler,
      value: user.password,
      error: passwordError.errorText,
      isError: passwordError.errorState,
    },
  ];

  const loginUserAPI = async () => {
    try {
      if (!user.emailOrPhone) {
        setEmailOrPhoneError({
          errorState: true,
          errorText: "Please fill this field",
        });
      }
      if (!user.password) {
        setPasswordError({
          errorState: true,
          errorText: "Please fill this field",
        });
      }
      if (!emailOrPhoneError.errorState || !passwordError.errorState) {
        if (isValidEmail(user.emailOrPhone)) {
          const response = await axios.post(LOGIN_EMAIL_API_URL, {
            emailOrPhone: user.emailOrPhone,
            password: user.password,
          });
          const data = await response.data;
          if (data.message.length < 45) {
            setEmailOrPhoneError({
              errorText: data.message,
              errorState: true,
            });
            setPasswordError({
              errorText: data.message,
              errorState: true,
            });
          } else {
            localStorage.setItem("token", data.message);
            router.push("/home");
          }
        } else {
          const response = await axios.post(LOGIN_PHONE_API_URL, {
            emailOrPhone: user.emailOrPhone,
            password: user.password,
          });
          const data = await response.data;
          if (data.message.length < 45) {
            setEmailOrPhoneError({
              errorText: data.message,
              errorState: true,
            });
            setPasswordError({
              errorText: data.message,
              errorState: true,
            });
          } else {
            localStorage.setItem("token", data.message);
            router.push("/home");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ml-96 mr-96 mt-40 bg-blue-400 pb-5 px-2 pt-2 rounded-lg">
      <h1 className="text-center text-2xl">Login Here</h1>

      {propsArray.map((val: TextInputInterface, index: any) => (
        <TextInput
          key={index}
          type={val.type}
          onChange={val.onChange}
          value={val.value}
          placeholder={val.placeholder}
          name={val.name}
          error={val.error}
          isError={val.isError}
        />
      ))}

      <Button
        onClick={loginUserAPI}
        btnText={"Login"}
        backgroundColor={"blue"}
        textColor={"white"}
      />
      <p className="ml-44 mt-4">
        New Here?
        <Link href={"/register"}> Register Here</Link>
      </p>
    </div>
  );
}
