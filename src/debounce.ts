/*
  The idea of debouncing comes from electronics and involves waiting to do something until 
  a stable state has been reached. For example, if you write an autocomplete component, 
  every time the user types a letter, you could query an API to fetch the possible options. 
  
  However, you wouldn’t want to do this keypress by keypress because you’d be generating lots of 
  calls, most of which you won’t even use since you’ll only care for the last one you made. 

  Other usual examples involve mouse movement or page scrolling events; you don’t want to run
  associated handlers too often since that will negatively impact the page’s performance.

  A debounced function is a new one that can be called as often as desired but won’t do anything
  until a timer has run. If you call the function once and then call it again, the timer will be 
  reset and start running again. The only way for the function to actually do its thing is if a
  given delay period passes without any new calls
*/

const debounce = <T extends (...args: any) => void>(
  fn: T,
  delay: number = 300
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  const debounced = (...args: Parameters<T>): void => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };

  (debounced as any).getDelay = () => delay;

  return debounced;
};

const debounceWithPromise = <T extends (...args: any[]) => any>(
  debounceFn: (fn: T, delay: number) => (...args: Parameters<T>) => void,
  fn: T,
  delay?: number
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  //
  // Функция debounceWithPromise возвращает новую функцию, которая будет вызываться с любыми аргументами.
  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    //
    /// Получаем величину задержки
    const debounceFnDelay: number = (debounceFn(fn) as any).getDelay();
    const currentDelay = !!delay && delay > 0 ? delay : debounceFnDelay;

    // Создаем новый промис, который будет разрешен или отклонен в зависимости от выполнения дебаунсированной функции.
    return new Promise((resolve, reject) => {
      //
      // Создаем дебаунсированную функцию с задержкой
      const debouncedFn = debounceFn((...innerArgs: Parameters<T>) => {
        try {
          resolve(fn(...innerArgs));
        } catch (error) {
          reject(error);
        }
      }, currentDelay);

      // Запускаем дебаунсированную функцию
      debouncedFn(...args);
    });
  };
};

export { debounce, debounceWithPromise };
