import React, { useEffect } from "react";
import {
  FlagIcon,
  CubeTransparentIcon,
  StarIcon,
  ExclamationIcon,
  LockOpenIcon,
  KeyIcon,
  RefreshIcon,
  ExclamationCircleIcon,
  ShieldExclamationIcon,
  WifiIcon,
  ClockIcon,
  LockClosedIcon,
  PaperClipIcon,
  CreditCardIcon,
  IdentificationIcon,
  ArchiveIcon,
} from "@heroicons/react/solid";
import LeftComponent from "./LeftComponent";
import { useAuthUser } from "next-firebase-auth";

function Left() {
  const AuthUser = useAuthUser();

  useEffect(() => {
    var resize = document.getElementById("sidebar-resize");
    var left = document.getElementById("sidebar-left");
    var container = document.getElementById("sidebar-container");
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
      if (drag && moveX > 200 && moveX < 250)
        left.style.width =
          moveX - resize.getBoundingClientRect().width / 2 + "px";
    });

    container.addEventListener("mouseup", function (e) {
      drag = false;
    });
  }, []);

  return (
    <div
      id="sidebar-container"
      className="text-gray-200 text-xs lg:text-sm min-w-max  border-r border-gray-900
    overflow-y-scroll scrollbar-hide  h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex
    pb-36 bg-gray-500 float-left"
    >
      <div id="sidebar-left" className="w-max flex-shrink">
        <div className="pl-5 pt-5 pb-3 flex items-center hover:bg-gray-400 hover:cursor-default">
          <FlagIcon className="text-white bg-blue-500 rounded w-10 h-10  border-gray-500" />
          <div className="flex-col">
            <h1 className="text-grey-500 pl-2">
              {AuthUser.displayName ? AuthUser.displayName : "Anonymous"}
            </h1>
            <h2 className="text-grey-500 pl-2">1 vaults</h2>
          </div>
        </div>

        <LeftComponent icon="cubeIcon" description="All items" />
        <LeftComponent icon="starIcon" description="Favorites" />

        <br></br>
        {/*Watchtower Icons*/}
        <div className="pl-1 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400 hover:cursor-default">
          <h2 className="text-grey-500 pl-4">WATCHTOWER</h2>
        </div>

        <LeftComponent
          icon="exclamationIcon"
          description="Compromised Websites"
        />

        <LeftComponent icon="lockOpenIcon" description="Vulnerable Passwords" />

        <LeftComponent icon="refreshIcon" description="Reused Passwords" />

        <LeftComponent
          icon="exclamationCircleIcon"
          description="Weak Passwords"
        />

        <LeftComponent
          icon="shieldExclamationIcon"
          description="Unsecured Websites"
        />

        <LeftComponent
          icon="wifiIcon"
          description="Two-Factor Authentication"
        />

        <LeftComponent icon="clockIcon" description="Expiring" />

        <br></br>
        {/*Categories Icons*/}
        <div className="pl-1 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400 hover:cursor-default">
          <h2 className="text-grey-500 pl-4">CATEGORIES</h2>
        </div>
        <LeftComponent icon="lockClosedIcon" description="Logins" />

        <LeftComponent icon="paperClipIcon" description="Secure Notes" />

        <LeftComponent icon="creditCardIcon" description="Credit Cards" />

        <LeftComponent icon="identificationIcon" description="Identities" />

        <LeftComponent icon="archiveIcon" description="Archives" />

        <LeftComponent icon="keyIcon" description="Passwords" />

        <br></br>
        {/*Tags Icons*/}
        <div className="pl-1 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400 hover:cursor-default">
          <h2 className="text-grey-500 pl-4">TAGS</h2>
        </div>

        <LeftComponent icon="archiveIcon" description="Archive" />
      </div>
      <div
        className="bg-gray-500 flex-shrink-0 pt-0 overflow-y-scroll scrollbar-hide  h-screen w-1 opacity-0 hover:opacity-100 "
        style={{ cursor: "col-resize" }}
        id="sidebar-resize"
      ></div>
    </div>
  );
}

export default Left;
