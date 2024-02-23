import React from "react";
import clsx from "clsx";

const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        "w-full",
        "h-screen",
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "p-[2rem]",
        className
      )}
      {...rest}>
      {children}
    </div>
  );
};

export { Container };
