export const dateDiffInSeconds = (startDate: Date, endDate: Date) => {
  const MS_PER_SECOND = 1000;
  const SECS_PER_MINUTE = 60;
  const MINS_PER_HOUR = 60;

  const beginTime = startDate.getTime();
  const endTime = endDate.getTime();

  if (startDate > endDate) {
    throw new Error('The start date cannot be greater than the end date');
  }

  const ms = (endTime - beginTime) % MS_PER_SECOND;
  const secs = Math.floor(Math.abs(ms) / MS_PER_SECOND);
  const mins = Math.floor(secs / SECS_PER_MINUTE);
  const hours = Math.floor(mins / MINS_PER_HOUR);

  return {hours, minutes: mins, seconds: secs, ms};
};

export const formatDiff = (
    hours: number, minutes: number, seconds: number, ms?: number,
) => {
  const formattedMs = ms ? ('0' + (ms % 1000)).slice(-3) : '000';
  const formattedSecs = ('0' + (seconds % 60)).slice(-2);
  const formattedMins = ('0' + (minutes % 60)).slice(-2);
  const formattedHours = ('0' + (hours % 24)).slice(-2);

  return `${formattedHours}:${formattedMins}:${formattedSecs}:${formattedMs}`;
};
