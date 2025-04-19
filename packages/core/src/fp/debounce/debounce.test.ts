import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { debounce } from ".";

describe("core/fp/debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  it("should delay function execution", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should debounce multiple calls and only run the last one", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    vi.advanceTimersByTime(50);
    debounced();
    vi.advanceTimersByTime(50);
    debounced();
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should run immediately if immediate=true", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100, true);

    debounced();
    expect(fn).toHaveBeenCalledTimes(1);

    debounced(); // Should be ignored during wait time
    vi.advanceTimersByTime(50);
    debounced(); // Ignored again
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    debounced(); // After delay, should run again
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("should cancel delayed invocation", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced.cancel();

    vi.advanceTimersByTime(100);
    expect(fn).not.toHaveBeenCalled();
  });

  it("should flush the pending invocation immediately", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced.flush();

    expect(fn).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1); // No double call
  });

  it("should bind 'this' correctly", () => {
    const context = {
      value: 42,
      fn(this: any) {
        return this.value;
      },
    };

    const spy = vi.spyOn(context, "fn");
    const debounced = debounce(context.fn, 100);

    debounced.call(context);
    vi.advanceTimersByTime(100);

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.instances[0].value).toBe(42);
  });
});
