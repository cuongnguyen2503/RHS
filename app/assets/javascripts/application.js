// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.raty
//= require ratyrate
//= require bootstrap
//= require bootstrap-material-design
//= require fancybox
//= require custom

$(document).ready(function(){
  $("#myModalName").html($("#new_address").data("name"));
  var directional = $("#new_address").data("directional");
  switch(directional){
    case "new_address":
      getElementById("new_address_view").style.display="block";
  }

  $(".checkbox").on("change",function(){
    $(".checkbox").not(this).prop("checked", false);
  });

  $("#room_search").submit(function(event){
    var min_square = $("#min_square").val(), max_square = $("#max_square").val(),
      min_facility = $("#min_facility").val(), max_facility = $("#max_facility").val(),
      min_price = $("#min_price").val(), max_price = $("#max_price").val(),
      address = $("#address").val(), title = $("#title").val();

      if(min_square === "" && max_square === "" &&
        min_facility == "" && max_facility === "" &&
        min_price === "" && max_price === "" &&
        address === "" && title === "" && !$(".checkbox").is(":checked")){
          event.preventDefault();
      }
  });


  $("select").change(function(){
    var id = $(this).attr("id");

    switch(id){
      case "min_square":
        min_change("square");
        break;
      case "max_square":
        max_change("square");
        break;
      case "min_price":
        min_change("price");
        break;
      case "max_price":
        max_change("price");
        break;
      case "min_facility":
        min_change("facility");
        break;
      case "max_facility":
        max_change("facility");
        break;
    }
  });
});

function min_change(name){
  var text_select = parseInt($("#min_" + name + " option:selected").text(), 10);
  var max_lenght = $("#max_" + name + " option").size();

  $("#max_"+ name)[0].selectedIndex = 0;

  for(var i = 0; i < max_lenght; i++){
    var text_collect = parseInt($("#max_" + name).find("option").eq(i).text(), 10);

    if(text_select > text_collect)
      $("#max_" + name).find("option").eq(i).hide();
    else
      $("#max_" + name).find("option").eq(i).show();
  }
}

function max_change(name){
  var text_select = parseInt($("#max_" + name + " option:selected").text(), 10);
  var min_lenght = $("#min_"+ name +" option").size();

  for(var i = 0; i < min_lenght; i++){
    var text_collect = parseInt($("#min_" + name).find("option").eq(i).text(), 10);

    if(text_select < text_collect)
      $("#min_" + name).find("option").eq(i).hide();
    else
      $("#min_" + name).find("option").eq(i).show();
  }
}

function onClick(){
  $("body").on("hidden.bs.modal", ".modal", function(){
    $(this).removeData("bs.modal");
  });
}

$(document).ready(function() {
  $.material.init();
});
