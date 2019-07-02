$(document).ready(function()
{

    var questionsArr = [{
        question: "What is the sum of 3 and 4?", 
        correctAnswer: "7",
        wrongAnswers:
        {
            1:"1",
            2:"5",
            3:"12",
        },
    },
    {
        question: "How many letters are in the word apple?", 
        correctAnswer: "5",
        wrongAnswers:
        {
            1:"2",
            2:"6",
            3:"3",
        },

    },
    {
        question: "What is the capital of Georgia?",
        correctAnswer: "Atlanta",
        wrongAnswers:
        {
            1:"Columbus",
            2:"Macon",
            3:"Gainesville",
        }
    }];

    var gameLength = 3;
    var i = 0;
    var time = 20;

    var correctCount;
    var wrongCount;
    var questionCount;
    var timer;
    var modal;

    $("#start-button").show();
    $("#timer").hide();
    $("#question").empty();
    $("#question").hide();
    $("#question2").empty();
    $("#question2").hide();
    $("#answers-div").hide();
    $("#play-again-button").hide();


    // This is a function that gets the next trivia question when the player answers a question
    function getNextQuestion()
    {
        $("#timer").text("20s");
        time = 20;
        timer = setInterval(startTimer, 1000);
        
        // Displays next question
        console.log("Question: " + questionsArr[questionCount].question);
        console.log("Answer 1: " + questionsArr[questionCount].wrongAnswers[1]);
        console.log("Answer 2: " + questionsArr[questionCount].wrongAnswers[2]);
        console.log("Answer 3: " + questionsArr[questionCount].wrongAnswers[3]);
        console.log("Answer 4: " + questionsArr[questionCount].correctAnswer);

        $("#question").text(questionsArr[questionCount].question);
        $("#first-answer").text(questionsArr[questionCount].wrongAnswers[1]);
        $("#second-answer").text(questionsArr[questionCount].wrongAnswers[2]);
        $("#third-answer").text(questionsArr[questionCount].wrongAnswers[3]);
        $("#fourth-answer").text(questionsArr[questionCount].correctAnswer);
    }
    
    function endGame()
    {
        console.log("Game over!")
        console.log("Correct Answers: " + correctCount);
        console.log("Wrong Answers: " + wrongCount);

        $("#timer").text("Game over!");
        $("#question2").text("Wrong Answers: " + wrongCount);
        $("#question").text("Correct Answers: " + correctCount);
        $("#question2").show();
        $("#question2").text("Wrong Answers: " + wrongCount);
        $("#answers-div").hide();

        $("#play-again-button").show();

    }

    function startTimer()
    {
        if(time == 0)
        {
            stopTimer();
            console.log("Time is up!");
            $("#timer").text("Time is up!");
            questionCount++;
            if( questionCount >= questionsArr.length)
            {
                endGame();
            }

            else
            {       
                getNextQuestion();
            }
        }
        else
        {
            time--;
            console.log("Timer: " + time +"s");
            $("#timer").text(time +"s");
        }
    }

    function stopTimer()
    {
        clearInterval(timer);
    }

    function wrongAnswer()
    {
        console.log("Wrong answer!");
        $("#correctAnswer1").text(questionsArr[questionCount].correctAnswer);
        $("#wrongAnswer").modal();

        // Increase wrong answer count
        wrongCount++;
        questionCount++;
        stopTimer();

        if( questionCount >= questionsArr.length)
        {
            modalClose(endGame());;
        }

        else
        {       
            modal = setTimeout(function () { getNextQuestion(); $("#wrongAnswer").modal('hide'); }, 3000);
        }
    }

    function correctAnswer()
    {
        console.log("Correct Answer");
        // Increase correct answer count
        correctCount++;
        questionCount++;
        stopTimer();
    }

    function modalClose(passedFunction)
    {
        
    }

    $(".start-game").on("click", function()
    {
        questionCount = 0;
        correctCount = 0;
        wrongCount = 0;
        
        console.log("Game Started");
        $(".start-game").hide();
        $("#timer").text("20s");
        $("#timer").show();
        $("#question2").hide();
        $("#question").show();
        $("#answers-div").show();

        getNextQuestion();
    });

    $(".answer").on("click", function()
    {
        console.log("Button Clicked: " + ($(this).text()));
        console.log("Correct Answer: " + questionsArr[questionCount].correctAnswer);
        if ($(this).text() != questionsArr[questionCount].correctAnswer)
        {
            wrongAnswer();
        }
        
        else
        {
            correctAnswer();

            if( questionCount >= questionsArr.length)
            {
                modalClose(endGame());;
            }

            else
            {       
                modalClose(getNextQuestion());
            }

        }
    });
});