const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
})
const formatDuration = (time: number | undefined) => {
  const seconds = Math.floor((time as number) % 60)
  const minutes = Math.floor((time as number) / 60) % 60
  const hours = Math.floor((time as number) / 3600)
  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`
  } else {
    return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(
      seconds,
    )}`
  }
}

export default formatDuration
