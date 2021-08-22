const rewire = require("rewire")
const AdminNav = rewire("./AdminNav")
const logOutHandler = AdminNav.__get__("logOutHandler")
// @ponicode
describe("logOutHandler", () => {
    test("0", () => {
        let callFunction = () => {
            logOutHandler()
        }
    
        expect(callFunction).not.toThrow()
    })
})
