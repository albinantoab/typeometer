import React from "react";
import clsx from "clsx";

const Button: React.FC<React.HTMLAttributes<HTMLButtonElement> & { shortKey?: string }> = ({
  children,
  className,
  shortKey,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "rounded-[4px]",
        "bg-[var(--primary-color)]",
        "px-[16px]",
        "py-[8px]",
        "text-white",
        "min-w-[100px]",
        "text-[1.2rem]",
        "flex",
        "items-center",
        "justify-center",
        "gap-1",
        "shadow-[0px_0px_6px_4px_rgb(0,0,0,0.7)]",
        "relative",
        "top-[1px]",
        className
      )}
      {...rest}>
      {children}
      {shortKey && (
        <span className={clsx("text-[0.6rem]", "px-1", "py-[2px]", "bg-[#196cfc]", "rounded")}>
          {shortKey}
        </span>
      )}
    </button>
  );
};

export { Button };
