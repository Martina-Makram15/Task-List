export const delay = (ms = 600): Promise<void> => {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
};
