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
    var n = 0;
    var key = keys[n];

    var time = 5;
    var correct = 0;
    var wrong = 0;
    var outOfTime = 0;

    $("#startButton").on("click", function() {
        $("#startButton").css("display", "none");

        var reset = function() {
            var timeDiv = $("<div id='timeRemaining'><h3></h3></div>");
            var questionDiv = $("<div id='question'><h3></h3></div>");
            var answerDiv = $("<div id='answers'></div>");
            time = 5;
            $("#main").empty();
            $("#main").append(timeDiv);
            $("#timeRemaining h3").html("Time Remaining: " + time);
            $("#main").append(questionDiv);
            $("#main").append(answerDiv);
        }

        reset();

        function displayQAndA() {

            $("#main").css("visibility", "visible");

            $("#question h3").html(questions[key].question);
            console.log(questions[key].answers);
            for (var i = 0; i < questions[key].answers.length; i++) {
                $("#answers").append("<p class='answer'>" + questions[key].answers[i] + "<p>");
            }
            $("#answers p").on("click", function() {
                var selected = $(this).text();
                if (selected === questions[key].correct) {
                    clearInterval(counter);
                    $("#main").html("<h1>That is Correct</h1>");
                    correct++;
                } else {
                    clearInterval(counter);
                    $("#main").html("<h1>The correct answer was " + questions[key].correct + ".</h1>");
                    wrong++;
                }
                n++;
                key = keys[n];
                if (checkIfLast()){
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
                $("#main").html("<h2>Out of time!</h2><h1>The correct answer was " + questions[key].correct + ".</h1>");
                outOfTime++;
                n++;
                key = keys[n];
                if (checkIfLast()){
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

        function checkIfLast () {
            if (key === undefined) {
                return true;
            }
            return false;
        }

        function displayFinalScore () {
            $("#main").empty();
            $("#main").append("<h2>Correct Answers: " + correct + "</h2>");
            $("#main").append("<h2>Wrong Answers: " + wrong + "</h2>");
            $("#main").append("<h2>Ran out of time on: " + outOfTime + "</h2>");
        }
    });

    //need to make the last question show the results

});
