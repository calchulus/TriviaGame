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
        },
        three: {
            question: "This person was awarded the Presidential Medal of Freedom for leading the development of on-board flight software for NASA's Apollo Moon missions.",
            answers: ["Grace Hopper", "Margaret Hamilton", "Larry Page", "Linus Torvalds"],
            correct: "Margaret Hamilton"
        },
        four: {
            question: "The companies HP, Microsoft and Apple were all started in a what?",
            answers: ["Kitchen", "Public Restroom", "Garage", "Classroom"],
            correct: "Garage"
        },
        five: {
            question: "This person invented the first compiler for a commputer programming language.",
            answers: ["Linus Torvalds", "Steve Jobs", "Bill Gates", "Grace Hopper"],
            correct: "Grace Hopper"
        },
        six: {
            question: "This person was an American religious sister, educator and pioneer in computer science and participated in the development of the BASIC programming language.",
            answers: ["Mary Kenneth Keller", "Mother Teresa", "Maura Clark", "Mother Angelica"],
            correct: "Mary Kenneth Keller"
        },
        seven: {
            question: "With over 17 million units produced, what was the highest selling single model of personal computer ever?",
            answers: ["IBM PC", "Apple 2", "Commodore 64", "MSX"],
            correct: "Commodore 64"
        },
        eight: {
            question: "1,024 Gigabytes is equal to one what?",
            answers: ["1 Terabit", "1.21 Gigawatts", "1 Petabyte", "1 Terabyte"],
            correct: "1 Terabyte"
        },
        nine: {
            question: "What Harvard dropout co-founded Microsoft?",
            answers: ["Steve Jobs", "Steve Wozniak", "Bill Gates", "Elon Musk"],
            correct: "Bill Gates"
        }
    };

    var keys = Object.keys(questions);
    var key = keys[n];
    var time = 30;
    var n = 0;
    var correctAnswerDiv = $("<div id='correct-answer'></div>");
    var timeDiv = $("<div id='timeRemaining'><h3></h3></div>");
    var questionDiv = $("<div id='question'><h3></h3></div>");
    var answerDiv = $("<div id='answers'></div>");

    function game() {
        $("#startButton").css("display", "none");
        $("h2").remove();

        var correct = 0;
        var wrong = 0;
        var outOfTime = 0;
        n = 0;
        key = keys[n];

        var reset = function() {
            time = 30;
            $("#correct-answer").empty();
            $("#correct-answer").remove();
            $("#main").append(timeDiv);
            $("#timeRemaining h3").html("Time Remaining: " + time);
            $("#main").append(questionDiv);
            $("#main").append(answerDiv);
        }

        reset();

        function displayQAndA() {
            $("#question h3").html(questions[key].question);
            for (var i = 0; i < questions[key].answers.length; i++) {
                $("#answers").append("<p class='answer'>" + questions[key].answers[i] + "<p>");
            }
            $("#answers p").on("click", function() {
                var selected = $(this).text();
                if (selected === questions[key].correct) {
                    clearInterval(counter);
                    $(timeDiv).remove();
                    $(questionDiv).remove();
                    $("#answers p").remove();
                    $(answerDiv).remove();
                    $("#main").append(correctAnswerDiv);
                    $("#correct-answer").text("That is Correct");
                    correct++;
                } else {
                    clearInterval(counter);
                    $(timeDiv).remove();
                    $(questionDiv).remove();
                    $("#answers p").remove();
                    $(answerDiv).remove();
                    $("#main").append(correctAnswerDiv);
                    $("#correct-answer").text("The correct answer was " + questions[key].correct + ".");
                    wrong++;
                }
                n++;
                key = keys[n];
                if (checkIfLast()) {
                    displayFinalScore();
                } else {
                    setTimeout(countReset, 3000);
                    setTimeout(reset, 3000);
                    setTimeout(displayQAndA, 3000);
                }
            });
        }

        displayQAndA();

        var counter = setInterval(count, 1000);

        function count() {
            time--
            $("#timeRemaining h3").html("Time Remaining: " + time);
            if (time < 1) {
                clearInterval(counter);
                $(timeDiv).remove();
                $(questionDiv).remove();
                $("#answers p").remove();
                $(answerDiv).remove();
                $("#main").append(correctAnswerDiv);
                $("#correct-answer").html("<h2>Out of time!</h2><h1>The correct answer was " + questions[key].correct + ".</h1>");
                outOfTime++;
                n++;
                key = keys[n];
                if (checkIfLast()) {
                    displayFinalScore();
                } else {
                    setTimeout(countReset, 3000);
                    setTimeout(reset, 3000);
                    setTimeout(displayQAndA, 3000);
                }
            }
        }

        function countReset() {
            counter = setInterval(count, 1000);
        }

        function checkIfLast() {
            if (key === undefined) {
                return true;
            }
            return false;
        }

        function displayFinalScore() {
            $("#correct-answer").remove();
            $("#startButton").css("margin-top", "20px");
            $("#startButton").css("display", "inline");
            $("#main").prepend("<h2>Ran out of time on: " + outOfTime + "</h2>");
            $("#main").prepend("<h2>Wrong Answers: " + wrong + "</h2>");
            $("#main").prepend("<h2 id='first'>Correct Answers: " + correct + "</h2>");

        }
    };

    $(document).on("click", "#startButton", game);

});
