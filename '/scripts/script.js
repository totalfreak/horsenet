fileUpload = false;
function upload(file) {
  if(!file || !file.type.match(/image.*/)) return;

  $("#upText").text("Uploading...");

  var fd = new FormData();
  fd.append("image", file);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://api.imgur.com/3/image.json");
  xhr.onload = function() {
    imgLink = JSON.parse(xhr.responseText).data.link;
    console.log(imgLink);
    $("#upPreview").attr("src", imgLink);
    $("#upText").text("Uploaded");
    fileUpload = true;
    console.log(fileUpload);
  }
  xhr.setRequestHeader('Authorization', 'Client-ID 934450ed904f529');

  xhr.send(fd);
}
$(document).ready(function() {
  console.log(fileUpload);
  var ref = new Firebase("https://horsenet.firebaseio.com/posts/");
    $("#startPost").click(function() {
      $("#startOverlap").css({opacity: 0.7, zIndex: 1});
      $("#startCont").css({opacity: 0.8, zIndex: 1});
      $("body").css({overflow: "hidden"});
    });
    $("#leaveStart").click(function() {
      $("#startOverlap").css({opacity: 0, zIndex: -10});
      $("#startCont").css({opacity: 0, zIndex: -10})
      $("body").css({overflow: "auto"});
    });
    $("#postButt").click(function() {
    if(fileUpload) {
      var text = $("#startText").val();
      var title = $("#startTitle").val();
      var img = imgLink;
      console.log(fileUpload);
      if($("#startText").val() != "" && $("#startTitle").val() != "") {
      ref.push({
        text: text,
        title: title,
        image: img
      });
      location.reload(true);
    }
    }
  });
});
