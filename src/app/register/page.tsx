"use client";
import Button from "@/Components/Button";
import TextInput from "@/Components/TextInput";
import { RegisterInterface } from "@/interface/AuthInterface";
import { TextInputInterface } from "@/interface/TextInputInterface";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { REGISTER_API_URL } from "@/constants/Constants";
import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
} from "@/validations/validate";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [user, setUser] = useState<RegisterInterface>({
    nameOfUser: "",
    emailOfUser: "",
    phoneNumber: "",
    password: "",
  });
  const [nameError, setNameError] = useState({
    errorText: "",
    errorState: false,
  });
  const [emailError, setEmailError] = useState({
    errorText: "",
    errorState: false,
  });
  const [phoneError, setPhoneError] = useState({
    errorText: "",
    errorState: false,
  });
  const [passwordError, setPasswordError] = useState({
    errorText: "",
    errorState: false,
  });

  const onChangeHandler = (e: any) => {
    const { name, value }: any = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    setNameError({
      errorState: false,
      errorText: "",
    });
    setEmailError({
      errorState: false,
      errorText: "",
    });
    setPhoneError({
      errorState: false,
      errorText: "",
    });
    setPasswordError({
      errorState: false,
      errorText: "",
    });
  };

  const propsArray: Array<TextInputInterface> = [
    {
      type: "text",
      name: "nameOfUser",
      placeholder: "Enter Your Name",
      onChange: onChangeHandler,
      value: user.nameOfUser,
      error: nameError.errorText,
      isError: nameError.errorState,
    },
    {
      type: "email",
      name: "emailOfUser",
      placeholder: "Enter Your Email",
      onChange: onChangeHandler,
      value: user.emailOfUser,
      error: emailError.errorText,
      isError: emailError.errorState,
    },
    {
      type: "tel",
      name: "phoneNumber",
      placeholder: "Enter Your Phone",
      onChange: onChangeHandler,
      value: user.phoneNumber,
      error: phoneError.errorText,
      isError: phoneError.errorState,
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

  const registerUserAPI = async () => {
    try {
      if (!user.nameOfUser) {
        setNameError({
          errorText: "Please provide Full Name",
          errorState: true,
        });
      }
      if (!user.emailOfUser) {
        setEmailError({
          errorText: "Please provide Email",
          errorState: true,
        });
      }
      if (!user.phoneNumber) {
        setPhoneError({
          errorText: "Please provide Phone Number",
          errorState: true,
        });
      }
      if (!user.password) {
        setPasswordError({
          errorText: "Please provide Password",
          errorState: true,
        });
      }
      if (!isValidEmail(user.emailOfUser) && user.emailOfUser) {
        setEmailError({
          errorText: "Email Format is Incorrect",
          errorState: true,
        });
      }

      if (!isValidPhoneNumber(user.phoneNumber) && user.phoneNumber) {
        setPhoneError({
          errorText: "Phone Number Format is Incorrect",
          errorState: true,
        });
      }

      if (!isValidPassword(user.password) && user.password) {
        setPasswordError({
          errorText: "Password format is Incorrect",
          errorState: true,
        });
      }

      if (
        !passwordError.errorState ||
        !emailError.errorState ||
        !nameError.errorState ||
        !phoneError.errorState
      ) {
       
        const response = await axios.post(REGISTER_API_URL, {
          nameOfUser: user.nameOfUser,
          emailOfUser: user.emailOfUser,
          phoneNumber: user.phoneNumber,
          password: user.password,
        });
        const data = response.data;
        if(data.message){
          router.push("/")
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="ml-96 mr-96 mt-40 pt-4 rounded-lg bg-blue-400 ">
        <h1 className="text-center text-2xl">Register Here</h1>
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

        <Button onClick={registerUserAPI} btnText={"Register"} />

        <p className="ml-56 mt-4 pb-3">
          Already have account?
          <Link href={"/"}> Login Here</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
