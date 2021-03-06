const fs = require('fs')
let inputs = process.argv.slice(2)
let outputs = new Object()

inputs.givenString = inputs[0] ? String(inputs[0]) : 'Lorem'
inputs.functionType = inputs[1] ? inputs[1].toLowerCase() : 'all'
inputs.shouldSort = inputs[2] ? inputs[2] : false

if (inputs.functionType == ('false' || 'true') ) {
  inputs.shouldSort = inputs.functionType
  inputs.functionType = 'all'
}

if (inputs.functionType == 'prefix') {
  findPrefix(inputs.givenString)
} else if (inputs.functionType == 'suffix') {
  findSuffix(inputs.givenString)
} else if (inputs.functionType == 'substring') {
  findSubStr(inputs.givenString)
} else if (inputs.functionType == 'subsequence') {
  findSubSeq(inputs.givenString)
} else if ( inputs.functionType == 'all') {
  findPrefix(inputs.givenString)
  findSuffix(inputs.givenString)
  findSubStr(inputs.givenString)
  findSubSeq(inputs.givenString)
} else {
  console.log('Oops! please ask a real question');
}

function findPrefix(string) {
  outputs.prefixes = ['ε']
  for (let i = 1; i <= string.length; i++) outputs.prefixes.push('\'' + string.substr(0, i) + '\'')
  writeResult(outputs.prefixes, 'Prefixes')
}
function findSuffix(string) {
  outputs.suffixes = []
  for (let i = 0; i < string.length; i++) outputs.suffixes.push('\'' + string.substr(i, string.length) + '\'')
  outputs.suffixes.push('ε')
  writeResult(outputs.suffixes, 'Suffixes')
}
function findSubStr(string) {
  outputs.substring = ['ε']
  for (let i = 0; i < string.length; i++) {
    for (let j = string.length - i; j >= 1 ; j--) outputs.substring.push('\'' + string.substr(i, j) + '\'')
  }
  writeResult(outputs.substring, 'Substrings')
}
function findSubSeq(string) {
  outputs.subsequence = []
  let tempSubsequence
  for (let i = 1; i < Math.pow(2, string.length); i++) {
      tempSubsequence = ''
      for (let j = 0; j < string.length; j++) if (i & (1 << j)) tempSubsequence += string[j]
      if (!outputs.subsequence.includes('\'' + tempSubsequence + '\'')) outputs.subsequence.push('\'' + tempSubsequence + '\'')
  }
    writeResult(outputs.subsequence, 'Subsequences')
}

function writeResult(result, type){

  if (inputs.shouldSort) {
    result.sort(function(first, second) {
      return first.length - second.length || first.localeCompare(second);
    });
  }

  console.log( type + ' of "' + inputs.givenString +'" are: ');
  console.log('{' + result.toString() + '}');

  fs.writeFile(type+'.txt', '[' + result.toString() + ']' , (err) => {
    if (err) throw err;
    console.log(type + ' have also been saved at ' + type.toLowerCase() + '.txt file.');
  });

  console.log('\n');
}
