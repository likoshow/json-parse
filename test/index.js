import myJSON from '../myJSON';
import assert from 'power-assert';


describe('测试myJSON的内部函数', () => {
  it('parse {"a":1111}', () => {
    assert(myJSON.parser('{"a":1111}').a === 1111);
  });
  it('parse {"a":"1111"}', () => {
    assert(myJSON.parser('{"a":"1111"}').a === '1111');
  });
  it('parse {"a":""}', () => {
    assert(myJSON.parser('{"a":""}').a === '');
  });
  const input2 = '{"a":{"a":1111}}'
  it('parse 嵌套对象 {"a":{"a":1111}}', () => {
    assert(myJSON.parser(input2).a.a === 1111);
  });
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
describe('测试myJSON对基本list的处理', () => {
  it('处理[]', () => {
    const result = myJSON.parser('[]')
    assert( Array.isArray(result) === true && result.length === 0);
  });
  it('处理[1]', () => {
    const result = myJSON.parser('[1]')
    assert( Array.isArray(result) === true && result.length === 1 && result[0] === 1);
  });
});
describe('测试myJSON对复杂list的处理', () => {
  it('处理[{"a" : { "a" :1111}  }, 222]', () => {
    const result = myJSON.parser('[{"a":{"a":1111}}, 222]')
    const firstItem = result[0];
    assert( Array.isArray(result) === true && result.length === 2 && firstItem.a.a === 1111 && result[1] === 222);
  });
});

