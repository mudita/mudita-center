export interface QuestionAndAnswer {
  id: string
  question: string
  answer: string
}

export interface HelpState {
  helpQuestionsAndAnswers: QuestionAndAnswer[]
}
