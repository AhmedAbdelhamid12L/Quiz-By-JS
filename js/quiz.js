export class Quiz {
  constructor(questions){
    this.questions = questions;
    this.currentQuestion = 0;
    this.totalNumberOfQuestions = this.questions.length;
    this.nextBtn = document.getElementById("next");
    this.nextBtn.addEventListener("click" ,this.nextQuestion.bind(this));
    this.score = 0;
    this.tryBtn = document.getElementById("tryBtn");
    this.tryBtn.addEventListener("click" ,this.tryAgain);

    this.showQuestion();
  }

  showQuestion(){
    document.getElementById("question").innerHTML = this.questions[this.currentQuestion].question;
    document.getElementById("currentQuestion").innerHTML = this.currentQuestion + 1 ;
    document.getElementById("totalNumberOfQuestions").innerHTML = this.totalNumberOfQuestions;

    this.getAnswers();
  }

  getAnswers(){
    this.answers = [this.questions[this.currentQuestion].correct_answer , ...this.questions[this.currentQuestion].incorrect_answers] ;
    let currentIndex = this.answers.length,
    randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [this.answers[currentIndex], this.answers[randomIndex]] = [
      this.answers[randomIndex], this.answers[currentIndex]
    ];
    }
    this.temp = ``;
    for(let i = 0 ; i < this.answers.length ; i++){
      this.temp += `
      <div class="form-check">
        <label class="form-check-label">
          <input type="radio" class="form-check-input" name="answer" id="a${i}" value="${this.answers[i]}" >
          ${this.answers[i]}
        </label>
      </div>
      `
    }
    document.getElementById("rowAnswer").innerHTML = this.temp;
  }

  checkUserAnswer(){
    this.userAnswer = [...document.getElementsByName("answer")].filter(el => el.checked)[0].value;
    this.correctAnswer = this.questions[this.currentQuestion].correct_answer;
    if(this.userAnswer == this.correctAnswer) {
      this.score++;
      return true;
    }else {
      return false;
    }
  }

  nextQuestion(){
    (this.checkUserAnswer()) ? $("#Correct").fadeIn(500 , ()=> {
      $("#Correct").fadeOut(500)}) : $("#inCorrect").fadeIn(500 , ()=> {
        $("#inCorrect").fadeOut(500)
      });
    this.currentQuestion++;
    if(this.currentQuestion < this.totalNumberOfQuestions) {
      this.showQuestion();
    }else {
      this.finish();
    }
  }

  finish(){
    $("#quiz").fadeOut(500 , ()=> {
      $("#finish").fadeIn(500)
    })
    document.getElementById("score").innerHTML = this.score;
  }

  tryAgain(){
    $("#finish").fadeOut(500 , ()=> {
      $("#setting").fadeIn(500)
    })
  }
}