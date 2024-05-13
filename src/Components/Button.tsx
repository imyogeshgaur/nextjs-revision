import React from "react";

const Button = (props: any) => {
  return (
    <>
      {props.backgroundColor == "red" ? (
        <button
          onClick={props.onClick}
          className={`text-white bg-red-700 p-2 w-40 ml-44 mt-4 rounded-lg`}
        >
          {props.btnText}
        </button>
      ) : (
        <button
          onClick={props.onClick}
          className={`text-white bg-blue-700 p-2 w-40 ml-44 mt-4 rounded-lg`}
        >
          {props.btnText}
        </button>
      )}
    </>
  );
};

export default Button;
