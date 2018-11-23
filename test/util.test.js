import { util} from '../myJSON';
import assert from 'power-assert';

// describe('测试myJSON的内部函数isBasic', () => {
//   it('null is Basic', () => {
//     assert(util.isBasic('null') === true);
//   });
//   it('true is Basic', () => {
//     assert(util.isBasic('true') === true);
//   });
//   it('false is Basic', () => {
//     assert(util.isBasic('false') === true);
//   });
//   it('"false" is Basic', () => {
//     assert(util.isBasic('"false"') === true);
//   });
//   it('fa,lse is not basic', () => {
//     assert(util.isBasic('fa,lse') === false);
//   });
//   it('[false] is not basic', () => {
//     assert(util.isBasic('[false]') === false);
//   });
//   it('{"a":false} is not basic', () => {
//     assert(util.isBasic('{"a":false}') === false);
//   });
// })
// describe('测试myJSON的内部函数 getStringIndex', () => {
//   const input = '{"a": 1111}'
//   const [startIndex, endIndex] = util.getStringIndex(input);
//   it('get start index correct', () => {
//     assert(startIndex === 1);
//   });
//   it('get end index correct', () => {
//     assert(endIndex === 3);
//   });
//   it('get key correct', () => {
//     assert(util.getKey(input, 1, 3) === 'a');
//   });
// })
// describe('测试myJSON的内部函数 getObjectValue', () => {
//   it('{"a": 1111}', () => {
//     let input = '{"a": 1111}'
//     let endIndex = util.getStringIndex(input)[1];
//     assert(util.getObjectValue(input, endIndex) === '1111');
//   });
//   it('{"a": ""}', () => {
//     let input = '{"a": ""}'
//     let endIndex = util.getStringIndex(input)[1];
//     assert(util.getObjectValue(input, endIndex) === '""');
//   });
//   it('{"a": null }', () => {
//     let input = '{"a": null}'
//     let endIndex = util.getStringIndex(input)[1];
//     assert(util.getObjectValue(input, endIndex) === 'null');
//   });

//   it('{"a": "1111"}', () => {
//     let input = '{"a": "1111"}';
//     let endIndex = util.getStringIndex(input)[1];
//     assert(util.getObjectValue(input, endIndex) === '"1111"');
//   });

//   it('{"a": {"a": 1111}}', () => {
//     let input = '{"a": {"a": 1111}}';
//     let endIndex = util.getStringIndex(input)[1];
//     assert(util.getObjectValue(input, endIndex) === '{"a": 1111}');
//   });
// })
// describe('测试myJSON的内部函数 isBlankArray', () => {
//   it('[] is blank', () => {
//     let input = '[]'
//     assert(util.isBlankArray(input) === true);
//   });
//   it('[   ] is blank', () => {
//     let input = '[   ]'
//     assert(util.isBlankArray(input) === true);
//   });
//   it('["a"] is not blank', () => {
//     let input = '{"a": null}'
//     assert(util.isBlankArray(input) === false);
//   });
// })
// describe('测试myJSON的内部函数 getObjectIndex', () => {
//   it('{}', () => {
//     let input = '{}'
//     assert(util.getObjectIndex(input, 0) === 1);
//   });
//   it('{{}{}}', () => {
//     let input = '{{}{}}'
//     assert(util.getObjectIndex(input, 0) === 5);
//   });
//   it('{{}{}},', () => {
//     let input = '{{}{}},'
//     assert(util.getObjectIndex(input, 0) === 5);
//   });
//   it('{{}{}},{}', () => {
//     let input = '{{}{}},{}'
//     assert(util.getObjectIndex(input, 0) === 5);
//   });
// })
describe('测试myJSON的内部函数 getArrayIndex', () => {
  it('[]', () => {
    let input = '[]'
    assert(util.getArrayIndex(input, 0) === 1);
  });
  it('[[][]]', () => {
    let input = '[[][]]'
    assert(util.getArrayIndex(input, 0) === 5);
  });
  it(' [[][]],', () => {
    let input = ' [[][]],'
    assert(util.getArrayIndex(input, 0) === 6);
  });
  it('[[][]] [[][]],', () => {
    let input = '[[][]] [[][]],'
    assert(util.getArrayIndex(input, 6) === 12);
  });
  it('[[][]],[]{}', () => {
    let input = '[[][]],[]{}'
    assert(util.getArrayIndex(input, 0) === 5);
  });
})
describe('测试myJSON的内部函数 getArrayItemEndIndex', () => {
  let input = '[{"a":{"a":1111}}, 222]'
  it('[{"a":{"a":1111}}, 222]', () => {
    // console.log('util.getArrayItemEndIndex(input, 0)', util.getArrayItemEndIndex(input, 0));
    assert(util.getArrayItemEndIndex(input, 0) === 17);
  });
})