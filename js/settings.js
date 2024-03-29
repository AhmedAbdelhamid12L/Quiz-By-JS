import { Quiz } from "./quiz.js";

export class Settings{
  constructor() {
    this.questions;

    this.numberOfQuestionsElement = document.getElementById("numberOfQuestions");
    this.categoryElement = document.getElementById("category");
    this.difficultyElement = document.getElementsByName("difficulty");
    this.startBtn = document.getElementById("startBtn");
    this.startBtn.addEventListener("click" , this.startQuiz.bind(this));
  }

  async startQuiz() {
    this.amount = this.numberOfQuestionsElement.value;
    this.category = this.categoryElement.value;
    this.difficulty = Array.from(this.difficultyElement).filter(el => el.checked)[0].value;

    this.questions = await this.fetchUrl(`https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.difficulty}`);
    if(this.questions.length > 0) {
      $("#setting").fadeOut(500 , ()=>{
        $("#quiz").fadeIn(500)
      })
      new Quiz(this.questions);
    }
  }

  async fetchUrl(URL) {
    let result = await (await fetch(URL)).json();
    return result.results;
  }
} 

