// const assert = require('power-assert');
// const myJSON = require('../myJSON');

import myJSON from '../myJSON';
import assert from 'power-assert';

describe('测试myJSON的内部函数', () => {
  const input = '{"a":1111}'
  it('parse {"a":1111}', () => {
    assert(myJSON.parser(input).a === 1111);
  });
  const input2 = '{"a":{"a":1111}}'
  it('parse 嵌套对象', () => {
    assert(myJSON.parser(input2).a.a === 1111);
  });
//   it('null is Basic', () => {
//     assert(myJSON.isBasic('null') === true);
//   });
//   it('true is Basic', () => {
//     assert(myJSON.isBasic('true') === true);
//   });
//   it('false is Basic', () => {
//     assert(myJSON.isBasic('false') === true);
//   });
//   it('"false" is Basic', () => {
//     assert(myJSON.isBasic('"false"') === true);
//   });
//   it('fa,lse is not basic', () => {
//     assert(myJSON.isBasic('fa,lse') === false);
//   });
//   it('[false] is not basic', () => {
//     assert(myJSON.isBasic('[false]') === false);
//   });
//   it('{"a":false} is not basic', () => {
//     assert(myJSON.isBasic('{"a":false}') === false);
//   });
});
describe('测试myJSON对基本量的处理', () => {
  it('处理null', () => {
    assert(myJSON.parser('null') === null);
  });
  it('处理true', () => {
    assert(myJSON.parser('true') === true);
  });
  it('处理false', () => {
    assert(myJSON.parser('false') === false);
  });
  it('处理字符串', () => {
    assert(myJSON.parser('"false"') === 'false');
  });
});

