$(document).ready(function() {

// GLOBAL VARIABLES
var answer = '', // answer output
    input = '', // user inputs
    running = '', // running answer for input given
    posValue = '', // used for .neg button functionality
    negValue = ''; // used for .neg button functionality

// CALCULATOR READOUT
function output() {
  $('#current').html(input);
  $('#answer').html(answer);
  runningTotal(running.slice(-1));
  digitSize();
}

// OUTPUT RESIZING
function digitSize() {
  if (answer.length > 14) {
    $('#current').html('');
    $('#answer').html('ERROR');
  } else if (input.length > 17) {
    $('#current').css('font-size', '15px');
  } else if (running.length > 9) {
    $('#answer').css('font-size', '30px');
  } else {
    $('#current').css('font-size', '25px');
    $('#answer').css('font-size', '45px');
  }
}

// TRACKS CURRENT TOTAL
function runningTotal(char) {
  var regexp = /[-+*/]/;
  if (running.charAt(0) === '0' && running.charAt(1) !== '.') {
    running = running.slice(1);
  } else if (char.match(regexp)) {
    running = running.slice(0, -1);
    $('#answer').html(eval(running));
    running = eval(running) + input.slice(-1);
    answer = '';
  }
}

// BUTTON FUNCTIONALITY
$('#ca').click(function() {
  input = '';
  answer = '';
  running = '';
  output();
});

$('#del').click(function() {
  var nums = /[0-9.)(-]/;
  var lastChar = input.charAt(input.length - 1);
  if (lastChar.match(nums)) {
    input = input.slice(0, -1);
    running = running.slice(0, -1);
    answer = answer.slice(0, -1);
  }
  $('#current').html(input);
  $('#answer').html(answer);
});

$('.neg').click(function() {
  var nums = /[0-9.]/;
  var runningArr = running.split('');
  var inputArr = input.split('');
  for (var i = runningArr.length - 1; i >= 0; i--) {
    if (nums.test(runningArr[runningArr.length - 1])) {
      if (!nums.test(runningArr[i - 1])) {
        posValue = runningArr.slice(i, runningArr.length).join('');
        runningArr.splice(i, 0, '(-');
        runningArr.push(')');
        negValue = runningArr.slice(i, runningArr.length).join('');
        inputArr = inputArr.slice(0, inputArr.length - posValue.length);
        inputArr.push(negValue);
        answer = negValue;
        break;
      }
    } else if (runningArr[i] === '(') {
      runningArr = runningArr.slice(0, i);
      runningArr.push(posValue);
      inputArr = inputArr.slice(0, inputArr.length - negValue.length);
      inputArr.push(posValue);
      answer = posValue;
      break;
    }
  }
  running = runningArr.join('');
  input = inputArr.join('');
  $('#current').html(input);
  $('#answer').html(answer);
});

$('.number').click(function() {
  input += this.id;
  running += this.id;
  answer += this.id;
  output();
});

$('.symbol').click(function() {
  input += this.id;
  running += this.id
  output();
});

$('.equals').click(function() {
  answer = eval(running);
  input = answer;
  $('#answer').html(answer);
  digitSize();
});

});
