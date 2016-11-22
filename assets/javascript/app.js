$(document).ready(function() {

    var questions = {
        zero: {
            question: "Steve Jobs, Steve Wozniak, and Ronald Wayne founded what company in 1976?",
            answers: ["Microsoft", "Dell", "Intel", "Apple"],
            correct: "Apple"
        },
        one: {
            question: "CERN launched the very first website in what year?",
            answers: ["1990", "1975", "1987", "1995"],
            correct: "1990"
        },
        two: {
            question: "Fonts that contain small decorative lines at the end of a stroke are known as what?",
            answers: ["Serif Fonts", "Sans Serif Fonts", "Helvetica Fonts", "Standard Fonts"],
            correct: "Serif Fonts"
        }
    };

    var keys = Object.keys(questions);
    var n = 0;
    var key = keys[n];

    var time = 30;

    $("#startButton").on("click", function() {
        $("#startButton").css("display", "none");

        var reset = function () {
        	var timeDiv = $("<div id='timeRemaining'><h3></h3></div>");
    		var questionDiv = $("<div id='question'><h3></h3></div>");
    		var answerDiv = $("<div id='answers'></div>");
        	time = 30;
        	$("#main").append(timeDiv);
        	$("#timeRemaining h3").html("Time Remaining: " + time);
        	$("#main").append(questionDiv);
        	$("#main").append(answerDiv);
  		}

  		reset();

  		var counter = setInterval(count, 1000);

        function count() {
            time--
            $("#timeRemaining h3").html("Time Remaining: " + time);
            if (time < 1) {
                clearInterval(counter);
            }
        }

        function displayQAndA() {

            $("#main").css("visibility", "visible");

            $("#question h3").html(questions[key].question);
            console.log(questions[key].answers);
            for (var i = 0; i < questions[key].answers.length; i++) {
                $("#answers").append("<p class='answer'>" + questions[key].answers[i] + "<p>");
            }
           	$("#answers p").on("click", function() {
	        	var selected = $(this).text();
	            if(selected === questions[key].correct) {
	            	$("#main").html("<h1>That is Correct</h1>");
	            } else {
	            	$("#main").html("<h1>The correct answer was " + questions[key].correct + ".</h1>");
	            }
	            n++;
	            key = keys[n];
	            //TODO need a set time out for these
	            reset();
	            displayQAndA();
	        });
        }

        displayQAndA();

        //TODO get this timeout working
        // if (time < 1) {
        // 	$("#main").html("<h2>Out of time!</h2><h1>The correct answer was " + questions[key].correct + ".</h1>");
        // 	setTimeout(reset, 3000);
        // 	setTimeout(displayQAndA, 3000);
        // }

       	//TODO check when the player is at the end of the questions and show them results
    });

});
