var calculateOrClearTally

$(function() {
  calculateOrClearTally = () => {
    if ($('button').text() === 'Calculate') {
      var tallies = getIndividualTallies()
      var adjustedTallies = tallies.map(tally => adjustIndividualTally(tally))
      var actualGroupTally = calculateGroupTally(tallies)
      var adjustedGroupTally = calculateGroupTally(adjustedTallies)
      var percentageDiff = calculatePercentageDiff(
        actualGroupTally,
        adjustedGroupTally,
      )
      var outreachNum = adjustedTallies.filter(tally => tally > 0).length
      displayResults({
        actualTally: actualGroupTally,
        adjustedTally: adjustedGroupTally,
        percentageDiff: percentageDiff,
        outreacherNum: outreachNum,
      })
    } else {
      clearTally()
    }
  }

  getIndividualTallies = () => {
    var tallies = $('#individual-tallies')
      .val()
      .split(' ')
      .map(tally => parseInt(tally))

    if (!tallies[0]) {
      $('#individual-tallies').attr('disabled', 'disabled')
      $('.error-container').css('display', 'block')
      $('button').html('Clear')
    } else {
      return tallies
    }
  }

  calculateGroupTally = tallies => {
    return Math.round(tallies.reduce((a, b) => a + b, 0))
  }

  calculatePercentageDiff = (actualGroupTally, adjustedGroupTally) => {
    return ((adjustedGroupTally / actualGroupTally) * 100).toFixed(0)
  }

  adjustIndividualTally = tally => {
    let numericTally = tally || 0

    switch (true) {
      case numericTally > 0 && numericTally <= 5:
        return numericTally
      case numericTally > 5 && numericTally <= 10:
        return numericTally * 0.75
      case numericTally > 10 && numericTally <= 15:
        return numericTally * 0.5
      case numericTally > 15:
        return numericTally * 0.25
      default:
        return 0
    }
  }

  clearTally = () => {
    $('#individual-tallies').removeAttr('disabled')
    $('#individual-tallies').val('')
    $('.error-container').css('display', 'none')
    $('.results-container').css('display', 'none')
    $('button').html('Calculate')
  }

  displayResults = results => {
    var { actualTally, adjustedTally, percentageDiff, outreacherNum } = results
    $('#individual-tallies').attr('disabled', 'disabled')
    $('#actual-group-tally').html(actualTally)
    $('#adjusted-group-tally').html(adjustedTally)
    $('#percentage-diff').html(`${percentageDiff}%`)
    $('#outreacher-num').html(outreacherNum)
    $('.results-container').css('display', 'block')
    $('button').html('Clear')
  }
})
