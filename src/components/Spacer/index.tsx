import React from "react";

const Spacer: React.FC<{
  width?: string;
  height?: string;
}> = ({ width, height }) => {
  return <div style={{ width, height }} />;
};

export { Spacer };
