import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <>
      <menu
        id="admin-menu"
        className="w-[250px] bg-slate-800 h-[calc(100vh-64px)] text-white"
      >
        <div className="flex flex-col p-3">
          <NavLink
            end
            to="/admin"
            className="px-3 py-4 hover:bg-slate-700 rounded transition-all"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/user-manager"
            className="px-3 py-4 hover:bg-slate-700 rounded transition-all"
          >
            User Manager
          </NavLink>
          <NavLink
            to="/admin/category-manager"
            className="px-3 py-4 hover:bg-slate-700 rounded transition-all"
          >
            Category Manager
          </NavLink>
          <NavLink
            to="product-manager"
            className="px-3 py-4 hover:bg-slate-700 rounded transition-all"
          >
            Product Manager
          </NavLink>
        </div>
      </menu>
    </>
  );
}
