var calculateOrClearTally

$(function() {
  calculateOrClearTally = () => {
    if ($('button').text() === 'Calculate') {
      var individualTallies = $('#individual-tallies').val()
      var adjustedTallies = individualTallies
        .split(' ')
        .map(tally => adjustIndividualTally(tally))
      var groupTally = Math.round(adjustedTallies.reduce((a, b) => a + b, 0))
      var numOfOutreachers = adjustedTallies.filter(tally => tally > 0).length
      displayResults(groupTally, numOfOutreachers)
    } else {
      clearTally()
    }
  }

  adjustIndividualTally = tally => {
    let numericTally = parseInt(tally) || 0

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
    $('#individual-tallies').val('')
    $('.results-container').css('display', 'none')
    $('button').html('Calculate')
  }

  displayResults = (groupTally, numOfOutreachers) => {
    $('#groupTally').html(groupTally)
    $('#numOfOutreachers').html(numOfOutreachers)
    $('.results-container').css('display', 'block')
    $('button').html('Clear')
  }
})
