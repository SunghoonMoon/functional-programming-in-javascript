# 4장 재사용 가능한, 모듈적인 코드로

### 모듈성(Modularity) : 프로그램을 더 작고 독립적인 부분으로 나눌 수 있는 정도

⇒ 모듈성이 좋으면?

1. 개발자의 생산성 향상
2. 코드 유지보수성 및 가독성 향상

### 함수

- 관점 1) 입력 형식과 출력 형식 간의 수학적인 매핑
  ex) `isEmpty :: String -> Boolean`
- 관점 2) 형식 간의 매핑

- 메서드를 체이닝 (단단한 결합, 제한된 표현성)
- 함수 파이프라인을 배열 (느슨한 결합, 유연성)

<aside>
💡 파이프라인(pipeline)이란, 한 함수의 출력이 다음 함수의 입력이 되게끔 느슨하게 배열한, 방향성 함수 순차열

</aside>

### 메서드를 체이닝

```jsx
_.chain(names)
  .filter(isValid)
  .map((s) => s.replace(/_/, ' '))
  .uniq()
  .map(_.startCase)
  .sort()
  .value();
```

- 명령형 코드에 비해 구조적으로 향상 + 가독성 좋아짐
- but 자신을 소유한 객체에 부자연스럽게 매여 있음
  ⇒ 체인에서 실행 가능한 메서드 가짓수 줄고 코드 표현성 제약
  (위 코드에서는 로대시JS가 제공하는 연산만 사용 가능)

⇒ 체이닝은 객체 메서드를 통해 함수들을 단단히 결합

### 함수를 파이프라인에 나열

```bash
tr 'A-Z' 'a-z' < words.in | uniq | sort
```

- 파이프 및 필터 패턴

⇒ 파이프라인은 함수 입출력을 서로 연결 지어 느슨하게 결합된 컴포넌트 생성

⇒ 함수의 항수(인수 개수)와 형식이 호환되어야 함!

⇒ 함수형 프로그래밍에서는 파이프라인이 프로그램을 구축하는 유일한 수단

### 함수 호환 요건 (함수 파이프라인 설계 시 필수 조건)

1. 형식 : 한 함수의 반환 형식과 수신 함수의 인수 형식이 일치해야 함
2. 항수 : 수신 함수는 앞 단계 함수가 반환한 값을 처리하기 위해 적어도 하나 이상의 매개변수를 선언해야 함

### 튜플 ⇒ 유한 원소를 지닌 정렬된 리스트 자료구조

- 불변성
- 임의 형식의 생성 방지
  → 새로운 형식을 정의하거나 인스턴스화하는 것보다 간단
- 이형 배열의 생성 방지
  → 배열의 태생 자체가 동일한 형식의 객체를 담는 자료구조라 형식이 다른 원소가 배열에 섞여 있으면 다루기가 까다로움

---

### 커링(Currying)

- 다변수 함수가 인수를 전부 받을 때까지 실행을 보류 또는 지연시켜 단계별로 나뉜 단항 함수의 순차열로 전환하는 기법
- 모든 매개변수가 명시된 커리된 함수에 일부 인수만 넣어 호출하면, 함수가 실행되는 게 아니라 모자란 나머지 인수가 다 채워지기를 기다리는 새로운 함수가 반환!!
  (비커리된 함수 호출 시 인수가 빠진 매개변수 자리는 undefined로 채워 평가됨)
- JS 에서는 클로저를 이용
- 실무에서는 함수 팩토리를 모방하거나 재사용 가능한 모듈적 함수 템플릿을 구현 할 때 사용
- 커링은 마지막 인수를 제외한 나머지 인수들을 유연하게 부분 정의하는 역할을 담당
- 사용되는 함수는 마지막 인수에 있기 때문에 평가가 지연됨

```jsx
// 커링
const curriedFn = (a) => (b) => (c) => `${a}, ${b}, ${c}는 좋은 친구들입니다.`;
```

$$
curry(f) :: ((a,b,c)→d) → a→b→c→d
$$

### 부분 적용(Partial application)

- 함수의 일부 매개변수 값을 처음부터 고정시켜 항수가 더 작은 함수를 생성하는 기법
- 부분 적용은 함수 인수를 미리 정의된 값으로 묶은 후, 인수가 적은 함수를 새로 만듦
  ⇒ 이 결과 함수는 자신의 클로저에 고정된 매개변수를 갖고 있으며, 후속 호출 시 이미 평가를 마친 상태
- 커링은 부분 적용을 자동화 한 것!

---

### 함수 파이프라인을 합성

- 합성을 하려면 반드시 함수에서 부수효과를 없애야 함!
- 순수함수로 작성한 프로그램은 그 자체로 순수한 프로그램
  ⇒ 프로그램의 일부로 합성할 수 있음 (ex. Redux)

### 함수 합성

- 합성된 함수는 실행하기 전에는 아무 평가도 하지 않음
  ⇒ 함수의 서술부와 평가부를 분리
- 형식이 호환되는 함수를 경계선 부근에서 느슨하게 묶음
  ⇒ 인터페이스에 따른 프로그래밍의 원리와 동일!
- 결합 가능한 연산이기 때문에 논리 AND 연산자로 원소를 합칠 수 있음
- head, pluck, zip 같은 함수형 어휘를 숙지할 필요가 있음
- 람다JS에서 compose 및 pipe 함수로 구현
  ⇒ compose 함수는 오른쪽에서 왼쪽으로 실행
  ⇒ pipe 함수는 왼쪽에서 오른쪽으로 실행

