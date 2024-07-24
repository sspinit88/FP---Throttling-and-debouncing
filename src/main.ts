import { sum } from './sum.ts';
import { debounce, debounceWithPromise } from './debounce.ts';
import { throttle, throttleWithPromise } from './throttle.ts';

// Немедленный вызов функции sum
console.log('START - немедленный вызов функции:', sum(1, 7)); // Ожидается вывод: 3

// Указываем задержку
const delay: number = 15000;

// Создание функции с debounce с промисом
const debouncedSum = debounceWithPromise(debounce, sum, delay);

// Вызов дебаунсированной функции с промисом
debouncedSum(1, 2)
  .then((result) => console.log('DEBOUNCED:', result))
  .catch(console.error);

///
///
///

// Функция для проверки
const logMessage = (message: string) => {
  console.log(`${new Date().toISOString()}: ${message}`);
};

const throttledLogMessage = throttle(logMessage, 2000);

// Тестирование функции
console.log('START - throttle');

throttledLogMessage('First call'); // Должен быть вызван немедленно

setTimeout(() => {
  throttledLogMessage('Second call'); // Должен быть игнорирован (еще не прошло 2 секунды)
}, 500); // Вызов через 0.5 секунды

setTimeout(() => {
  throttledLogMessage('Third call'); // Должен быть вызван (прошло 2 секунды с первого вызова)
}, 1500); // Вызов через 1.5 секунды

setTimeout(() => {
  throttledLogMessage('Fourth call'); // Должен быть вызван (прошло 2 секунды с третьего вызова)
}, 2500); // Вызов через 2.5 секунды

setTimeout(() => {
  throttledLogMessage('Fifth call'); // Должен быть вызван (прошло 2 секунды с четвертого вызова)
}, 4000); // Вызов через 4 секунды

///
///
///

// // // Создаем функцию с промисом
// const throttledSumWithPromise = throttleWithPromise(throttle, sum, 11000);

// // Тестирование функции
// console.log('START - throttle');

// throttledSumWithPromise(1, 2)
//   .then((result) => console.log('RESULT 1:', result))
//   .catch(console.error);

// setTimeout(() => {
//   throttledSumWithPromise(3, 6)
//     .then((result) => console.log('RESULT 1000:', result))
//     .catch(console.error);
// }, 1000); // Вызов через 1 секунду, чтобы проверить задержку

// setTimeout(() => {
//   throttledSumWithPromise(3, 7)
//     .then((result) => console.log('RESULT 1500:', result))
//     .catch(console.error);
// }, 1500); // Вызов через 1 секунду, чтобы проверить задержку

// setTimeout(() => {
//   throttledSumWithPromise(5, 6)
//     .then((result) => console.log('RESULT 3000:', result))
//     .catch(console.error);
// }, 3000); // Вызов через 3 секунды, чтобы проверить работу через интервал времени
