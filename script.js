$(function () {

  $('form').submit(function (e, api, term) {
    e.preventDefault();
    var api = "https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srsearch=";
    var $input = $('form').find('input');
    var term = $input.val();
    var url = api + term;
    var $error = $('.error');
    if ($input.val() != '') {
      $.ajax({
        url: url,
        dataType: 'json',
        type: 'GET',
        success: function (data) {
          var json = data.query.search;
          handleBuildList(json);
        }
      });
      $input.val('');
      $error.hide();
    } else {
      $error.show();
    }
  });

  function handleBuildList(json) {
    $ul = $('ul');
    for (var i = 0; i < json.length; i++) {
      var link = "https://en.wikipedia.org/?curid=" + json[i].pageid;
      var snip = json[i].snippet.split(".", 1) + ".";
      $ul.append('<a href="' + link + '"><li><h2>' + json[i].title + '</h2><p>' + snip + '</p></li></a>');
    }
  }


});
