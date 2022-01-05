import { LoginIcon, PlusSmIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { editState } from "../atoms/editAtom";
import { loginState } from "../atoms/loginAtom";
import { vaultState } from "../atoms/vaultAtom";
import LoginComponent from "./LoginComponent";

function Center() {
  const [vault, setVault] = useRecoilState(vaultState);
  const [login, setLogin] = useRecoilState(loginState);
  const [edit, setEdit] = useRecoilState(editState);

  useEffect(() => {
    var resize = document.getElementById("sidebar-center-resize");
    var left = document.getElementById("sidebar-center-left");
    var container = document.getElementById("sidebar-center-container");
    var moveX =
      left.getBoundingClientRect().width +
      resize.getBoundingClientRect().width / 2;

    var drag = false;
    resize.addEventListener("mousedown", function (e) {
      drag = true;
      moveX = e.x;
    });

    container.addEventListener("mousemove", function (e) {
      moveX = e.x;
      if (drag && moveX > 200)
        left.style.width =
          moveX - resize.getBoundingClientRect().width / 2 + "px";
    });

    container.addEventListener("mouseup", function (e) {
      drag = false;
    });
  }, []);

  const addLogin = () => {
    setEdit(null);
    setLogin("new");
  };

  return (
    <div
      id="sidebar-center-container"
      className="flex text-gray-500 text-xs lg:text-sm  border-r border-gray-900
    overflow-y-scroll  h-screen sm:max-w-[12rem] lg:max-w-[30rem] md:inline-flex
    pb-36 bg-white"
    >
      <div id="sidebar-center-left" className="space-y-4  flex-shrink w-80 ">
        <div className="flex-grow">
          <div className="bg-gray-300 h-10 flex justify-center">
            <h1 className="pt-2">{vault?.length + " items"}</h1>
          </div>
          <div className="flex justify-end">
            <PlusSmIcon
              onClick={addLogin}
              className="text-gray-400 bg-white rounded w-10 h-10 border-2 border-gray-600 hover:cursor-pointer button"
            />
          </div>
        </div>

        <div className="pl-5 flex-col">
          {vault?.map((login) => (
            <div
              key={login.name}
              onClick={() => {
                setEdit(null);
                setLogin(login);
              }}
            >
              <LoginComponent name={login.name} username={login.username} />
            </div>
          ))}
        </div>
      </div>
      <div
        className="bg-gray-500 flex-shrink-0 pt-0 overflow-y-scroll  scrollbar-hide h-screen w-1 opacity-0 hover:opacity-100"
        style={{ cursor: "col-resize" }}
        id="sidebar-center-resize"
      ></div>
    </div>
  );
}

export default Center;
