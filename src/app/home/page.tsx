"use client";
import Card from "@/Components/Card";
import NavBar from "@/Components/NavBar";
import { GET_ALL_USERS_URL } from "@/constants/Constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const routes = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == undefined || null || "") {
      routes.push("/");
    }
    axios
      .get(GET_ALL_USERS_URL, {
        headers: {
          Authorization: token,
        },
      })
      .then((responseFromBackend: any) =>
        setUsers(responseFromBackend.data.users)
      );
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex flex-wrap">
      {users.map((val: any, index: number) => {
        return (
          <Card
            key={index}
            name={val.nameOfUser}
            email={val.emailOfUser}
            phone={val.phoneNumber}
          />
        );
      })}
      </div>
    </>
  );
};

export default Home;
