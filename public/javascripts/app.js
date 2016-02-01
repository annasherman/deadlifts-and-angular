$(document).ready(function() {

    $(".button-collapse").sideNav();
    console.log('linked');

    var el = document.getElementById('noAngular');
    var sortable = Sortable.create(el, {group: "group"});

     var el = document.getElementById('noAngular2');
    var sortable = Sortable.create(el, {group: "group", onStart: function(evt) {
      console.log(evt.oldIndex);
    }});
 });
