$(document).ready(function() {
  var app = {
    cards: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
    cardImageMap: [
        'Cards/ITCrowd.jpg',
        'Cards/Internet.jpg',
        'Cards/KeepCalm.png',
        'Cards/Bones.jpg',
        'Cards/Douglas.jpg',
        'Cards/Richmond.jpg',
    ],
    init: function() {
      app.shuffle();
    },
    shuffle: function() {
      var random = 0;
      var temp = 0;
      for (i = 1; i < app.cards.length; i++) {
        random = Math.round(Math.random() * i);
        temp = app.cards[i];
        app.cards[i] = app.cards[random];
        app.cards[random] = temp;
      }
      app.assignCards();
      console.log('Shuffled Card Array: ' + app.cards);
    },
    assignCards: function() {
      $('.card').each(function(index) {
        $(this).attr('data-card-value', app.cards[index]);//.attr adds to div, data JQ, card is assigned class, value JQ 
      });
    $('.clicks').each(function(index) {
        $(this).attr('data-count', 0);
    })
      app.clickHandlers();
    },
    clickHandlers: function() {
      $('.card').on('click', function() {
        if ($(this).hasClass('unmatched')) {
        var imageLocation = app.cardImageMap[$(this).data('cardValue')-1];
        $(this).html("<img src='" + imageLocation + "'>").addClass('selected'); //.data cardValue is camelCase from data-card-value, addClass 'selected is temporary while checking
       
       //Count try 2:
    //     var theCount = $('#clicks').data('count');
    //    $('#clicks').attr('data-count', theCount+1)
    //    $('#clicks').html("Click count:" + theCount+1);
       
       //Count try 1:
       // $('.clicks').each(function(index) {
       //var theCount = $(this).data('count');
      // theCount++;
       // $(this).attr('data-count', theCount);
      // $(this).html("You used this many clicks:" + theCount);
    //})

        app.checkMatch();
      }});
    },
    checkMatch: function() {
      if ($('.selected').length === 2) {
        if ($('.selected').first().data('cardValue') === $('.selected').last().data('cardValue')) {
          $('.selected').each(function() {
            $(this).animate({
              opacity: 50 
            }).removeClass('unmatched');//.removeClass('card').addClass('matchedCard');//
          });
          $('.selected').each(function() {
            $(this).removeClass('selected');
          });
          app.checkWin();
        } else {
          setTimeout(function() {
            $('.selected').each(function() {
              $(this).html('').removeClass('selected');
            });
          }, 1000);
        }
      }
    },
    checkWin: function() {
      if ($('.unmatched').length === 0) {
        $('.container').html('<h1>You Won!</h1>');
      }
    }
  };
  app.init();
});