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

  console.log(dataFile);
  console.log(Math.round(stamp * 12) - 1);

  const r =
    dataFile &&
    dataFile[0].frame_data[stamp && stamp ? Math.round(stamp * 12) - 1 : 0]
      .avgR;

  const g =
    dataFile &&
    dataFile[0].frame_data[stamp && stamp ? Math.round(stamp * 12) - 1 : 0]
      .avgG;

  const b =
    dataFile &&
    dataFile[0].frame_data[stamp && stamp ? Math.round(stamp * 12) - 1 : 0]
      .avgB;

  const hist =
    dataFile &&
    dataFile[0].frame_data[stamp && stamp ? Math.round(stamp * 12) - 1 : 0]
      .histDiff;


  return (
    <div className={"container"}>
      <div>
        {deviceIds &&
          deviceIds.map((deviceIds: any, i: number) => {
            return <div key={i}>{deviceIds}</div>;
          })}
      </div>

      <div>
        {deviceData &&
          deviceData.map((deviceData: any, i: number) => {
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

      <div>Frame Information in seconds</div>
      <div>{r}</div>
      <div>{g}</div>
      <div>{b}</div>
      <div>{hist}</div>

      <div>{dataFile && dataFile[0].RoI[0]}</div>
      <div>{dataFile && dataFile[0].RoI[1]}</div>
      <div>{dataFile && dataFile[0].RoI[2]}</div>
      <div>{dataFile && dataFile[0].RoI[3]}</div>
    </div>
  );
};

export default Home;
