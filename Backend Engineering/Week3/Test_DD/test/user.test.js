const user = require('../src/users')

test("user obj is returned properly", ()=> {
    const userObj = user.getUserDetails();
    expect(userObj.firstname).toBe("Johnson")
    expect(userObj.lastname).toBe("Olawale")
    expect(userObj.age).toBe(24)
    expect(userObj.height).toBeLessThan(180)
})