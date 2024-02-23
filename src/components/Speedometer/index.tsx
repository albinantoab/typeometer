import React, { useEffect, useState } from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

const Speedometer: React.FC<{ speed: number }> = ({ speed = 0 }) => {
  const sp_id = "speed_progress";
  const st_id = "speed_text";

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // calculate current percentage
    // 300 being max speed
    const percentage = Math.floor((speed * 100) / 300);
    setPercentage(percentage);
  }, [speed]);

  return (
    <>
      <div className={clsx(styles.speedometer)}>
        <div
          className={clsx(
            styles.speed_progress,
            percentage > 75 ? "visible !border-[red]" : "visible"
          )}
          id={sp_id}>
          <div
            className={clsx(
              styles.progress_indicator,
              percentage === 0 && "invisible",
              percentage <= 25 && styles.pi_green,
              percentage > 25 && percentage <= 50 && styles.pi_yellow,
              percentage > 50 && percentage <= 75 && styles.pi_orange,
              percentage > 75 && styles.pi_red
            )}
            style={{ width: percentage + "%" }}
          />
        </div>
      </div>
      <div className={styles.speed_txt}>
        <span
          id={st_id}
          className={clsx(
            percentage === 0 && "text-[var(--main-fg)]",
            percentage > 0 && percentage <= 25 && "text-[green]",
            percentage > 25 && percentage <= 50 && "text-[yellow]",
            percentage > 50 && percentage <= 75 && "text-[orange]",
            percentage > 75 && "text-[red]"
          )}>
          {speed}
        </span>
        <span>wpm</span>
      </div>
    </>
  );
};

export { Speedometer };
