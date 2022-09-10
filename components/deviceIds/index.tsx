import { useEffect, useState } from "react";

export const DeviceIds = () => {
  const [deviceIds, setDeviceIds] = useState<string[]>();

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
    <div className="text-center font-bold text-xl">
      <div>Id: {deviceIds && deviceIds[0]}</div>
      <div>Id: {deviceIds && deviceIds[1]}</div>
      <div>Id: {deviceIds && deviceIds[2]}</div>
    </div>
  );
};
