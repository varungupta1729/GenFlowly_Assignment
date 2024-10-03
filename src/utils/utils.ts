export const timeAgo = (timestamp: number): string => {
  const secondsAgo = Math.floor((Date.now() - timestamp) / 1000);

  if (secondsAgo < 60) return `${secondsAgo}sec ago`;
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return `${minutesAgo}min ago`;
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo}h ago`;
  const daysAgo = Math.floor(hoursAgo / 24);
  return `${daysAgo} days ago`;
};
