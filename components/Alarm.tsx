'use client';

import React, { useEffect, useRef } from 'react';

interface AlarmProps {
  data: {
    estimation: number;
  }[];
}

const Alarm: React.FC<AlarmProps> = ({ data }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Déclenche l'alarme si au moins une estimation < 30%
    if (data.some((item) => item.estimation < 30)) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
      audioRef.current!.currentTime = 0;
    }
  }, [data]);

  return (
    <>
      <audio ref={audioRef} src="/alarm.mp3" />
    </>
  );
};

export default Alarm;
