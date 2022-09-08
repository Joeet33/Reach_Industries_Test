import type { NextPage } from "next";
import { useEffect, useState } from "react";
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

  console.log(dataFile)

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
                <ReactPlayer url={deviceData.videofiles} controls={true}/>
                {/* <video>
                  <source src={deviceData.videofiles} type="video/mp4" />
                </video> */}
              </div>
            );
          })}
        </div>

        
      ) : null}

{dataFile && dataFile ? <div>{dataFile[0].frame_data[0].avgB}</div> : null}

      {/* {dataFile && dataFile ? (
        <div>
          {dataFile.map((dataFiles: any, i: number) => {
            return (
              <div >
                <ul> <li key={i}> [{dataFiles.frame_data}]</li> </ul>.
              </div>
            );
          })}
        </div>
      ) : null} */}
    </div>
  );
};

export default Home;
