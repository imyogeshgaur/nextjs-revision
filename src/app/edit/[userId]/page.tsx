"use client";

import TextInput from "@/Components/TextInput";
import { EDIT_A_USER_URL, GET_SINGLE_USER_URL } from "@/constants/Constants";
import { UserDetailInterface } from "@/interface/AuthInterface";
import { TextInputInterface } from "@/interface/TextInputInterface";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Edit = ({ params }: any) => {
  const routes = useRouter();
  useEffect(() => {
    if (params !== null || undefined) {
      axios
        .get(GET_SINGLE_USER_URL, {
          headers: {
            Authorization: params.userId,
          },
        })
        .then((responseFromBackend: any) =>
          setUser({
            nameOfUser: responseFromBackend.data.users.nameOfUser,
            emailOfUser: responseFromBackend.data.users.emailOfUser,
            phoneNumber: responseFromBackend.data.users.phoneNumber,
          })
        );
    }
  }, []);

  const [user, setUser] = useState<UserDetailInterface>({
    nameOfUser: "",
    emailOfUser: "",
    phoneNumber: "",
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
  ];

  const editUserAPI = async()=>{
      try {
        const response = await axios.put(EDIT_A_USER_URL,{
          nameOfUser:user.nameOfUser,
          emailOfUser:user.emailOfUser,
          phoneNumber:user.phoneNumber
        },{
          headers:{
            Authorization:params.userId
          }
        })
        const data = await response.data;
        if(data.status===200){
          routes.push("/home")
        }
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <>
      <div
        className="rounded-lg bg-yellow-200 p-4 "
        style={{ margin: "13rem 40rem" }}
      >
        <h1 className="text-center text-2xl">Edit Details</h1>
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

        <button 
        className="bg-yellow-500 text-white rounded-lg p-2 w-40 ml-44 mt-4"
        onClick={editUserAPI}
        >
          Edit
        </button>

        <p className="ml-36 mt-4 pb-3">
          Not sure about details?
          <Link href={"/home"}> Go back </Link>
        </p>
      </div>
    </>
  );
};

export default Edit;
