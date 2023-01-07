import { getApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import logo from "../assets/circle-dev-bros-hq.webp";
import { useFirebase } from "../context/FirebaseProvider";
import { usePageContext } from "./usePageContext";

const Nav = () => {
  const app = getApp();
  const auth = getAuth(app);
  const { user } = useFirebase();

  const logout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 pt-2 z-50">
      <div className="navbar bg-neutral text-neutral-content rounded-lg pl-4 mx-2 w-[calc(100%-16px)]">
        <div className="navbar-start">
          <a
            className="btn btn-ghost normal-case text-xl rounded-full p-0"
            href="/"
          >
            <img src={logo} alt="dev bros hq logo" className="w-12 h-12" />
          </a>
        </div>
        <div className="navbar-end">
          {user?.admin ? (
            <ul className="menu menu-horizontal text-secondary">
              <li tabIndex={0}>
                <button className="btn rounded-lg">
                  Admin
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </button>
                <ul className="p-2 bg-neutral rounded-lg right-0 pt-4">
                  <li>
                    <a href="/mw2-admin">MW2 Dashboard</a>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            ""
          )}
          <ul className="menu menu-horizontal">
            <li tabIndex={0}>
              <button className="btn rounded-lg">
                Tools
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </button>
              <ul className="p-2 bg-neutral rounded-lg right-0 pt-4">
                <li>
                  <a href="/mw2-builds">MW2 Builds</a>
                </li>
                <li>
                  <a href="/magic-8">Magic 8 Ball</a>
                </li>
              </ul>
            </li>
          </ul>
          {user?.uid ? (
            <button className="btn btn-accent" onClick={logout}>
              Sign Out
            </button>
          ) : (
            <a href="/sign-in" className="btn btn-accent">
              Sign In
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
