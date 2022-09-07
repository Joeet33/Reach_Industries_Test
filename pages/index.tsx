import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [deviceIds, setDeviceIds] = useState<any>();
  const [deviceData, setDeviceData] = useState<any>();

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
    };

    fetchDeviceData();
  }, []);

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
          {deviceData.map((deviceIds: any, i: number) => {
            return (
              <div key={i}>
                <ul>
                  <li>{deviceIds.cvmdata}</li>
                </ul>
                <video>
                  <source src={deviceIds.videofiles} type="video/mp4" />
                </video>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Home;
