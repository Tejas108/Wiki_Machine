$(function () {
  var api = "https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srsearch=";
  var term = $('form').find('input').val();
  var $error = $('.error');

  $('button[type="button"]').click(function(){
    $('ul').html('');
  });

  $('form').submit(function (e, api, term) {
    e.preventDefault();
    var api = "https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srsearch=";
    var $input = $('form').find('input');
    var term = $input.val();
    var url = api + term;

    if ($input.val() != '' || undefined) {
      console.log($input.val());
      $.ajax({
        url: url,
        dataType: 'json',
        type: 'GET',
        success: function (data) {
          $('ul').html('');
          var json = data.query.search;
          handleBuildList(json);
        }
      });
      $input.val('');
    } else {
      $input.attr('placeholder','Enter a search term');
    }
  });

  function handleBuildList(json) {
    var $ul = $('ul');
    for (var i = 0; i < json.length; i++) {
      var link = "https://en.wikipedia.org/?curid=" + json[i].pageid;
      var snip = json[i].snippet.split(".", 1) + ".";
      $ul.append('<li class="mdl-list__item"><a href="' + link + '"><p class="mdl-list__item-primary-content"><strong>' + json[i].title + '</strong></p><p>' + snip + '</p></a></li>');
      $ul.children().hide();
    }

    $('ul li').each(function(i){
      $(this).delay(400*i).fadeIn(300);
    });
  }

});
