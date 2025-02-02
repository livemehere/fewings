import { Emitter } from ".";

class MyEmitter extends Emitter<any> {
  constructor() {
    super();
  }
}

describe("core/classes/Emitter", () => {
  let emitter: MyEmitter;
  beforeEach(() => {
    emitter = new MyEmitter();
  });

  it("basic works", () => {
    const fn = vi.fn();
    emitter.on("test", fn);
    emitter.dispatch("test");
    expect(fn).toBeCalledTimes(1);
  });

  it("work with one payload", () => {
    const fn = vi.fn();
    emitter.on("test", fn);
    emitter.dispatch("test", "payload");
    expect(fn).toBeCalledWith("payload");
  });

  it("work with multiple payload", () => {
    const fn = vi.fn();
    emitter.on("test", fn);
    emitter.dispatch("test", "payload1", "payload2");
    expect(fn).toBeCalledWith("payload1", "payload2");
  });

  it("remove listener", () => {
    const fn = vi.fn();
    const off = emitter.on("test", fn);
    off();
    emitter.dispatch("test");
    expect(fn).not.toBeCalled();
  });

  it("remove all listeners", () => {
    const fn = vi.fn();
    emitter.on("test", fn);
    emitter.removeAllListeners();
    emitter.dispatch("test");
    expect(fn).not.toBeCalled();
  });

  it("once", () => {
    const fn = vi.fn();
    emitter.once("test", fn);
    emitter.dispatch("test");
    emitter.dispatch("test");
    expect(fn).toBeCalledTimes(1);
  });

  it("bind this", () => {
    const fn = vi.fn();
    emitter.on("test", fn);
    emitter.dispatch("test");
    expect(fn.mock.instances[0]).toBe(emitter);
  });
});
