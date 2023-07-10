const convertSecondsIntoMinutesAndSeconds = (value: number) => {
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value - minutes * 60);

  if (seconds.toString().length === 1) {
    return `0${minutes}:0${seconds}`;
  }
  return `0${minutes}:${seconds}`;
};

export {convertSecondsIntoMinutesAndSeconds};
