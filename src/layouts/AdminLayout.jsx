import React from "react";
import Header from "./Header";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      <Header />

      <div className="flex">
        <Menu />

        <div className="p-6 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
