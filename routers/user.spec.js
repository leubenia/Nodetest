const testware = require("./user");
const supertest = require("supertest");
const router = require("./user");


jest.mock("../schemas/user");

const user = require("../schemas/user");




test("닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 이루어져 있어야 합니다.", async () =>{
    user.create = jest.fn();
    const req = {
        body:{
            id : "test",
            pw : "test",
            name: "te",
        },
    
    }
    
    const res = await supertest(router).post("/signup");

    expect(res).toHaveBeenCalledWith({
        error : "닉네임을 확인하세요"
    });
})