/* eslint-disable no-console */
var myJSON = {
  basicMap:{
    'null': null,
    'false': false,
    'true': true,
  },
  getBasic(input) {
    if(input in this.basicMap){
      return this.basicMap[input]
    }
    if (/^\d+$/.test(input)) {
      return Number(input);
    }
    if (/^\d+\.\d+$/.test(input)) {
      return parseFloat(input);
    }
    const length = input.length;
    if(length >= 2 && input[0] === '"' && input[length - 1] === '"'){
      return input.slice(1, length - 1);
    }
    throw new Error('basic not fit JSON: ' + input );
  },
  getObject ( /** @type {string} */ input) {
    const key = this.getObjectKey(input);
    const valueString = this.getObjectValue(input, key);
    const value = this.parser(valueString);
    return {
      [key]: value
    };
  },
  getObjectKey( /** @type {string} */ input){
    const length = input.length;
    let index = 2;
    while(input[index] !== '"' && index < length){
      index++
    }
    return input.slice(2, index);
  },
  getObjectValue( /** @type {string} */ input, /** @type {string} */key){
    const index = input.indexOf(':', key.length+3);
    return input.slice(index + 1, input.length - 1)
  },
  getArray ( /** @type {string} */ input) {

  },
  isBasic(input){
    return !/[,\{\}\[\]]/.test(input)
  },
  isObject(str){
    return str[0] === '{'
  },
  isArray(str){
    return str[0] === '['
  },
  parser(str) {
    const input = String(str).trim();
    if (!input) {
      throw new Error('Unexpected end of JSON input');
    }
    if(this.isBasic(str)){
      return this.getBasic(str);
    }
    if(this.isObject(str)){
      return this.getObject(str);
    }
    if(this.isArray(str)){
      return this.getArray(str);
    }
    return '其他情况还没完成'
    // let index = 0;
    // function next() {
    //   return input[index++];
    // }
  },
};


// console.log(myJSON.getObjectKey('{"a13414":1111}'));
// console.log(myJSON.getObjectValue('{"a13414":1111}', 'a13414'));


export default myJSON;


// console.log(1, JSON.parse(test));
