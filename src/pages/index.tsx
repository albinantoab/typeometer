import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Container } from "@/components/Container";
import { Speedometer } from "@/components/Speedometer";
import { Typer } from "@/components/Typer";
import { Spacer } from "@/components/Spacer";
import { Button, ButtonVariant } from "@/components/Button";
import { FloatingCountdown } from "@/components/FloatingCountdown";
import { Content } from "@/components/Content";

export default function Home() {
  const [speed, setSpeed] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [startTime, setStartTime] = useState<number | undefined>(undefined);
  const [startCountDown, setStartCountdown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useHotkeys("mod+/", () => handleClick(), {
    preventDefault: true,
    enableOnContentEditable: true,
    enableOnFormTags: true
  });

  // To focus on text area when disable is lifted
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [startTime]);

  const handleTextOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let txt = e.target.value;
    setText(txt);
    calculateSpeed(txt);
  };

  const handleClick = () => {
    if (!startTime) handleStartClick();
    else handleStopClick();
  };

  const handleStartClick = () => {
    setStartCountdown(true);
  };

  const handleStopClick = () => {
    calculateSpeed(text);
    setStartTime(undefined);
    setText("");
    setStartCountdown(false);
  };

  const calculateSpeed = (txt: string) => {
    if (!startTime) return;

    const end_time = Date.now();

    const time_diff = Math.abs(end_time - startTime);

    const mins = time_diff / 60000;

    const wpm = Math.floor(txt.length / 5 / mins);

    setSpeed(wpm);
  };

  const countdownCompleteCallback = () => {
    setStartCountdown(false);
    setStartTime(Date.now());
  };

  return (
    <Container>
      {/* Speedometer */}
      <Speedometer speed={speed} />
      {/* Space */}
      <Spacer height="40px" width="100%" />
      {/* Content */}
      <Content />
      {/* Space */}
      <Spacer height="40px" width="100%" />
      {/* Input */}
      <Typer ref={inputRef} value={text} onChange={handleTextOnChange} disabled={!startTime} />
      {/* Space */}
      <Spacer height="40px" width="100%" />
      {/* Button */}
      <Button
        onClick={handleClick}
        shortKey={"^/"}
        variant={startTime ? ButtonVariant.DANGER : ButtonVariant.PRIMARY}>
        {startTime ? "Stop" : "Start"}
      </Button>
      {/* Countdown - shows in top (position fixed) */}
      {startCountDown ? <FloatingCountdown count={3} callback={countdownCompleteCallback} /> : ""}
    </Container>
  );
}
