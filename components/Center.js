import React, { useEffect } from "react";

function Center() {
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
      id="sidebar-center-container"
      className="text-gray-500 pl-5 pt-5 text-xs lg:text-sm  border-r border-gray-900
    overflow-y-scroll  h-screen sm:max-w-[12rem] lg:max-w-[30rem] hidden md:inline-flex
    pb-36"
    >
      <div id="sidebar-center-left" className="space-y-4  flex-shrink">
        <h1>Center</h1>
      </div>
      <div
        className="bg-gray-500 flex-shrink-0 pt-0 overflow-y-scroll scrollbar-hide  h-screen w-1 opacity-0 hover:opacity-100"
        style={{ cursor: "col-resize" }}
        id="sidebar-center-resize"
      ></div>
    </div>
  );
}

export default Center;
