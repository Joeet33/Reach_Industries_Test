import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { DeviceData } from "../components/deviceData";
import { DeviceIds } from "../components/deviceIds";

const Home: NextPage = () => {
  return (
    <div className={"container"}>
      <DeviceIds />
      <DeviceData />
    </div>
  );
};

export default Home;
