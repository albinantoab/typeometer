import React from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

const Typer = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...rest }, ref) => {
    return <input ref={ref} className={clsx(styles.typer, className)} {...rest} />;
  }
);

Typer.displayName = "Typer";

export { Typer };
