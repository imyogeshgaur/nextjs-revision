import { TextInputInterface } from "@/interface/TextInputInterface";
import React from "react";

const TextInput = (props: TextInputInterface) => {
  const styleOnVisible = {
    display: "block",
    marginBottom:0
  };
  const styleOnInVisible = {
    display: "none",
    marginBottom:0
  };
  return (
    <>
      <div className="flex-row ml-40 mt-4">
        <div className="flex-col">
          <label htmlFor={props.name}>{`${props.placeholder.substring(
            11
          )}:`}</label>
        </div>
        <div className="flex-col">
          <input
            type={props.type}
            onChange={props.onChange}
            value={props.value}
            placeholder={props.placeholder}
            name={props.name}
            className="p-1 w-96 border-r-2 outline-none rounded-lg"
          />
          <p
            className="text-red-600"
            style={props.isError ? styleOnVisible : styleOnInVisible}
          >
            {props.error}
          </p>
        </div>
      </div>
    </>
  );
};

export default TextInput;
