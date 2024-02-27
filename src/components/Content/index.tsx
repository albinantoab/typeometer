import React, { useEffect, useState } from "react";
import clsx from "clsx";

const url = "http://metaphorpsum.com/paragraphs/2";

const Content: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  const [text, setText] = useState("");
  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((res) => setText(res));
  }, []);

  return (
    <div
      className={clsx(
        className,
        "p-6",
        "bg-[#363636]",
        "rounded",
        "w-[60vw]",
        "text-white",
        "text-[20px]",
        "shadow-[0px_0px_3px_1px_rgb(0,0,0,0.7)]"
      )}
      {...rest}>
      {text}
    </div>
  );
};

export { Content };
