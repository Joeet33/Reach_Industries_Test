import { useEffect, useState } from "react";

export const DeviceIds = () => {
  const [deviceIds, setDeviceIds] = useState<any>();

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

  return (
    <div>
      {deviceIds &&
        deviceIds.map((deviceIds: any, i: number) => {
          return <div key={i}>{deviceIds}</div>;
        })}
    </div>
  );
};
