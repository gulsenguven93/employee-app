import { renderHook, act } from "@testing-library/react";
import { usePagination } from "../usePagination";

describe("usePagination Hook", () => {
  const mockData = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));

  test("initializes with correct default values", () => {
    const { result } = renderHook(() => usePagination(mockData, 10));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.maxPage).toBe(3);
    expect(result.current.currentData()).toHaveLength(10);
    expect(result.current.currentData()[0].id).toBe(1);
  });

  test("calculates maxPage correctly", () => {
    const { result } = renderHook(() => usePagination(mockData, 5));
    expect(result.current.maxPage).toBe(5);

    const { result: result2 } = renderHook(() => usePagination(mockData, 8));
    expect(result2.current.maxPage).toBe(4);
  });

  test("next function increments current page", () => {
    const { result } = renderHook(() => usePagination(mockData, 10));

    act(() => {
      result.current.next();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentData()[0].id).toBe(11);
  });

  test("prev function decrements current page", () => {
    const { result } = renderHook(() => usePagination(mockData, 10));

    act(() => {
      result.current.next();
    });

    act(() => {
      result.current.prev();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.currentData()[0].id).toBe(1);
  });

  test("jump function sets correct page", () => {
    const { result } = renderHook(() => usePagination(mockData, 10));

    act(() => {
      result.current.jump(3);
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.currentData()[0].id).toBe(21);
  });

  test("jump function respects page boundaries", () => {
    const { result } = renderHook(() => usePagination(mockData, 10));

    act(() => {
      result.current.jump(0);
    });
    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.jump(10);
    });
    expect(result.current.currentPage).toBe(3);
  });

  test("currentData returns correct slice for each page", () => {
    const { result } = renderHook(() => usePagination(mockData, 5));

    expect(result.current.currentData()).toHaveLength(5);
    expect(result.current.currentData()[0].id).toBe(1);
    expect(result.current.currentData()[4].id).toBe(5);

    act(() => {
      result.current.jump(2);
    });
    expect(result.current.currentData()).toHaveLength(5);
    expect(result.current.currentData()[0].id).toBe(6);
    expect(result.current.currentData()[4].id).toBe(10);

    act(() => {
      result.current.jump(5);
    });
    expect(result.current.currentData()).toHaveLength(5);
    expect(result.current.currentData()[0].id).toBe(21);
    expect(result.current.currentData()[4].id).toBe(25);
  });

  test("handles empty data array", () => {
    const { result } = renderHook(() => usePagination([], 10));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.maxPage).toBe(0);
    expect(result.current.currentData()).toHaveLength(0);
  });
});
