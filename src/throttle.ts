const throttle = <T extends (...args: any[]) => void>(fn: T, delay = 1000) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>): void => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = undefined;
      }, delay);
      fn(...args);
    }
  };
};

/// работает не корректно
const throttleWithPromise = <T extends (...args: any[]) => void>(
  throttleFn: (fn: T, delay: number) => (...args: Parameters<T>) => void,
  fn: T,
  delay: number = 1000
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    // Создаем новый промис, который будет разрешен или отклонен в зависимости от выполнения throttle функции.
    return new Promise((resolve, reject) => {
      const throttledFn = throttleFn((...innerArgs: Parameters<T>) => {
        try {
          resolve(fn(...innerArgs));
        } catch (error) {
          reject(error);
        }
      }, delay);

      // Запускаем функцию
      throttledFn(...args);
    });
  };
};

export { throttle, throttleWithPromise };
