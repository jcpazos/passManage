import React from "react";
import { useRecoilState } from "recoil";
import { loginState } from "../atoms/loginAtom";
import EditLogin from "../components/EditLogin";

function Right() {
  const [login, setLogin] = useRecoilState(loginState);

  return (
    <div className="lg:max-w-[15rem]">
      {login === "new" ? (
        <EditLogin />
      ) : (
        <div>
          <h1>{login?.name}</h1>
          <h1>{login?.username}</h1>
        </div>
      )}
    </div>
  );
}

export default Right;
