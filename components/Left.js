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

function Left() {
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
      if (drag && moveX > 50)
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
      className="text-gray-200 text-xs lg:text-sm  border-r border-gray-900
    overflow-y-scroll scrollbar-hide  h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex
    pb-36 bg-gray-500"
    >
      {/*TODO: refactor icons into a component*/}
      <div id="sidebar-left" className="w-max flex-shrink">
        <div className="pl-5 pt-5 pb-3 flex items-center hover:bg-gray-400">
          <FlagIcon className="text-white bg-blue-500 rounded w-10 l-10 border-r border-gray-500" />
          <div className="flex-col">
            <h1 className="text-grey-500 pl-2">Jose Carlos Pazos</h1>
            <h2 className="text-grey-500 pl-2">1 vaults</h2>
          </div>
        </div>

        <div className="pl-8 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <CubeTransparentIcon className="text-whiterounded w-5 l-5 border-r border-gray-500" />
          <h2 className="text-grey-500 pl-4 truncate">All items</h2>
        </div>

        <div className="pl-8 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <StarIcon className="text-whiterounded w-5 l-5 border-r border-gray-500" />
          <h2 className="text-grey-500 pl-4 truncate">Favorites</h2>
        </div>

        <br></br>
        {/*Watchtower Icons*/}
        <div className="pl-1 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <h2 className="text-grey-500 pl-4">WATCHTOWER</h2>
        </div>

        <div className="pl-8 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <ExclamationIcon className="text-whiterounded w-5 l-5 border-r border-gray-500" />
          <h2 className="text-grey-500 pl-4 truncate">Compromised Websites</h2>
        </div>

        <div className="pl-8 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <LockOpenIcon className="text-whiterounded w-5 l-5 border-r border-gray-500" />
          <h2 className="text-grey-500 pl-4 truncate">Vulnerable Passwords</h2>
        </div>

        <div className="pl-8 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <RefreshIcon className="text-whiterounded w-5 l-5 border-r border-gray-500" />
          <h2 className="text-grey-500 pl-4 truncate">Reused Passwords</h2>
        </div>

        <div className="pl-8 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <ExclamationCircleIcon className="text-whiterounded w-5 l-5 border-r border-gray-500" />
          <h2 className="text-grey-500 pl-4 truncate">Weak Passwords</h2>
        </div>

        <div className="pl-8 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <ShieldExclamationIcon className="text-whiterounded w-5 l-5 border-r border-gray-500" />
          <h2 className="text-grey-500 pl-4 truncate">Unsecured Websites</h2>
        </div>

        <div className="pl-8 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <WifiIcon className="text-whiterounded w-5 l-5 border-r border-gray-500" />
          <h2 className="text-grey-500 pl-4 truncate">
            Two-Factor Authentication
          </h2>
        </div>

        <div className="pl-8 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <ClockIcon className="text-whiterounded w-5 l-5 border-r border-gray-500" />
          <h2 className="text-grey-500 pl-4 truncate">Expiring</h2>
        </div>

        <br></br>
        {/*Categories Icons*/}
        <div className="pl-1 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <h2 className="text-grey-500 pl-4">CATEGORIES</h2>
        </div>

        <div className="pl-8 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <LockClosedIcon className="text-whiterounded w-5 l-5 border-r border-gray-500" />
          <h2 className="text-grey-500 pl-4 truncate">Logins</h2>
        </div>

        <div className="pl-8 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <PaperClipIcon className="text-whiterounded w-5 l-5 border-r border-gray-500" />
          <h2 className="text-grey-500 pl-4 truncate">Secure Notes</h2>
        </div>

        <div className="pl-8 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <CreditCardIcon className="text-whiterounded w-5 l-5 border-r border-gray-500" />
          <h2 className="text-grey-500 pl-4 truncate">Credit Cards</h2>
        </div>

        <div className="pl-8 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <IdentificationIcon className="text-whiterounded w-5 l-5 border-r border-gray-500" />
          <h2 className="text-grey-500 pl-4 truncate">Identities</h2>
        </div>

        <div className="pl-8 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <KeyIcon className="text-whiterounded w-5 l-5 border-r border-gray-500" />
          <h2 className="text-grey-500 pl-4 truncate">Passwords</h2>
        </div>

        <br></br>
        {/*Tags Icons*/}
        <div className="pl-1 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <h2 className="text-grey-500 pl-4">TAGS</h2>
        </div>

        <div className="pl-8 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
          <ArchiveIcon className="text-whiterounded w-5 l-5 border-r border-gray-500" />
          <h2 className="text-grey-500 pl-4 truncate">Archive</h2>
        </div>
      </div>
      <div
        className="bg-gray-500 flex-shrink-0 pt-0 overflow-y-scroll scrollbar-hide  h-screen w-1 opacity-0 hover:opacity-100"
        style={{ cursor: "col-resize" }}
        id="sidebar-resize"
      ></div>
    </div>
  );
}

export default Left;
