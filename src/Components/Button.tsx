import React from 'react'

const Button = (props:any) => {
  return (
    <>
      <button 
      onClick={props.onClick}
      className='text-white bg-blue-700 p-1 w-40 ml-64 mt-4 rounded-lg' >{props.btnText}</button>
    </>
  )
}

export default Button