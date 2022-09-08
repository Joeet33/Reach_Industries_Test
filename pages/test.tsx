import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Test: NextPage = () => {
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
    <div className={"container"}>
      {deviceIds && deviceIds ? (
        <div>
          {deviceIds.map((deviceIds: any, i: number) => {
            return <div key={i}>{deviceIds}</div>;
          })}
        </div>
      ) : null}

    </div>
  );
};

export default Test;
