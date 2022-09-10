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

  const frames = stamp && stamp ? Math.round(stamp * 12) - 1 : 0;

  const redData = dataFile && dataFile[0].frame_data[frames].avgR;
  const greenData = dataFile && dataFile[0].frame_data[frames].avgG;
  const blueData = dataFile && dataFile[0].frame_data[frames].avgB;

  const hist = dataFile && dataFile[0].frame_data[frames].histDiff;

  const r = Math.round(redData && redData ? redData : 0);
  const g = Math.round(greenData && greenData ? greenData : 0);
  const b = Math.round(blueData && blueData ? blueData : 0);

  const colorBox = [r, g, b];

  return (
    <div className="container">
      <div>
        {deviceData &&
          deviceData.map((deviceData: DeviceProps, i: number) => {
            return (
              <div
                key={i}
                className="w-min m-auto border-solid border-8 border-light-blue rounded relative"
              >
                <div
                  style={{
                    position: "absolute",
                    width: `${dataFile && dataFile[0].RoI[3]}px`,
                    right: `${dataFile && dataFile[0].RoI[1]}px`,
                    height: `${dataFile && dataFile[0].RoI[2]}px`,
                    top: `${dataFile && dataFile[0].RoI[3]}px`,
                    borderStyle: "solid",
                    borderColor: "yellow",
                    borderWidth: "medium",
                    zIndex: "10",
                  }}
                ></div>
                <ReactPlayer
                  url={deviceData.videofiles}
                  controls={true}
                  onProgress={handleProgress}
                  style={{ position: "relative" }}
                />
              </div>
            );
          })}
      </div>

      <div className="flex flex-col m-auto w-4/12 border-solid border-8 border-navy-blue rounded mt-4">
        <div className="text-center font-bold text-light-blue text-lg">Frame Information in Seconds</div>
        <div className="flex flex-row w-full px-2.5">
          <div className="flex flex-col w-9/12">
            <div className="py-1 text-blue">Histogram: {hist}</div>
            <div className="text-blue">Frame: {frames}</div>
            <div className="flex flex-row py-1 text-blue">
              <div className="pr-1">Bounding Box:</div>
              <div className="pr-1">{dataFile && dataFile[0].RoI[3]}</div>
              <div className="pr-1">{dataFile && dataFile[0].RoI[1]}</div>
              <div className="pr-1">{dataFile && dataFile[0].RoI[2]}</div>
              <div className="pr-1">{dataFile && dataFile[0].RoI[3]}</div>
            </div>
          </div>
          <div className="flex flex-col w-3/12">
            <div className="flex flex-row py-1 text-center"></div>
            <div>
              <div className="flex flex-col">
                <div className="flex justify-center space-x-4">
                  <div className="text-red-800">R</div>
                  <div className="text-green-800">G</div>
                  <div className="text-blue">B</div>
                </div>
                <div className="flex justify-center space-x-1">
                  <div className="text-red-800">{r}</div>
                  <div className="text-green-800">{g}</div>
                  <div className="text-blue">{b}</div>
                </div>
              </div>
            </div>
            <div
              className="text-center"
              style={{ backgroundColor: `rgb(${colorBox})` }}
            >
              RGB
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
