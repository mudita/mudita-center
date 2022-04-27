export const sleep = async (wait = 1000) =>
  new Promise((resolve) => setTimeout(resolve, wait))
