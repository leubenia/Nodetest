const testdodo = require('./whatset');
const mongoose = require("mongoose");
jest.mock("../schemas/user")
const User = require("../schemas/user");


test('닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)', async () => {
  
  expect(await testdodo('test', '123123','123123', 'test')).toEqual(true);
  expect(await testdodo('test', '123123','123123', 'tt')).toEqual(false);
  expect(await testdodo('test', '123123','123123', 'te!!')).toEqual(false);
  expect(await testdodo('test', '123123','123123', 'te!@#!@#')).toEqual(false);
});
test('비밀번호는 최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패합니다.', async () => {
  
  expect(await testdodo('test', '123123','123123', 'test')).toEqual(true);
  expect(await testdodo('test', '12','12', 'test')).toEqual(false);
  expect(await testdodo('test', '123test','123test', 'test')).toEqual(false);
  expect(await testdodo('test', 'test123123','test123123', 'test')).toEqual(false);
});
