var $userIArray = [];

var jsonArray = null;



$.getJSON('podaci.json', function(data) {
  jsonArray = data;
  $("#oblast").text(jsonArray.oblast);
  var time = parseInt(jsonArray.vreme);
  startTimer(time, $("#time"));
  $("input").autocomplete( {
    source: jsonArray.ponudjene
  });
});

$("#add").click( function() {
	var temp = $("input").val();
	$userIArray.push(temp);
	$(".addedUI").append("<div><p>"+temp+"</p> <span>x</span></div>");
	$("input").val("");
});

$("#writeAll").click( function() {
	console.log($userIArray);
    console.log(jsonArray);
    console.log($userIArray.length)
});

$(".addedUI").on('click', "div", function() {  //dynamic div element je this
	var temp = $(this).children("p").text()
	$userIArray.splice($userIArray.indexOf(temp),1);
	$(this).remove();
});

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {   //kada tajmer stigne do 0
            timer = duration;
            kraj();
        }
    }, 1000);
}

function kraj() {
    var tacno = 0;
    for (i=0, l=$userIArray.length; i<l; i++) {
        for (j=0, k=jsonArray.tacno.length; j<k; j++) {
            if ($userIArray[i] == jsonArray.tacno[j]) {
                tacno++;
                break;
            }
        }
    }
    console.log(tacno);
    tacno=20*tacno;
    window.location.assign("index2.html?tacno="+tacno);
};

$("#zavrsi").click( function() {
    kraj()
});