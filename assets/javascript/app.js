$(document).ready(function()
{

    var questionsArr = [{
        question: "What band/artist sang the song: Hot for Teacher?", 
        correctAnswer: "Van Halen",
        wrongAnswers:
        {
            1:"Ted Nugent",
            2:"Bon Jovi",
            3:"Prince",
        },
    },
    {
        question: "The Muppets were the brainchild of this man:",
        correctAnswer: "Jim Henson",
        wrongAnswers:
        {
            1:"Tim Burton",
            2:"John Denver",
            3:"Kermit the Frog",
        }
    },
    {
        question: "Which 80s stuffed toy would playback a cassette tape? Hint: These can 'barely' be found now!",
        correctAnswer: "Teddy Ruxpin",
        wrongAnswers:
        {
            1:"Cabbage Patch Kids",
            2:"Care Bears",
            3:"Glo-Worm",
        }
    },
    {
        question: "Who was the lead singer for the band Poison?", 
        correctAnswer: "Brett Michaels",
        wrongAnswers:
        {
            1:"Bono",
            2:"Michael Jackson",
            3:"Mark Knopfler",
        },

    },
    {
        question: "This super model was famous for her pinup in a red swimsuit:",
        correctAnswer: "Farrah Fawcett",
        wrongAnswers:
        {
            1:"Cindy Crawford",
            2:"Brooke Shields",
            3:"Christie Brinkley",
        }
    },
    {
        question: "Which famouse 1980s beverage came in the flavor Ecto-Cooler?",
        correctAnswer: "Hi-C",
        wrongAnswers:
        {
            1:"Capri Sun",
            2:"Juicy Juice",
            3:"Crystal Light",
        }
    },
    {
        question: "What was the most popular car of the 1980s?",
        correctAnswer: "Ford Escort",
        wrongAnswers:
        {
            1:"Vauxhall Cavalier",
            2:"Austin/MG Metro",
            3:"Subraru BRAT",
        }
    },
    {
        question: "Who directed the movie The Breakfast Club?",
        correctAnswer: "John Hughes",
        wrongAnswers:
        {
            1:"Steven Spielberg",
            2:"Tim Burton",
            3:"James Cameron",
        }
    }];

    var time = 10;
    var correctCount;
    var wrongCount;
    var questionCount;
    var timer;

    $("#start-button").show();
    $("#timer").hide();
    $("#timer-label").hide();
    $("#question").empty();
    $("#question").hide();
    $("#question2").empty();
    $("#question2").hide();
    $("#answers-div").hide();
    $("#play-again-button").hide();
    $("#play-image").hide();


    // This is a function that gets the next trivia question when the player answers a question
    function getNextQuestion()
    {
        $("#timer").text("10s");
        time = 10;
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

        $("#timer-label").hide();
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
            $("#correctAnswer2").text(questionsArr[questionCount].correctAnswer);
            $("#timeout").modal({backdrop: 'static', keyboard: false});

            wrongCount++;
            questionCount++;
            if( questionCount >= questionsArr.length)
            {
                modal = setTimeout(function () { endGame(); $("#timeout").modal('hide'); }, 3000);
            }

            else
            {       
                modal = setTimeout(function () { getNextQuestion(); $("#timeout").modal('hide'); }, 3000);
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
        $("#wrongAnswer").modal({backdrop: 'static', keyboard: false});

        // Increase wrong answer count
        wrongCount++;
        questionCount++;
        stopTimer();

        if( questionCount >= questionsArr.length)
        {
            modal = setTimeout(function () { endGame(); $("#wrongAnswer").modal('hide'); }, 3000);
        }

        else
        {       
            modal = setTimeout(function () { getNextQuestion(); $("#wrongAnswer").modal('hide'); }, 3000);
        }
    }

    function correctAnswer()
    {
        console.log("Correct Answer");
        $("#correctAnswer").modal({backdrop: 'static', keyboard: false});
        // Increase correct answer count
        correctCount++;
        questionCount++;
        stopTimer();

        if( questionCount >= questionsArr.length)
        {
            modal = setTimeout(function () { endGame(); $("#correctAnswer").modal('hide'); }, 3000);
        }

        else
        {       
            modal = setTimeout(function () { getNextQuestion(); $("#correctAnswer").modal('hide'); }, 3000);
        }
    }

    $(".start-game").on("click", function()
    {
        questionCount = 0;
        correctCount = 0;
        wrongCount = 0;
        
        console.log("Game Started");
        $(".start-game").hide();
        $("#start-image").hide();
        $("#timer-label").show();
        $("#timer").text("10s");
        $("#timer").show();
        $("#question2").hide();
        $("#question").show();
        $("#answers-div").show();
        $("#play-image").show();

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
        }
    });
});