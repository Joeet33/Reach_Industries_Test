import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface DeviceProps {
  cvmdata: string;
  videofiles: string;
}

interface DataProps {
  RoI: number[];
  frame_data: {
    avgR: number;
    avgG: number;
    avgB: number;
    histDiff: number;
  }[];
}

export const DeviceData = () => {
  const [deviceData, setDeviceData] = useState<DeviceProps[]>();
  const [dataFile, setDataFile] = useState<DataProps[]>();
  const [stamp, setStamp] = useState<number>();

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

  const handleProgress = (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    setStamp(state.playedSeconds);
  };

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
    <>
      <div>
        {deviceData &&
          deviceData.map((deviceData: DeviceProps, i: number) => {
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
    </>
  );
};
