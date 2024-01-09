"use client";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import fetchWatercool from "../(serverActions)/FetchWatercool";

type Props = {
  selectedIndex: number;
};

type Watercool = {
  title: string;
  imageUrls: string[];
  content: string;
};

const Discover = ({ selectedIndex }: Props) => {
  const [watercool, setWatercool] = useState<Watercool[]>([]);
  const [waterImage, setWaterImage] = useState<string[]>([]);
  const [main, setMain] = useState("");

  // console.log(watercool, "chec2");
  // console.log(waterImage, "check");

  useEffect(() => {
    fetchWatercool().then((water) => {
      setWatercool([...water].reverse());
    });
  }, []);

  useEffect(() => {
    if (watercool.length > 0 && watercool[selectedIndex]) {
      setMain(watercool[selectedIndex].imageUrls[0]);
      setWaterImage(watercool[selectedIndex].imageUrls.slice(1));
    }
  }, [watercool, selectedIndex]);

  const handleChangeImage = (index: number) => {
    setMain(waterImage[index]);
    const filter = watercool[selectedIndex].imageUrls.filter(
      (image) => image !== waterImage[index]
    );
    setWaterImage(filter);
  };

  const [placeholder, setPlaceholder] = useState(0);
  // console.log(placeholder, "pl");

  useEffect(() => {
    if (waterImage.length < 5) {
      setPlaceholder(4 - waterImage.length);
    } else {
      setPlaceholder(0);
    }
  }, [waterImage]);

  return (
    <div
      className="max-w-[1060px] w-full mx-auto flex flex-col gap-8 z-[1] py-8 px-4 sm:px-2"
      id="discover"
    >
      {watercool &&
        watercool.map((water, index) => {
          const cleanHTML = DOMPurify.sanitize(water.content);
          if (index === selectedIndex) {
            return (
              <React.Fragment key={index}>
                <div className="top head flex justify-between">
                  <h2 className="font-normal">Discover in Detail.</h2>
                  {/* <div className="hidden sm:flex gap-4">
                    <button
                      className={`
                        border-zinc-400 mobilehover:hover:border-white
                          py-2 px-4 border-b-[1px] w-fit mx-auto transition-all text-zinc-400 mobilehover:hover:text-white`}
                    >
                      <p className="text-[10px] sm:text-sm">Single</p>
                    </button>
                    <button
                      className={`
                        border-zinc-400 mobilehover:hover:border-white
                          py-2 px-4 border-b-[1px] w-fit mx-auto transition-all text-zinc-400 mobilehover:hover:text-white`}
                    >
                      <p className="text-[10px] sm:text-sm">Compare</p>
                    </button>
                  </div> */}
                </div>
                <div className="bottom head flex gap-4 flex-col sm:flex-row">
                  <div className="image w-full">
                    <div className=" aspect-video rounded-lg overflow-hidden">
                      <img
                        src={main}
                        alt="main"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full flex gap-4 mt-4">
                      {waterImage.length > 0 &&
                        waterImage.slice(0, 4).map((image, indexImage) => {
                          return (
                            <React.Fragment key={indexImage}>
                              <button
                                className="max-w-[114.9px] w-full aspect-square rounded-lg overflow-hidden transition-all mobilehover:hover:border-white border-transparent border-[1px]"
                                onClick={() => {
                                  handleChangeImage(indexImage);
                                }}
                              >
                                <img
                                  src={image}
                                  alt="main"
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            </React.Fragment>
                          );
                        })}
                      {placeholder !== 0
                        ? [...Array(placeholder)].map((_, index) => {
                            return (
                              <button
                                key={index}
                                className="max-w-[114.9px] w-full aspect-square rounded-lg border-transparent border-[1px] bg-transparent cursor-default"
                              ></button>
                            );
                          })
                        : ""}
                    </div>
                  </div>
                  <div className="texts flex flex-col gap-4 w-full transition-all">
                    <h2>{water.title}</h2>
                    <div className="max-h-[300px] overflow-y-auto relative transition-all">
                      <p dangerouslySetInnerHTML={{ __html: cleanHTML }}></p>
                    </div>
                    <Link
                      href={"#chat"}
                      className={`underline text-zinc-400 mobilehover:hover:text-white transition-all`}
                    >
                      <p>Chat with us!</p>
                    </Link>
                  </div>
                </div>
              </React.Fragment>
            );
          }
        })}
    </div>
  );
};

export default Discover;
