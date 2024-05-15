"use client";
import { DELETE_A_USER_URL } from "@/constants/Constants";
import axios from "axios";
import { useRouter } from "next/navigation";

const Card = (props: any) => {
  const routes = useRouter();

  const navigateToEditPage = () => {
    routes.push(`/edit/${props.userId}`);
  };
  const deleteUser = async () => {
    const response = await axios.delete(DELETE_A_USER_URL, {
      headers: {
        Authorization: props.userId,
      },
    });
    const data = await response.data;
    if (data.status === 200) {
      routes.refresh();
    }
  };
  return (
    <>
      <div className="w-1/3 p-4">
        <div className="pt-4 rounded-lg bg-blue-400">
          <h1 className="text-center text-2xl"> {props.name}</h1>
          <h3 className="text-center text-xl"> {props.email}</h3>
          <h3 className="text-center"> {props.phone}</h3>
          <button
            className="p-2 mb-3 bg-yellow-300 rounded-lg border-none outline-none ml-32 mt-4 w-14"
            onClick={navigateToEditPage}
          >
            <i className="fa-solid fa-pen-to-square" />
          </button>
          <button 
          className="p-2 mb-3 bg-red-500 rounded-lg border-none outline-none ml-5 mt-4 w-14"
          onClick={deleteUser}
          >
            <i className="fa-solid fa-trash" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
