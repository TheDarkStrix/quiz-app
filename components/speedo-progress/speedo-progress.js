import React from "react";
import dynamic from "next/dynamic";
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});
export const SpeedoProgress = ({ value }) => {
  return (
    <GaugeComponent
      type="semicircle"
      id="gauge-component4"
      animate={false}
      arc={{
        gradient: true,
        width: 0.15,
        padding: 0,
        subArcs: [
          {
            limit: 15,
            color: "#FF3B3F",
            showTick: false,
          },
          {
            limit: 58,
            color: "#FFD033",
            showTick: false,
          },
          {
            limit: 75,
            color: "#44B77B",
            showTick: false,
          },
        ],
      }}
      value={isNaN(value) ? 0 : value}
      pointer={{ type: "arrow", color: "black" }}
      labels={{
        valueLabel: {
          hide: false,
          maxDecimalDigits: 0,
          style: {
            color: "black",
            fontWeight: "900",
            fill: "black",
            textShadow: "unset",
          },
        },
        tickLabels: {
          defaultTickLineConfig: {
            hide: true,
          },
          defaultTickValueConfig: {
            hide: true,
          },
        },
      }}
    />
  );
};
export default SpeedoProgress;
