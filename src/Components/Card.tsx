import React from "react";

const Card = (props: any) => {
  return (
    <>
      <div className="w-1/3 p-4">
        <div className="pt-4 rounded-lg bg-blue-400 ">
          <h1 className="text-center text-2xl"> {props.name}</h1>
          <h3 className="text-center text-xl"> {props.email}</h3>
          <h3 className="text-center"> {props.phone}</h3>
        </div>
      </div>
    </>
  );
};

export default Card;
