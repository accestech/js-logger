import Logger from '../../src/index'

jest.setTimeout(1000)

let logger = new Logger()

describe("Logger", () => {
    

    test("Some Unit test", () => {
        console.log = jest.fn()
        logger.info('test')
        expect(console.log).toHaveBeenCalled()
        // expect(true)
    })
})