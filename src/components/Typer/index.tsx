import React, { TextareaHTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

const Typer = React.forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...rest }, ref) => {
    return <textarea ref={ref} className={clsx(styles.typer, className)} {...rest} />;
  }
);

Typer.displayName = "Typer";

export { Typer };
