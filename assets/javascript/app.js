$(document).ready(function()
{

    var questionsArr = [{
        question: "What is the sum of 3 and 4?", 
        correctAnswer: "7",
        wrongAnswers:
        {
            1:"1",
            2:"5",
            3:"12"
        },
    },
    {
        question: "How many letters are in the word apple?", 
        correctAnswer: "5",
        wrongAnswers:
        {
            1:"2",
            2:"6",
            3:"3"
        },

    },
    {
        question: "What is the capital of Georgia?",
        correctAnswer: "Atlanta",
        wrongAnswers:
        {
            1:"Columbus",
            2:"Macon",
            3:"Gainesville"
        }
    }];

    var gameLength = 3;
    var i = 0;
    var time = 5;

    $("#start-button").show();
    $("#timer").hide();
    $("#question").hide();
    $("#answers-div").hide();


    // This is a function that gets the next trivia question when the player answers a question
    function getNextQuestion()
    {
        //
    }

    function timer()
    {
            console.log("Timer: " + time +"s");
            console.log(typeof time);
            var timer = setInterval(startTimer, 1000);
            
            function startTimer()
            {
                time--;
                console.log("Timer: " + time +"s");
            }

            if(time == 0)
            {
                clearInterval();
            }
    }

    $("#start-button").on("click", function()
    {
        console.log("Game Started");
        
        $("#start-button").hide();
        $("#timer").show();
        $("#question").show();
        $("#answers-div").show();

        // Displays first question
        console.log("Question: " + questionsArr[i].question);
        console.log("Answer 1: " + questionsArr[i].wrongAnswers[1]);
        console.log("Answer 2: " + questionsArr[i].wrongAnswers[2]);
        console.log("Answer 3: " + questionsArr[i].wrongAnswers[3]);
        console.log("Answer 4: " + questionsArr[i].correctAnswer);

        // Starts first timer
        timer();

        $(".answer").on("click", function()
        {
            console.log("Button Clicked: " + ($(this).text()));
            console.log("Correct Answer: " + questionsArr[i].correctAnswer);
            if ($(this).text() != questionsArr[i].correctAnswer)
            {
                console.log("Wrong answer!");
                // Increase wrong answer count
                wrongCount++;
                getNextQuestion();
            }
            else
            {
                console.log("Correct Answer");
                // Increase correct answer count
                correctCount++;
                getNextQuestion();

            }
        });

    });

});