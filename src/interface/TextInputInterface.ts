import { ChangeEventHandler } from "react";

export interface TextInputInterface{
    onChange:ChangeEventHandler<HTMLInputElement>|undefined,
    value?:string;
    placeholder:string;
    type:string;
    name:string;
    error:string;
    isError:boolean
}