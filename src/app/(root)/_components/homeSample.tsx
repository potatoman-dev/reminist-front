"use client";

import { useEffect, useState } from "react";

import { GetHomeData } from "./home";

export const HomeSample = () => {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    GetHomeData().then((data) => {
      setData(data.message);
    });
  }, []);

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
};











