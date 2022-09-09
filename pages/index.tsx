import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

const Home: NextPage = () => {
  const [deviceIds, setDeviceIds] = useState<any>();
  const [deviceData, setDeviceData] = useState<any>();
  const [dataFile, setDataFile] = useState<any>();

  useEffect(() => {
    const fetchDeviceIds = async () => {
      const response = await fetch(
        "https://mockapi.lumi.systems/getdevices?userId=100&orgId=Lumi"
      );
      const data = await response.json();
      setDeviceIds(data.output);
    };

    fetchDeviceIds();
  }, []);

  useEffect(() => {
    const fetchDeviceData = async () => {
      const response = await fetch(
        "https://mockapi.lumi.systems/getdevicedata?deviceId=LabEye-dVr"
      );
      const data = await response.json();
      setDeviceData([data.output]);

      (async () => {
        const req = await fetch(`/api?endpoint=${data.output.cvmdata}`);
        const res = await req.json();
        setDataFile([res]);
      })();
    };

    fetchDeviceData();
  }, []);

  const [stamp, setStamp] = useState<any>();

  const handleProgress = (state: any) => {

    setStamp(state.playedSeconds);
  };

  console.log(dataFile)
  console.log((Math.round(stamp*12)-1));


  return (
    <div className={"container"}>
      {deviceIds && deviceIds ? (
        <div>
          {deviceIds.map((deviceIds: any, i: number) => {
            return <div key={i}>{deviceIds}</div>;
          })}
        </div>
      ) : null}

      {deviceData && deviceData ? (
        <div>
          {deviceData.map((deviceData: any, i: number) => {
            return (
              <div key={i}>
                <ReactPlayer
                  url={deviceData.videofiles}
                  controls={true}
                  onProgress={handleProgress}
                />
              </div>
            );
          })}
        </div>
      ) : null}

<div>{dataFile && dataFile[0].frame_data[stamp && stamp ? (Math.round(stamp*12)-1):0].avgR}</div>
<div>{dataFile && dataFile[0].frame_data[stamp && stamp ? (Math.round(stamp*12)-1):0].avgG}</div>
<div>{dataFile && dataFile[0].frame_data[stamp && stamp ? (Math.round(stamp*12)-1):0].avgB}</div>

<div className="h-5 w-5 " style={{backgroundColor:"rgb()"}}></div>


    </div>
  );
};

export default Home;
