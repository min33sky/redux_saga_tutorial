/**
 * 제너레이터 함수
 * 참고 (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function*)
 */

function* idMaker() {
  let index = 0;
  while (index < 3) {
    yield index++; // yield 문을 만나면 값을 반환 (제어권을 넘긴다.)
  }
}

let gen = idMaker(); // Iterator 객체를 리턴한다.

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);

// ---------------------------------------------------------------

function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i) {
  yield i;
  yield* anotherGenerator(i); // 다른 제너레이터 함수가 위임되어 진행
  yield i + 10;
}

let gen2 = generator(10);

console.log(gen2.next().value);
console.log(gen2.next().value);
console.log(gen2.next().value);
console.log(gen2.next().value);
console.log(gen2.next().value);
console.log(gen2.next().value);

// -------------------------------------------------------

function* logGenerator() {
  console.log(yield);
  console.log(yield);
  console.log(yield);
}

let gen3 = logGenerator();

gen3.next('messi'); // yield에서 제어권이 넘어온다.
gen3.next('messi'); // 제어권을 함수로 넘긴다. (yield 이후부터 시작 => console.log() 호출)
gen3.next('ronaldo');
gen3.next('neymar');
