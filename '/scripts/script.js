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
  var rootRef = new Firebase("https://horsenet.firebaseio.com")
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
      rootRef.on("value", function(snapshot) {
        id = snapshot.val().id;
      });
      if($("#startText").val() != "" && $("#startTitle").val() != "") {
      ref.push({
        text: text,
        title: title,
        image: img,
        id: id+=1
      });
      rootRef.update({
        id: id+=1
      });
      console.log(id);
      location.reload(true);
    }
    }
  });
  ref.limitToLast(50).on("child_added", function(snapshot) {
    var snap = snapshot.val();
    var id = snapshot.val().id;
    console.log(id);
    var image = snapshot.val().image;
    console.log(image);
    var text = snapshot.val().text;
    console.log(text);
    var title = snapshot.val().title;
    console.log(title);
    var replyText = snapshot.val().replies.text;
    var replyId = snapshot.val().replies.id;
    $(".boardCont").append('<div class="postCont"><p class="postTitle"><span class="name">Anonymous ID: '+id+' '+title+'</p><img class="postImg" src="' + image + '"><p class="postText">' + text + '</p><a href="#/" id="'+id+'" class="replyLink">Reply</a><div class="postReply"><p class="replyTitle">Anonymous ID: '+replyId+'</p><p class="replyText">'+replyText+'</p></div></div>');
  });
  $("a").click(function() {
    var replyLink = $(this).attr("id");
    console.log(replyLink);
  });
});
