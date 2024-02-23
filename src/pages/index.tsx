import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Container } from "@/components/Container";
import { Speedometer } from "@/components/Speedometer";
import { Typer } from "@/components/Typer";
import { Spacer } from "@/components/Spacer";
import { Button } from "@/components/Button";
import { FloatingCountdown } from "@/components/FloatingCountdown";

export default function Home() {
  const [speed, setSpeed] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [startTime, setStartTime] = useState<number | undefined>(undefined);
  const [startCountDown, setStartCountdown] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useHotkeys("mod+s", () => handleClick(), {
    preventDefault: true,
    enableOnContentEditable: true,
    enableOnFormTags: true
  });

  // To focus on text area when disable is lifted
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [startTime]);

  const handleTextOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
      <Speedometer speed={speed} />
      <Spacer height="40px" width="100%" />
      <Typer ref={inputRef} value={text} onChange={handleTextOnChange} disabled={!startTime} />
      <Spacer height="40px" width="100%" />

      <Button onClick={handleClick} shortKey={"^S"}>
        {startTime ? "Stop" : "Start"}
      </Button>
      {startCountDown ? <FloatingCountdown count={3} callback={countdownCompleteCallback} /> : ""}
    </Container>
  );
}
