import { computeAverageGrade, timesTwo } from '../test';

describe('test.js 테스트', () => {
  it('평균 학점을 계산', () => {
    const result = computeAverageGrade([80, 90, 100]);

    expect(result).toBe('A');
  });

  it('fork 조합기 테스트', () => {
    const result = timesTwo(5);

    expect(result).toBe(10);

    expect(timesTwo(1)).toBe(2);
    expect(timesTwo(20)).toBe(40);
    expect(timesTwo(0)).toBe(0);
    expect(timesTwo(-3)).toBe(-6);
  });
});
