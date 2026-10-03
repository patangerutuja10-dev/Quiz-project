const questions = [

    {
        question: "Which keyword is used to create a class in Java?",

        options: [
            "class",
            "Class",
            "new",
            "object"
        ],

        answer: 0
    },

    {
        question: "Which symbol is used for comments in Python?",

        options: [
            "//",
            "#",
            "/* */",
            "<!-- -->"
        ],

        answer: 1
    },

    {
        question: "What does HTML stand for?",

        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],

        answer: 0
    },

    {
        question: "Which keyword is used to declare a variable in JavaScript?",

        options: [
            "int",
            "var",
            "define",
            "variable"
        ],

        answer: 1
    },

    {
        question: "Which function is used to print output in C?",

        options: [
            "print()",
            "cout",
            "printf()",
            "display()"
        ],

        answer: 2
    },

    {
        question: "Which method is the entry point of a Java program?",

        options: [
            "start()",
            "main()",
            "run()",
            "execute()"
        ],

        answer: 1
    },

    {
        question: "Which data type is used to store True or False in Python?",

        options: [
            "int",
            "string",
            "bool",
            "float"
        ],

        answer: 2
    },

    {
        question: "Which tag is used to create a paragraph in HTML?",

        options: [
            "<p>",
            "<h1>",
            "<br>",
            "<para>"
        ],

        answer: 0
    },

    {
        question: "Which symbol is used for strict equality in JavaScript?",

        options: [
            "=",
            "==",
            "===",
            "!="
        ],

        answer: 2
    },

    {
        question: "Which symbol is used to end a statement in C?",

        options: [
            ".",
            ",",
            ":",
            ";"
        ],

        answer: 3
    }

];


let currentQuestion = 0;

let userAnswers = [];

let studentName = "";

let studentEmail = "";


/* START QUIZ */

function startQuiz() {

    studentName =
        document.getElementById("name")
        .value
        .trim();

    studentEmail =
        document.getElementById("email")
        .value
        .trim();

    const error =
        document.getElementById("error");


    if (studentName === "" ||
        studentEmail === "") {

        error.textContent =
            "Please enter your name and email.";

        return;
    }


    if (!studentEmail.includes("@")) {

        error.textContent =
            "Please enter a valid email.";

        return;
    }


    error.textContent = "";


    userAnswers =
        new Array(questions.length).fill(null);


    currentQuestion = 0;


    document
        .getElementById("startScreen")
        .classList.add("hidden");


    document
        .getElementById("quizScreen")
        .classList.remove("hidden");


    showQuestion();
}


/* SHOW QUESTION */

function showQuestion() {

    const question =
        questions[currentQuestion];


    document.getElementById(
        "questionNumber"
    ).textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    document.getElementById(
        "question"
    ).textContent =
        question.question;


    document.getElementById(
        "progressBar"
    ).style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    const optionsContainer =
        document.getElementById("options");


    optionsContainer.innerHTML = "";


    question.options.forEach(
        (option, index) => {

            const optionDiv =
                document.createElement("div");


            optionDiv.classList.add("option");


            optionDiv.textContent =
                option;


            if (userAnswers[currentQuestion] === index) {

                optionDiv.classList.add("selected");
            }


            optionDiv.onclick =
                function () {

                    selectAnswer(
                        index
                    );
                };


            optionsContainer.appendChild(
                optionDiv
            );
        }
    );


    const previousBtn =
        document.getElementById(
            "previousBtn"
        );


    if (currentQuestion === 0) {

        previousBtn.disabled = true;

        previousBtn.style.opacity = "0.5";

    } else {

        previousBtn.disabled = false;

        previousBtn.style.opacity = "1";
    }


    const nextBtn =
        document.getElementById(
            "nextBtn"
        );


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextBtn.textContent =
            "Submit Test ✓";

    } else {

        nextBtn.textContent =
            "Next →";
    }
}


/* SELECT ANSWER */

function selectAnswer(index) {

    userAnswers[currentQuestion] =
        index;


    const allOptions =
        document.querySelectorAll(
            ".option"
        );


    allOptions.forEach(
        option => {

            option.classList.remove(
                "selected"
            );
        }
    );


    allOptions[index]
        .classList.add("selected");
}


/* NEXT QUESTION */

function nextQuestion() {

    if (
        userAnswers[currentQuestion] ===
        null
    ) {

        alert(
            "Please select an answer."
        );

        return;
    }


    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        showQuestion();

    } else {

        submitQuiz();
    }
}


/* PREVIOUS QUESTION */

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();
    }
}


/* SUBMIT QUIZ */

function submitQuiz() {

    let score = 0;


    questions.forEach(
        (question, index) => {

            if (
                userAnswers[index] ===
                question.answer
            ) {

                score++;
            }
        }
    );


    const wrong =
        questions.length - score;


    document
        .getElementById("quizScreen")
        .classList.add("hidden");


    document
        .getElementById("resultScreen")
        .classList.remove("hidden");


    document.getElementById(
        "studentName"
    ).textContent =
        `Well done, ${studentName}!`;


    document.getElementById(
        "totalQuestions"
    ).textContent =
        questions.length;


    document.getElementById(
        "correctAnswers"
    ).textContent =
        score;


    document.getElementById(
        "wrongAnswers"
    ).textContent =
        wrong;


    document.getElementById(
        "finalScore"
    ).textContent =
        `Your Score: ${score} / ${questions.length}`;


    document
        .getElementById("wrongSection")
        .classList.add("hidden");
}


/* SHOW WRONG ANSWERS */

function showWrongAnswers() {

    const wrongSection =
        document.getElementById(
            "wrongSection"
        );


    const wrongList =
        document.getElementById(
            "wrongAnswersList"
        );


    wrongList.innerHTML = "";


    questions.forEach(
        (question, index) => {

            if (
                userAnswers[index] !==
                question.answer
            ) {

                const wrongCard =
                    document.createElement(
                        "div"
                    );


                wrongCard.classList.add(
                    "wrong-card"
                );


                const yourAnswer =
                    userAnswers[index] !== null
                        ? question.options[
                            userAnswers[index]
                        ]
                        : "Not Answered";


                const correctAnswer =
                    question.options[
                        question.answer
                    ];


                wrongCard.innerHTML = `

                    <p>
                        <strong>
                            Q${index + 1}.
                        </strong>
                        ${question.question}
                    </p>

                    <p class="your-answer">
                        Your Answer:
                        ${yourAnswer}
                    </p>

                    <p class="correct-answer">
                        Correct Answer:
                        ${correctAnswer}
                    </p>

                `;


                wrongList.appendChild(
                    wrongCard
                );
            }
        }
    );


    wrongSection.classList.remove(
        "hidden"
    );


    wrongSection.scrollIntoView({
        behavior: "smooth"
    });
}


/* RESTART QUIZ */

function restartQuiz() {

    currentQuestion = 0;

    userAnswers = [];

    document
        .getElementById("resultScreen")
        .classList.add("hidden");


    document
        .getElementById("startScreen")
        .classList.remove("hidden");


    document.getElementById(
        "name"
    ).value = "";


    document.getElementById(
        "email"
    ).value = "";


    document.getElementById(
        "wrongAnswersList"
    ).innerHTML = "";
}