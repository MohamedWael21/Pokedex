export const debounce = (fn: (value: string) => void, timeout: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (args: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(args);
    }, timeout);
  };
};
