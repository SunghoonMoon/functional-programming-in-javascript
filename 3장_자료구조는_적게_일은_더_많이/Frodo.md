# 3장 자료구조는 적게, 일은 더 많이

### 메소드 체이닝

- 여러 메서드를 단일 구문으로 호출하는 OOP 패턴
- 메소드가 모두 동일한 객체에 속해 있으면 Method cascading 이라고도 함

⇒ 객체지향 프로그램에서 불변 객체에 많이 적용하는 패턴이지만 함수형 프로그래밍에도 잘 맞음

```jsx
// OOP
'Functional Programming'.substring(0, 10).toLowerCase() + ' is fun';

// FP
concat(toLowerCase(substring('Functional Programming', 1, 10)), ' is fun');
```

<aside>
💡 OOP는 주로 상속을 통해 코드를 재사용.
FP는 배열 등의 흔한 자료구조를 이용해 다수의 굵게 나뉜 고계 연산을 적용

</aside>

### 람다 표현식

- 자바스크립트에서는 두 줄 화살표 함수
- 익명 함수를 일반 함수 선언보다 단축된 구문으로 나타냄

⇒ 람다 표현식은 항상 어떤 값을 반환하게 만들어 함수 정의부를 확실히 함수형으로 굳힘
⇒ 람다 표현식은 값을 얻기 위한 느긋한 방법임!

<aside>
💡 느긋한 프로그램은 평가 이전에 정의하기 때문에 자료구조를 재사용하거나 메서드를 융합하여 최적화 할 수 있음
⇒ 불필요한 호출 제거

</aside>

### 함수형 프로그래밍은 람다 표현식과 잘 어울리는 고계함수 map, reduce, filter를 적극 사용할 것을 권장!!

---

## Lodash 함수형 라이브러리

⇒ 언더스코어JS 프로젝트에서 파생된 라이브러리

⇒ 어떤 객체나 배열을 \_(…) 로 감싸면 로대시JS는 LodashWrapper라는 래퍼 객체로 감싸서 로대시JS의 모든 API 함수를 점(.)으로 계속 호출 가능!

### \_.map: 데이터를 반환 (collect라고도 함)

- 배열 각 원소에 Iterator 함수를 적용하여 크기가 같은 새 배열을 반환하는 고계함수
- 일괄적용(apply-to-all) 연산
- 왼쪽에서 오른쪽 방향으로 진행

1. 수식

$$
map(f, [e_0, e_1, e_2 ...]) → [r_0, r_1, r_2 ...]\\(단,\ f(e_n)=r_n)
$$

1. 코드

```jsx
function map(arr, fn) {
  const len = arr.length;
  const result = new Array(len);
  for (let idx = 0; idx < len; idx++) {
    result[idx] = fn(arr[idx], idx, arr);
  }
  return result;
}
```

### \_.reduce: 결과를 수집

- 원소 배열을 하나의 값으로 짜내는 고계함수
- 원소마다 함수를 실행한 결괏값의 누적치를 계산
- 일괄적용(apply-to-all) 연산
  ⇒ 리스트 값을 빠짐없이 방문하기 때문에 다소 비효율적
  ⇒ 상황에 따라 `_some, _isUndefined, _.isNull` 를 사용해서 효율적인 검증기 생성 필요
- 결합 법칙이 성립하지 않는 연산인 경우 `_.reduceRight`로 실행하면 결과값이 달라질 수 있으므로 유의

1. 수식

$$
reduce(f,[e_0, e_1, e_2, e_3],accum)→f(f(f(f(accum,e_0),e_1,e_2,e_3))))→R
$$

1. 코드

```jsx
function reduce(arr, fn, accumulator) {
  let idx = -1;
  const len = arr.length;

  if (!accumulator && len > 0) {
    accumulator = arr[++idx];
  }

  while (++idx < len) {
    accumulator = fn(accumulator, arr[idx], idx, arr);
  }
  return accumulator;
}
```