$$
f∘g = f(g) = compose :: ((B→C), (A→B)) → (A→C)
$$

### 순수/불순 함수 다루기

- 현업에서 순수 함수로만 코드를 짜는 것은 사실상 불가능
  ⇒ 순수 함수와 불순 함수를 확실하게 구분하고 불순 코드를 격리해야 함!
  (단일 함수로 격리하는 것이 가장 좋음)

---

### 무인수 프로그래밍 (암묵적 프로그래밍)

- compose 함수를 사용하면 인수를 선언할 필요가 전혀 없기 때문에 간결하면서도 선언적인 무인수 코드를 작성 할 수 있음
- 함수를 평가하는 저수준의 세부 사항은 신경 쓰지 않고 고수준의 컴포넌트를 합성하는 방향으로 사고방식을 전환함으로써 추상화 수준을 높일 수 있음
- 함수들이 어떤 형식의 인수를 받는지, 전체 표현식 안에서 어떻게 연결 되는지는 선언하지 않음
- **하지만 합성을 과용하면 모호하고 헷갈리는 프로그램이 될 수 있으니 주의!**
- 상황에 맞게 해야함!
  ⇒ 함수 합성을 두세 조각으로 나누는 편이 더 이로울 때도 있음

```jsx
const runProgram = R.pipe(R.map(R.toLower), R.uniq, R.sortBy(R.identity));

runProgram([
  'Functional',
  'Programming',
  'Curry',
  'Memoization',
  'Partial',
  'Curry',
]);
// -> [curry, functional, memoization, partial, programming]
```

### 함수 조합기(function combinator)

- 함수 또는 다른 조합기 같은 기본 장치를 조합하여 제어 로직처럼 작동시킬 수 있는 고계함수
  (명령형 코드는 if-else, for 같은 절차적 제어 장치로 프로그램의 흐름을 통제)
- 조합기는 대부분 함수형 프로그램이 잘 흘러가도록 조정
  ⇒ 자신의 변수를 선언하거나 비즈니스 로직을 두지 않음!
- 항등(identity), 탭(tap), 선택(alternation), 순차열(sequence), 포크(fork)/조인(join)

### 항등 (I-조합기)

- 주어진 인수와 똑같은 값을 반환하는 함수

$$
identity :: (a)→a
$$

- 함수 인수를 평가하는 시점에 데이터를 고계함수에 제공
- 함수 조합기의 흐름을 단위 테스트하면서 단순한 함수 결과에 대해 단언하고 싶을 때 쓰임
- 캡슐화한 형식에서 데이터를 함수형으로 추출

### 탭 (K-조합기)

- 입력 객체 a와 함수 하나를 받아 a에 이 함수를 실행하고 다시 a를 반환

$$
tap :: (a→*)→a→a
$$

- tap 조합기는 자신에게 전달한 함수의 결과가 있다 해도 그냥 날려버림
- 코드 추가 없이 void 함수(로깅이나 파일/HTML 페이지 쓰기 등)를 연결하여 합성할 때 유용

### 선택 (OR-조합기)

- alt 조합기는 함수 호출 시 기본 응답을 제공하는 단순 조건 로직을 수행
- 함수 2개를 인수로 받아 값이 있으면 첫 번째 함수의 결과를, 그렇지 않으면 두 번째 함수의 결과를 반환

```jsx
const alt = R.curry((func1, func2, val) => func1(val) || func2(val));

// example
const showStudent = R.compose(
  append('#student-info'),
  csv,
  alt(findStudent, createNewStudent)
);

showStudent('444-44-4444');
```

### 순차열 (S-조합기)

- 함수 순차열을 순회
- 2개 또는 더 많은 함수를 인수로 받아, 동일한 값에 대해 각 함수를 차례로 실행하는 또 다른 함수를 반환
- 서로 연관되어 있지만 독립적인 일련의 연산을 수행 할 수 있음
- seq 조합기는 정해진 일을 하나씩 차례로 수행할 뿐 값을 반환하지는 않음
  ⇒ seq를 합성 중간에 끼워 넣고 싶으면 R.tap으로 나머지 함수들과 연결하면 됨

```jsx
const seq = function(/* 함수 */){
	const funcs = Array.prototype.slice.call(arguments);
	return function(val){
		funcs.forEach(function (fn){
			fn(val);
		})
	}
}

// example
const showStudent = R.compose(
	seq(
		append('#student-info'),
		consoleLog),
	csv,
	findStudent));
```

### 포크(조인) 조합기

- fork 조합기는 하나의 자원을 두 가지 방법으로 처리 후 그 결과를 다시 조합
- 하나의 join 함수와 주어진 입력을 처리할 종단 함수 2개를 받음
  ⇒ 분기된 각 함수의 결과는 제일 마지막에 인수 2개를 받는 join 함수에 전달됨
- fork 조합기는 세 함수(join 1개 + fork 2개)를 받음. 주어진 입력값에 두 fork 함수를 실행 후, 최종 결과는 join을 거쳐 합성됨

```jsx
const fork = function (join, func1, func2) {
  return function (val) {
    return join(func1(val), func2(val));
  };
};

// example
const computeAverageGrade = R.compose(
  getLetterGrade,
  fork(R.divide, R.sum, R.lenth)
);

computeAverageGrade([99, 80, 89]); // -> 'B'
```

<aside>
💡 멀티프로세서 프로그래밍에 쓰는 자바의 포크-조인 프레임워크와 혼동하면 안됨

</aside>
