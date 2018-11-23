const BASIC_MAP = {
  null: null,
  false: false,
  true: true,
}

export const util = {
  isBasic(input){
    return !/[,{}[\]]/.test(input)
  },
  isObject(str){
    return str[0] === '{'
  },
  isArray(str){
    return str[0] === '['
  },
  getBasic(input) {
    if(input in BASIC_MAP){
      return BASIC_MAP[input]
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
  getStringIndex( /** @type {string} */ input, /** @type {number} */ posIndex){
    const startIndex = input.indexOf('"') + posIndex;
    const endIndex = input.indexOf('"', startIndex + 1) + posIndex;
    return [startIndex, endIndex];
  },
  getKey(input, startIndex, endIndex){
    return input.slice(startIndex + 1, endIndex);
  },
  getObjectValue( /** @type {string} */ input, /** @type {number} */endIndex){
    const index = input.indexOf(':', endIndex + 1);
    return input.slice(index + 1, input.length - 1).trim();
  },
  getPairingIndex(/** @type {string} */ originInput, openChar, closeChar, posIndex){
    let input = originInput.slice(posIndex)
    let openNum = 1;
    let closeNum = 0;
    let length = input.length;
    for(let i = input.indexOf(openChar) + 1; i < length; i++){
      let char = input[i];
      if(char === openChar){
        openNum++
      } else if(char === closeChar){
        closeNum++
      }
      if(openNum === closeNum){
        return i + posIndex;
      }
      if(openNum < closeNum){
        throw new Error('JSON 对象格式有错误吧！');
      }
    }
    throw new Error('JSON 对象格式有错误吧！');
  },
  getArrayIndex ( /** @type {string} */ input, posIndex) {
    return util.getPairingIndex(input, '[', ']', posIndex)
  },
  getObjectIndex( /** @type {string} */ input, posIndex){
    return util.getPairingIndex(input, '{', '}', posIndex);
  },
  isBlankArray(/** @type {strign} */input){
    return /^\[\s*\]$/.test(input);
  },
  getArrayItemEndIndex(/** @type {string} */ input, /** @type {number} */index){
    const realInput = input.slice(index + 1).trim();
    const firstChar = realInput[0];
    let endIndex = index
    if(firstChar === '"'){
      endIndex = util.getStringIndex(input, index)[1]
    } else if(firstChar === '{'){
      endIndex = util.getObjectIndex(input, index);
    } else if(firstChar === '['){
      endIndex = util.getArrayIndex(input, index);
    }
    // 后面可能还有空格，也要计算进去
    return input.indexOf(',', endIndex);
  },
}

var myJSON = {
  getObject ( /** @type {string} */ input) {
    const [startIndex, endIndex] = util.getStringIndex(input, 0);
    const key = util.getKey(input, startIndex, endIndex);
    const valueString = util.getObjectValue(input, endIndex);
    const value = util.isBasic(valueString) ? util.getBasic(valueString) : this.parser(valueString);
    return {
      [key]: value
    };
  },
  getArray ( /** @type {string} */ input) {
    const list = [];
    if(util.isBlankArray(input)){
      return list;
    }
    // 最后的 ] 符号的index
    const lastIndex = input.length - 1;

    let index = 0;
    while(index < lastIndex){
      let endIndex = util.getArrayItemEndIndex(input, index)
      if(endIndex === -1){
        endIndex = lastIndex;
      }
      const valueString = input.slice(index + 1, endIndex).trim();
      index = endIndex + 1;
      list.push(util.isBasic(valueString) ? util.getBasic(valueString) : this.parser(valueString))
    }
    return list;
  },
  parser(str) {
    const input = String(str).trim();
    if (!input) {
      throw new Error('Unexpected end of JSON input');
    }
    if(util.isBasic(str)){
      return util.getBasic(str);
    }
    if(util.isObject(str)){
      return this.getObject(str);
    }
    if(util.isArray(str)){
      return this.getArray(str);
    }
    throw new Error('还有新情况处理。。。')
  },
};

export default myJSON;