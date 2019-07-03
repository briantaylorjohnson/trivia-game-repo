// Executes the JavaScript once the document has fully loaded (aka ready)
$(document).ready(function()
{
    // This is the array of 1980s trivia questions which will be asked of the player
    // Each question is created as an object with a Question, Correct Answer, and three Wrong Answers
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

    // These are the global variables which will be used in the trivia game. They will be reset whenver the player starts a new game.
    var time; // Number of seconds the player has to answer each question
    var correctCount; // Counts the number of times the player answers correctly
    var wrongCount; // Counts the number of times the player answers incorrectly
    var questionCount; // Determines which question from the questionsArr should be presented to the player; this begins at 0 and increments by one after each question is answered
    var timer; // Used to set the interval for updating the timer every second

    // This sets the DOM for the initial load of the application
    $("#start-button").show();
    $("#timer").hide(); // Timer is hidden until the player starts the game
    $("#timer-label").hide(); // Timer is hidden until the player starts the game
    $("#question").hide(); // Questions are hidden before the player starts the game
    $("#question2").hide(); // Questions are hidden before the player starts the game
    $("#answers-div").hide(); // Answers are hidden before the player starts the game
    $("#play-again-button").hide(); // Play Again button is hidden before the player has finished the game
    $("#play-image").hide(); // Play game image is hidden before the the player starts the game


    // Function that retrieves the next trivia question when the player starts the game or answers a question
    function getNextQuestion()
    {
        // Resets the timer by setting time = 10, updating the DOM, and kicking off the setInterval timer to update the DOM every 1 second (1000 ms)
        time = 10;
        $("#timer").text(time + "s");
        timer = setInterval(startTimer, 1000);

        // Displays next question and answers in the console for debugging purposes; it does not specify which answer is the correct one, though.
        console.log("Question: " + questionsArr[questionCount].question);
        console.log("Answer 1: " + questionsArr[questionCount].wrongAnswers[1]);
        console.log("Answer 2: " + questionsArr[questionCount].wrongAnswers[2]);
        console.log("Answer 3: " + questionsArr[questionCount].wrongAnswers[3]);
        console.log("Answer 4: " + questionsArr[questionCount].correctAnswer);

        // Updates the DOM with the next question and answers
        $("#question").text(questionsArr[questionCount].question);
        $("#first-answer").text(questionsArr[questionCount].wrongAnswers[1]);
        $("#second-answer").text(questionsArr[questionCount].wrongAnswers[2]);
        $("#third-answer").text(questionsArr[questionCount].wrongAnswers[3]);
        $("#fourth-answer").text(questionsArr[questionCount].correctAnswer);
    }
    
    // Function which is invoked when the game has ended for the player
    function endGame()
    {
        // Displays the game over message, number of questions answered correctly, and number of questions answered incorrectly in the console for debugging purposes
        console.log("Game over!")
        console.log("Correct Answers: " + correctCount);
        console.log("Wrong Answers: " + wrongCount);

        // Updates the DOM with the game over message, number of questions answered correctly, and number of questions answered incorrectly
        $("#timer-label").hide();
        $("#timer").text("Game over!");
        $("#question2").text("Wrong Answers: " + wrongCount);
        $("#question").text("Correct Answers: " + correctCount);
        $("#question2").show();
        $("#question2").text("Wrong Answers: " + wrongCount);
        $("#answers-div").hide();

        // Updates the DOM with play again button so the player can start the game again
        $("#play-again-button").show();

    }

    // Function which updates the for the countdown; the setInterval function called in getNextQuestion() invokes this fucntion
    function startTimer()
    {
        // When this function is invoked, if the time has run out (equals zero), then the player is notified with a modal
        if(time == 0)
        {
            // Timer is stopped at 0 seconds to prevent negative time
            stopTimer();

            // Displays time up message in console for debugging purposes
            console.log("Time is up!");

            // Updates the DOM in the timeout modal with the correct answer to the question
            $("#correctAnswer2").text(questionsArr[questionCount].correctAnswer);

            // Triggers the timeout modal to display to the player and prevents the player from clicking out of the modal or closing it with the keyboard
            $("#timeout").modal({backdrop: 'static', keyboard: false});

            // Increments the count of questions answered incorrectly and the question count (for determining the next question to be displayed)
            wrongCount++;
            questionCount++;

            // Checks to see if all questions have been asked to the player; if so, the modal is automatically closed and the endGame() function is invoked after three seconds
            if( questionCount >= questionsArr.length)
            {
                modal = setTimeout(function () { endGame(); $("#timeout").modal('hide'); }, 3000);
            }

            // If all the questions have not been asked of the player, then the modal is automatically closed and the getNextQuestion() function is invoked after three seconds
            else
            {       
                modal = setTimeout(function () { getNextQuestion(); $("#timeout").modal('hide'); }, 3000);
            }
        }

        // If the timer has not reached zero yet, then the time is decreased by 1; the console and DOM are updated with the new time
        else
        {
            time--;
            console.log("Timer: " + time +"s");
            $("#timer").text(time +"s");
        }
    }

    // Simple function that stops the timer from running; it immediately pauses the time allowing it to be reset
    function stopTimer()
    {
        clearInterval(timer);
    }

    // Function which is invoked when the player answers a question incorrectly
    function wrongAnswer()
    {
        // Displays a message indicating the question was answered incorrectly in the console for debugging purposes
        console.log("Wrong answer!");

        // Updates the DOM in the wrong answer modal with the correct answer to the question
        $("#correctAnswer1").text(questionsArr[questionCount].correctAnswer);

        // Triggers the wrong answer modal to display to the player and prevents the player from clicking out of the modal or closing it with the keyboard
        $("#wrongAnswer").modal({backdrop: 'static', keyboard: false});

        // Increments the count of questions answered incorrectly and the question count (for determining the next question to be displayed)
        wrongCount++;
        questionCount++;

        // Timer is stopped to keep it from running while the modal is displayed; it will reset after the modal closes automatically
        stopTimer();

        // Checks to see if all questions have been asked to the player; if so, the modal is automatically closed and the endGame() function is invoked after three seconds
        if( questionCount >= questionsArr.length)
        {
            modal = setTimeout(function () { endGame(); $("#wrongAnswer").modal('hide'); }, 3000);
        }

        // If all the questions have not been asked of the player, then the modal is automatically closed and the getNextQuestion() function is invoked after three seconds
        else
        {       
            modal = setTimeout(function () { getNextQuestion(); $("#wrongAnswer").modal('hide'); }, 3000);
        }
    }

    // Function which is invoked when the player answers a question correctly
    function correctAnswer()
    {
        // Displays a message indicating the question was answered correctly in the console for debugging purposes
        console.log("Correct Answer");

        // Triggers the correct answer modal to display to the player and prevents the player from clicking out of the modal or closing it with the keyboard
        $("#correctAnswer").modal({backdrop: 'static', keyboard: false});

        // Increments the count of questions answered correctly and the question count (for determining the next question to be displayed)
        correctCount++;
        questionCount++;

        // Timer is stopped to keep it from running while the modal is displayed; it will reset after the modal closes automatically
        stopTimer();

        // Checks to see if all questions have been asked to the player; if so, the modal is automatically closed and the endGame() function is invoked after three seconds
        if( questionCount >= questionsArr.length)
        {
            modal = setTimeout(function () { endGame(); $("#correctAnswer").modal('hide'); }, 3000);
        }

        // If all the questions have not been asked of the player, then the modal is automatically closed and the getNextQuestion() function is invoked after three seconds
        else
        {       
            modal = setTimeout(function () { getNextQuestion(); $("#correctAnswer").modal('hide'); }, 3000);
        }
    }

    // jQuery event listener for the buttons that can start the game -- these are the initial "Start Party" button and "Play again?" button
    $(".start-game").on("click", function()
    {
        // Ensures that the question count is set to zero when the game starts
        questionCount = 0;

        // Ensures that the correctly answered questions count is set to zero when the game starts
        correctCount = 0;

        // Ensures that the incorrectly answered questions count is set to zero when the game starts
        wrongCount = 0;
        
        // Ensures that the timer is set to the correct start time for the first questions; it will be reset for subsequent questions using the getNextQuestion() function
        time = 10;

        // Displays a message in the console indicating the game has officially started for debugging purposes
        console.log("Game Started");

        // This sets the DOM for the start of the game
        $(".start-game").hide(); // Hides the start game button
        $("#start-image").hide(); // Hides the start game image
        $("#timer-label").show(); // Shows the timer label
        $("#timer").text(time + "s"); // Sets the timer start time
        $("#timer").show(); // Shows the the start time
        $("#question2").hide(); // Hides <p> tag with id = "question2" which is used when the game is over to display incorrectly answered questions count
        $("#question").show(); // Shows the first question
        $("#answers-div").show(); // Shows the answers <div> and child elements for each answer to the question (total of four)
        $("#play-image").show(); // Shows the gif which is displayed while the game is being played and on the game over screen

        // Invokes the getNextQuestion() function to get the question corresponded to the questionCount number in the questionsArr[]
        getNextQuestion();
    });

    // jQuery event listener for the answer buttons displayed to the player during the game
    // The button clicked value is compared to the correct answer for the current question
    $(".answer").on("click", function()
    {
        // Displays the answer button clicked in the conole for debugging purposes
        console.log("Button Clicked: " + ($(this).text()));

        // Displays the correct answer in the conole for debugging purposes
        console.log("Correct Answer: " + questionsArr[questionCount].correctAnswer);
        
        // Checks to determine if the button clicked value equals the correct answer for the question
        // If the player selected the wrong answer, then the wrongAnswer() function is invoked
        if ($(this).text() != questionsArr[questionCount].correctAnswer)
        {
            wrongAnswer();
        }
        
        // If the player selected the correct answer, then the correctAnswer() function is invoked
        else
        {
            correctAnswer();
        }
    });
});