import Logger from "../../src/index";

jest.setTimeout(1000);

let logger = new Logger();

describe("Logger", () => {
  test("Some Functional test", () => {
    logger.info("test");
    expect(true);
  });
});
