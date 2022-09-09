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

  const frames = stamp && stamp ? Math.round(stamp * 12) - 1 : 0;

  return (
    <>
      <div>
        {deviceData &&
          deviceData.map((deviceData: DeviceProps, i: number) => {
            return (
              <div
                key={i}
                className="w-min m-auto border-solid border-8 border-light-blue rounded"
              >
                <ReactPlayer
                  url={deviceData.videofiles}
                  controls={true}
                  onProgress={handleProgress}
                  className=""
                />
              </div>
            );
          })}
      </div>

      <div className="flex flex-col m-auto w-4/12 border-solid border-8 border-navy-blue rounded mt-4">
        <div className="text-center">Frame Information in seconds</div>
        <div className="flex flex-row w-full px-2.5">
          <div className="flex flex-col w-9/12">
            <div className="py-1">Histogram: {hist}</div>
            <div>Frame: {frames}</div>
            <div className="flex flex-row py-1">
              <div className="pr-1">Bounding Box:</div>
              <div className="pr-1">{dataFile && dataFile[0].RoI[0]}</div>
              <div className="pr-1">{dataFile && dataFile[0].RoI[1]}</div>
              <div className="pr-1">{dataFile && dataFile[0].RoI[2]}</div>
              <div className="pr-1">{dataFile && dataFile[0].RoI[3]}</div>
            </div>
          </div>
          <div className="flex flex-row py-1 text-center justify-end w-3/12">
            {r && r ? (
              <div className="px-1 text-red-800">
                <div>R</div>
                {Math.round(r)}
              </div>
            ) : null}
            {g && g ? (
              <div className="px-1 text-green-800">
                <div>G</div>
                {Math.round(g)}
              </div>
            ) : null}
            {b && b ? (
              <div className="px-1 text-blue">
                <div>B</div>
                {Math.round(b)}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
