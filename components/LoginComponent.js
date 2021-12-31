import { LoginIcon } from "@heroicons/react/solid";
import React from "react";

function LoginComponent({ name, username }) {
  return (
    <div className=" pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400 hover:cursor-default">
      <LoginIcon className="text-whiterounded w-10 h-10 border-r border-gray-500"></LoginIcon>
      <div className="flex-col">
        <h1 className="text-gray-500 pl-2">{name}</h1>
        <h2 className="text-gray-500 pl-2">{username}</h2>
      </div>
    </div>
  );
}

export default LoginComponent;
