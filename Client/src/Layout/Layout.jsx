import React from "react";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center ">
      <Outlet />
    </div>
  );
}

export default Layout;
