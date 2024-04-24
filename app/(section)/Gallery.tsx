"use client";
import Link from "next/link";
import React, { RefObject, useEffect, useState } from "react";
import fetchWatercool from "../(serverActions)/FetchWatercool";
import { SettingIcon } from "../(components)/Icons";

type Props = {
  setSelectedIndex: (value: number) => void;
};

type Watercool = {
  title: string;
  imageUrls: string[];
  content: string;
};

const Gallery = ({ setSelectedIndex }: Props) => {
  const [watercool, setWatercool] = useState<Watercool[]>([]);

  // console.log(watercool.length, "chec");

  useEffect(() => {
    fetchWatercool().then((water) => {
      setWatercool([...water].reverse());
    });
  }, []);

  const [selectRefs, setSelectRefs] = useState<RefObject<HTMLButtonElement>[]>(
    []
  );

  const [buttonHL, setButtonHL] = useState<null | number>(null);

  useEffect(() => {
    setSelectRefs(watercool.map((_) => React.createRef<HTMLButtonElement>()));
    setButtonHL(0);
  }, [watercool]);

  const handleHL = React.useCallback((index: number, pagei: number) => {
    if (page === pagei) {
      setButtonHL((prev) => {
        return prev === index ? null : index;
      });
    }

    setButtonHL(index);

    if (pagei >= 16) {
      setSelectedIndex(index + 16);
    } else if (pagei >= 8) {
      setSelectedIndex(index + 8);
    } else if (pagei >= 0) {
      setSelectedIndex(index);
    }
  }, []);

  const [galPage, setGalPage] = useState(0);

  // const [placeholder, setPlaceholder] = useState(0);

  // console.log(placeholder, "pl");
  // console.log(galPage, "gall");

  // useEffect(() => {
  //   if (watercool.length > 16) {
  //     setPlaceholder(watercool.length - 16);
  //     // console.log("pass 2");
  //   } else if (watercool.length > 8) {
  //     if (galPage === 0) {
  //       setPlaceholder(0);
  //     } else {
  //       setPlaceholder(watercool.length - 8);
  //     }
  //   }
  // }, [galPage]);

  // New pagination calculation -------------------
  const [page, setPage] = React.useState(1);

  const rowsPerPage = 8;

  const pages = React.useMemo(() => {
    // if (rowsPerPage === "Max") return page;
    return (Math.ceil(watercool.length / rowsPerPage) - 1) * rowsPerPage;
  }, [watercool.length, rowsPerPage]);
  // console.log(page, pages);

  const placeholder = React.useMemo(() => {
    if (watercool.length < 0) return 0;
    const check = watercool.slice(page - 1, page - 1 + 8).length;
    return check;
  }, [pages, page]);

  // console.log(placeholder, "numn");
  return (
    <div
      className="max-w-[1060px] w-full mx-auto flex flex-col gap-8 py-8 px-4 sm:px-2"
      id="gallery"
    >
      <div className="top head flex justify-between">
        <h2 className="font-normal">View your Favourite.</h2>
        <div className={`${watercool.length > 8 ? "flex" : "hidden"}  gap-4`}>
          <button
            className={`
              ${
                page > 1
                  ? "block border-zinc-400 fill-zinc-400 mobilehover:hover:border-white  mobilehover:hover:fill-white"
                  : "border-zinc-800 fill-zinc-800 cursor-default"
              }
            
                            p-2 border-[1px] rounded-full w-fit mx-auto transition-all  `}
            onClick={() => {
              setPage((prev) => {
                if (prev > 1) {
                  handleHL(0, prev);
                  return prev - rowsPerPage;
                } else {
                  return prev;
                }
              });
              // if (galPage > watercool.length - 7) {
              //   setGalPage(galPage - 8);
              //   handleHL(0, galPage - 8);
              // }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className={``}
            >
              <path d="M13.939 4.939 6.879 12l7.06 7.061 2.122-2.122L11.121 12l4.94-4.939z"></path>
            </svg>
          </button>
          <button
            className={`
              ${
                page <= pages
                  ? "block border-zinc-400 fill-zinc-400 mobilehover:hover:border-white  mobilehover:hover:fill-white"
                  : "border-zinc-800 fill-zinc-800 cursor-default"
              }
                            p-2 border-[1px] rounded-full w-fit mx-auto transition-all`}
            onClick={() => {
              // console.log("pass");
              // setPage((prev) => (prev <= pages ? prev + rowsPerPage : prev));
              // if (galPage < watercool.length - 7) {
              //   setGalPage(galPage + 8);
              //   handleHL(0, galPage + 8);
              // }
              setPage((prev) => {
                if (prev < pages) {
                  handleHL(0, prev + rowsPerPage - 1);
                  return prev + rowsPerPage;
                } else {
                  return prev;
                }
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className={`rotate-180`}
            >
              <path d="M13.939 4.939 6.879 12l7.06 7.061 2.122-2.122L11.121 12l4.94-4.939z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="bod w-full flex gap-2 flex-wrap justify-center">
        {watercool.length > 0 ? (
          watercool.slice(page - 1, page - 1 + 8).map((water, index) => {
            return (
              <React.Fragment key={index}>
                <Link
                  href={"#discover"}
                  scroll={false}
                  className={`block sm:hidden`}
                >
                  <button
                    className={`
                      ${
                        buttonHL === index
                          ? "border-accent"
                          : "border-transparent mobilehover:hover:border-zinc-500"
                      }
                      border-[2px] transition-all
                      max-w-[140px] sm:max-w-[253px] w-full rounded-lg aspect-square  overflow-hidden `}
                    ref={selectRefs[index]}
                    onClick={() => handleHL(index, page)}
                  >
                    <img
                      src={water.imageUrls[0]}
                      alt="image"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </Link>
                <button
                  className={`
                      ${
                        buttonHL === index
                          ? "border-accent"
                          : "border-transparent mobilehover:hover:border-zinc-500"
                      }
                      border-[2px] transition-all
                      hidden sm:block
                      max-w-[140px] sm:max-w-[253px] w-full rounded-lg aspect-square  overflow-hidden `}
                  ref={selectRefs[index]}
                  onClick={() => handleHL(index, page)}
                >
                  <img
                    src={water.imageUrls[0]}
                    alt="image"
                    className="w-full h-full object-cover"
                  />
                </button>
              </React.Fragment>
            );
          })
        ) : (
          <div className="flex gap-2 align-middle">
            <SettingIcon
              className="animate-[spin_5s_linear_infinite]"
              size={40}
            />
            <h2 className="text-center mx-auto">Loading...</h2>
          </div>
        )}
        {placeholder !== 0 && placeholder !== 8
          ? [...Array(8 - placeholder)].map((_, index) => {
              return (
                <button
                  key={index}
                  className="max-w-[140px] sm:max-w-[253px] w-full rounded-lg aspect-square bg-transparent cursor-default"
                ></button>
              );
            })
          : ""}
        {/* <button className="max-w-[253px] w-full rounded-lg aspect-square bg-red-400">
          image
        </button>
        <button className="max-w-[253px] w-full rounded-lg aspect-square bg-red-400">
          image
        </button>
        <button className="max-w-[253px] w-full rounded-lg aspect-square bg-red-400">
          image
        </button>
        <button className="max-w-[253px] w-full rounded-lg aspect-square bg-red-400">
          image
        </button>
        <button className="max-w-[253px] w-full rounded-lg aspect-square bg-red-400">
          image
        </button>
        <button className="max-w-[253px] w-full rounded-lg aspect-square bg-red-400">
          image
        </button> */}
      </div>
    </div>
  );
};

export default Gallery;
