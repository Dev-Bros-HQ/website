import { PropsWithChildren, RefObject, useRef, useState } from "react";
import { signOut } from "firebase/auth";
// @ts-ignore
import logo from "../../../assets/circle-dev-bros-hq.webp";
// @ts-ignore
import { useFirebase } from "../../../context/FirebaseProvider";
// @ts-ignore
import { auth } from "../../../context/firebaseConfig";
import { motion } from "framer-motion";
import links from "./links";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { Menu } from "iconoir-react";

const Nav: React.FC<PropsWithChildren> = () => {
  const { user } = useFirebase();
  const navRef = useRef<HTMLElement & HTMLDivElement>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [description, setDescription] = useState("Check out these tools →");
  useOnClickOutside(navRef, () => setShowDrawer(false));

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <nav ref={navRef} className="sticky top-0 z-50 pt-2">
      <div className="relative">
        <div className="relative z-20 mx-2 flex w-[calc(100%-16px)] justify-between gap-3 rounded-lg bg-neutral p-2 text-neutral-content">
          <div className="min-w-12 flex p-0">
            <a
              className="btn-ghost btn flex h-auto w-full flex-nowrap items-center justify-between overflow-hidden rounded-full pl-0 pr-0 text-xl normal-case"
              href="/"
            >
              <img
                src={logo}
                alt="dev bros hq logo"
                className="w-full max-w-[48px]"
              />
              <p className="ml-2 hidden pr-3 text-3xl text-white md:block">
                Dev Bros HQ
              </p>
            </a>
          </div>
          <div className="flex w-[75%] max-w-md justify-end gap-3">
            {user?.admin ? (
              <a
                className="btn-outline btn-secondary btn rounded-lg"
                href="/admin"
              >
                Admin
              </a>
            ) : (
              ""
            )}
            <button
              className="btn-sm btn h-full rounded-md py-1 px-3 md:btn-md"
              onClick={() => setShowDrawer(!showDrawer)}
            >
              Tools <Menu className="ml-3" />
            </button>
            {user?.uid ? (
              <button className="btn-accent btn" onClick={logout}>
                Sign Out
              </button>
            ) : (
              <a href="/sign-in" className="btn-accent btn">
                Sign In
              </a>
            )}
          </div>
        </div>
        <motion.div
          initial={false}
          animate={showDrawer ? "show" : "hide"}
          variants={{
            hide: { top: 0, opacity: 0, height: 0 },
            show: { top: "calc(100% + 8px)", opacity: 1, height: "auto" },
          }}
          className="absolute w-full overflow-hidden"
        >
          <div className="relative mx-2 flex min-h-[64px] w-[calc(100%-16px)] justify-between gap-3 rounded-lg bg-neutral p-2 pt-4 text-neutral-content">
            <div className="hidden w-1/4 px-3 md:block">
              <b>Description</b>
              <p>{description}</p>
            </div>
            <div className="min-h-[64px] w-full md:w-3/4">
              <b>Links</b>
              <div className="flex h-full w-full flex-col flex-wrap gap-2">
                {links.map((link) => {
                  const { label, href, description } = link;
                  return (
                    <a
                      key={label}
                      href={href}
                      onMouseOver={() => setDescription(description)}
                      onMouseOut={() =>
                        setDescription("Go ahead, pick a link!")
                      }
                      className="rounded-md border-2 border-primary-focus bg-gradient-to-br from-primary-focus to-primary py-1 px-2 text-primary-content transition-all hover:border-white"
                    >
                      {label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Nav;
