"use client";
import React, { useState } from "react";
import Discover from "./Discover";
import Gallery from "./Gallery";

type Props = {};

const Body = (props: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <Discover selectedIndex={selectedIndex} />
      <Gallery setSelectedIndex={setSelectedIndex} />
    </>
  );
};

export default Body;
