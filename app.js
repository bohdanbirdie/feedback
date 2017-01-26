// Typewriter.js
// https://github.com/ronv/Typewriter.js

$.fn.typewriter = function () {
  this.each(function () {
    var c = $(this),
      b = c.html(),
      a = 0,
      d = 0
    c.html('')
    var e = function () {
      if (b.substring(a, a + 1) == '<') {
        var f = new RegExp(/<span class="instant"/),
          g = new RegExp(/<span class="clear"/)
        if (b.substring(a, b.length).match(f)) a += b.substring(a, b.length).indexOf('</span>') + 7
        else if (b.substring(a, b.length).match(g)) d = a, a += b.substring(a, b.length).indexOf('</span>') + 7
        else {
          for (;
            b.substring(a, a + 1) != '>';) a++
        }
      }
      c.html(b.substring(d, a++) + (a & 1 ? '<i class="cursor"> </i>' : ''))
      a >= b.length || setTimeout(e, 70 + -100 *
        Math.random())
    }
    e()
  })
  return this
}

var $lineWrapper = $('.line-wrapper')
var $guessInputWrapper = $('.guess-input-wrapper')
var $guessOutputWrapper = $('.guess-output-wrapper')
var $wordsWrapper = $('.words-opts-wrapper')
var $guessInput = $('#guess-input')
var $guessMask = $('#input-mask')
var $attempts = $('.attempts')

var vocabulary = ['RETINA', 'RETAIN', 'RATINE', 'EOLIAN', 'TONIER', 'ORNATE', 'ORIENT', 'NORITE', 'ATONER', 'AUNTIE', 'RATION', 'AROINT', 'TENIAE', 'IODATE', 'ROADIE', 'RENAIL', 'NAILER', 'LINEAR', 'LARINE', 'ALINER', 'TOLANE', 'ETALON', 'TINEAL', 'TENAIL', 'TAILER', 'RETIAL', 'RETAIL', 'ENTAIL', 'ARIOSE', 'ENTOIL', 'TRIENE', 'RETINE', 'ENTIRE', 'RELOAN', 'LOANER', 'LOITER', 'TOILER', 'RAINED', 'UNITER', 'TRIUNE', 'DETAIN', 'NEROLI', 'TIRADE', 'AIRTED', 'NATURE', 'LINTER', 'ARSINE', 'ARISEN', 'TALION', 'LATINO', 'IRONED', 'DINERO', 'TAENIA', 'INGATE', 'EATING', 'TAILOR', 'RIALTO', 'REGION', 'IGNORE', 'ERINGO', 'TRINED', 'TINDER', 'RIDENT', 'EONIAN', 'SENIOR', 'NOSIER', 'IRONES', 'RENTAL', 'LEARNT', 'ANTLER', 'TISANE', 'TINEAS', 'TENIAS', 'REGINA', 'REGAIN', 'REAGIN', 'GAINER', 'EARING', 'TOEING', 'OUTLIE', 'DONATE', 'ATONED', 'TRIODE', 'RIOTED', 'EDITOR', 'DOTIER', 'TENOUR', 'TINIER', 'EIDOLA', 'OLEINE', 'UREDIA', 'ORDAIN', 'INROAD', 'NEATER', 'ENTERA', 'OILIER', 'SENORA', 'REASON', 'ARSENO', 'AEONIC', 'WILMER']
var attempts = 0
var vocabularylength = vocabulary.length
var rand = 0
var tempwd = ''
var keywd = ''
var randwords = []
var likeness = 0
var attemptlimit = 3

// randomize fn
function randomize (min, max) {
  return Math.floor(Math.random() * max) + min
}

// process entry
function processGuess (guesskw) {
  guesskw = guesskw.toUpperCase()
  attempts++
  likeness = 0
  var splitguesskw = guesskw.split('')
  var $attemptOutput = $('<div>')
  var $attemptWord = $('<span>')
  var $attemptResult = $('<span>')
  var $attempLikeness = $('<span>')
  $attempts.children('.turn').eq(0).remove()

  if (attempts <= attemptlimit && guesskw !== keywd) {
    $attemptOutput.addClass('attempt-output')

    for (var j = 0; j < splitguesskw.length; j++) {
      if (keywd.match(splitguesskw[j])) {
        likeness++
      }
    }
    $attemptWord.html('>' + guesskw)
    $attemptResult.html('>Entry Denied.')
    $attempLikeness.html('>Likeness=' + likeness)

    $attemptOutput.append($attemptWord, $attemptResult, $attempLikeness)

    $guessOutputWrapper.append($attemptOutput)
  } else {
    if (attempts > attemptlimit) {
      // lock app
      // console.error('you lose!');
      $attemptWord.html('>' + guesskw)
      $attemptResult.html('>Init Lock.')
      $attemptOutput.append($attemptWord, $attemptResult)
      $guessOutputWrapper.append($attemptOutput)
    }
    if (guesskw === keywd) {
      // congratulations
      console.log('you win!')
      $attemptWord.html('>' + guesskw)
      $attemptResult.html('>Unlocked!')
      $attemptOutput.append($attemptWord, $attemptResult)
      $guessOutputWrapper.append($attemptOutput)
    }
    $guessInput.addClass('disabled').blur()
  }
}

// populate options array
for (var i = 0; i < 10; i++) {
  rand = randomize(0, 99)
  tempwd = vocabulary[rand]
  if (randwords.indexOf(tempwd) < 0) {
    randwords.push(tempwd)
  }
}
// get the right word
rand = randomize(0, 9)
keywd = randwords[rand]

// build the memory options
for (var k = 0; k < randwords.length; k++) {
  var $memOption = $('<span>')

  $memOption.html('0x' + randomize(1111, 9999) + ' #$%' + randwords[k])
  $wordsWrapper.find('.memory-col').append($memOption)
}

// setup initial welcome message
$lineWrapper.typewriter()

// detect user input
$guessInput.keyup(function (e) {
  var $thisInput = $(this)

  $guessMask.empty().html($thisInput.val().toUpperCase())
  if (e.keyCode == 13) {
    processGuess($thisInput.val())
    $thisInput.val('')
    $guessMask.empty()
  }
})

setTimeout(function () {
  $guessInputWrapper.removeClass('hidden')
  $wordsWrapper.removeClass('hidden')
  $attempts.removeClass('hidden')
  $guessInput.focus()
}, 5000)