- fn : 배열 각 원소마다 실행할 이터레이터 함수, 매개변수는 누산치, 현재 값, 인덱스, 배열
- accumulator : 계산할 초깃값을 넘겨받는 인수, 함수 호출을 거치며 매 호출 시 계산된 결괏값을 저장하는 데 사용

### \_filter: 원하지 않는 원소를 제거 (select라고도 함)

- 배열 원소를 반복하면서 술어 함수 p가 true를 반환하는 원소만 추려내고 그 결과를 새 배열에 담아 반환하는 고계함수
- 배열에서 오류 데이터를 제거하는 용도로 자주 사용

1. 수식

$$
filter(p, [d_0,d_1,d_2,d_3,...,d_n])→[d_0, d_1,...,d_n]\\(단,\ 결과값은 \ 원래 \ 집합의 \ 부분집합)
$$

1. 코드

```jsx
function filter(arr, predicate){
	let idx = -1;
	const len = arr.length;
	const result = [];

	while(++idx < len){
		let value= = arr[idx];
		if(predicate(value, idx, this)){
			result.push(value);
		}
	}
	return result;
}
```

- predicate : 원소를 결과에 포함할지 결정하는 술어 함수

<aside>
💡 배열 축약 / 리스트 축약

- map, filter의 기능을 각각 for … of와 if 키워드를 이용하여 단축된 구문으로 캡슐화하는 함수형 장치
- `[for (x of 이터러블) if (조건) x]`
- example
`[for (p of people) if (p.birthYear === 1903) p.fullname].join(’ and’);`
</aside>

### \_.chain: 입력 객체의 상태를 확장

- 주어진 입력을 원하는 출력으로 변환하는 연산들을 연결
- \_(…) 객체로 단축 표기한 구문과 달리, 이 함수는 임의의 함수를 명시적으로 체이닝 가능한 함수로 만듦
- 복잡한 프로그램을 느긋하게 작동
  ⇒ value() 함수를 호출하기 전에는 아무것도 실행되지 않음

[[LODASH] 📚 지연 평가 원리 - (네이티브 보다 오히려 성능이 좋을 수 있다)](https://inpa.tistory.com/entry/LODASH-%F0%9F%93%9A-%EC%A7%80%EC%97%B0-%ED%8F%89%EA%B0%80-%EC%9B%90%EB%A6%AC-lodash%EB%8A%94-%EC%98%A4%ED%9E%88%EB%A0%A4-%EC%84%B1%EB%8A%A5%EC%9D%B4-%EC%A2%8B%EC%9D%84-%EC%88%98-%EC%9E%88%EB%8B%A4)

---

## 재귀(Recursion)

⇒ 주어진 문제를 자기 반복적인 문제들로 잘게 분해한 다음, 이들을 다시 조합해 원래 문제의 정답을 찾는 기법

- **순수 함수형 언어는 모든 루프를 재귀로 수행**
- 컴파일러는 꼬리 호출 최적화(tail-call optimization)를 통화 최적화함

[[javascript] 꼬리 물기 최적화 (Tail Call Optimization)](https://n4oah.github.io/posts/javascript/tail-call-optimization/)

### 재귀 함수의 절차

1. 재귀 함수가 수행되면서, 내부적으로는 재귀 호출 스택이 쌓임
2. 알고리즘이 종료 조건에 이르면 쌓인 스택이 런타임에 의해 풀림
3. 반환문이 모두 실행되면서 실제 계산이 이루어 짐

### 재귀 함수의 구성 요소

1. 기저 케이스(base case): 재귀 함수가 구체적인 결괏값을 바로 계산할 수 있는 입력 집합. 종료 조건이라고도 함
2. 재귀 케이스(recursive case): 함수가 자신을 호출할 때 전달한 입력 집합을 처리하는 부분

⇒ 만약 입력 집합이 점점 작아지지 않으면 재귀가 무한 반복됨!
⇒ 일반적으로 함수가 반복될수록 입력 집합은 무조건 작아지며, 제일 마지막에 기저 케이스로 빠지면 하나의 값으로 귀결됨!
