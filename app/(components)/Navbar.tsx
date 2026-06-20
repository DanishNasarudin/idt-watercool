"use client";

import type { MenuList } from "@/lib/menu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  RiArrowDropDownFill,
  RiArrowDropLeftFill,
  RiCloseLine,
  RiMenuLine,
} from "react-icons/ri";
import { useScrollListener } from "../(hooks)/useScrollListener";

type Props = {
  menuList: MenuList[];
};

function Navbar({ menuList }: Props) {
  const [toggle, setToggle] = useState(true);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const scroll = useScrollListener();
  const [hideNavbar, setHideNavbar] = useState(false);
  // console.log(scroll);

  useEffect(() => {
    if (scroll.checkY > 0) {
      setHideNavbar(true);
    } else if (scroll.checkY < 0) {
      setHideNavbar(false);
    }
  }, [scroll.y, scroll.lastY]);

  // ------ clear the link from google analytics

  const router = useRouter();
  const pathname = String(window.location.search);

  useEffect(() => {
    if (pathname.includes("_ga") || pathname.includes("_gl")) {
      router.replace("/");
      // console.log("pass");
    }
  }, [pathname]);

  return (
    <>
      <nav
        className={`
    bg-primary/80 sticky border-b-[1px] border-[#323232] z-50 transition-all top-0
    before:absolute before:w-full before:h-full before:content-[''] before:backdrop-blur-md before:top-0 before:-z-10
    ${hideNavbar ? "translate-y-[-100%]" : ""}
    `}
      >
        <div
          className="
      relative max-w-[1060px] mx-auto"
        >
          <ul
            className="
      flex justify-between items-center w-full sm:w-4/5 px-4 sm:px-0 mx-auto text-xs py-4 z-20
      sm:py-8"
          >
            <a href="/">
              <img
                src="https://idealtech.com.my/wp-content/uploads/2023/03/IDT_LOGO-150x150.png"
                alt="logo"
                className="w-10 z-10"
              />
            </a>
            <div
              className={`
            before:absolute before:w-full before:h-full before:content-[''] before:backdrop-blur-md before:top-0 before:-z-[10]
            sm:before:content-none
            ${
              toggle ? "hidden" : "flex"
            } flex-col absolute top-[99%] w-full text-center gap-8 left-0 py-8 bg-primary/50 border-y-[1px] border-white/10
            sm:relative sm:flex sm:flex-row sm:justify-between sm:pl-10 sm:w-full sm:py-0 sm:border-y-0 sm:bg-transparent`}
            >
              {menuList.map((main, index) => {
                const isOpen = openMenuIndex === index;

                if (!main.dropdown) {
                  return (
                    <li key={main.title}>
                      <a
                        href={main.href}
                        target={main.target ? "_blank" : undefined}
                      >
                        <p className="h-full flex items-center justify-center">
                          {main.title}
                        </p>
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={main.title}>
                    <p
                      className="flex items-center justify-center cursor-pointer"
                      onClick={() => {
                        setOpenMenuIndex(isOpen ? null : index);
                      }}
                    >
                      {main.title}{" "}
                      {isOpen ? (
                        <RiArrowDropDownFill size={20} />
                      ) : (
                        <RiArrowDropLeftFill size={20} />
                      )}
                    </p>
                    <div
                      className={`
                sm:before:absolute sm:before:w-full sm:before:h-full sm:before:backdrop-blur-md sm:before:top-0 sm:before:left-0 sm:before:-z-[10] sm:mt-0
                ${
                  isOpen
                    ? "sm:before:content-['']"
                    : "sm:before:content-none"
                }
            relative py-0 translate-y-0 gap-8 flex flex-col border-white/0
            ${isOpen ? "mt-8" : "mt-0"}
            ${isOpen ? "sm:absolute" : "sm:hidden"}
            sm:primary/30 sm:py-10 sm:px-10 sm:-translate-x-[20%] sm:translate-y-[30%] sm:border-b-[1px] sm:border-white/10`}
                    >
                      {main.dropdown.map((drop) => (
                        <div
                          className={`${isOpen ? "block" : "hidden"} h-full`}
                          key={drop.title}
                        >
                          <a
                            href={drop.href}
                            target={drop.target ? "_blank" : undefined}
                          >
                            <p className="h-full flex items-center justify-center">
                              {drop.title}
                            </p>
                          </a>
                        </div>
                      ))}
                    </div>
                  </li>
                );
              })}
            </div>
            <RiMenuLine
              color="white"
              size={30}
              className={`sm:hidden ${toggle ? "block" : "hidden"}`}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
            <RiCloseLine
              color="white"
              size={30}
              className={`sm:hidden ${toggle ? "hidden" : "block"}`}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </ul>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
