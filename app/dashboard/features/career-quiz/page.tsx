'use client'

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"

type Question = {
  id: number;
  text: string;
  answers: string[];
  scores: Record<string, number>;
};

const questions: Question[] = [
  {
    id: 1,
    text: "How comfortable are you with writing complex JavaScript code?",
    answers: ["I love complex JS challenges", "I can handle most JS tasks", "I prefer simple JS code", "I avoid JS when possible"],
    scores: { "Frontend Developer": 3, "Backend Developer": 2, "Full Stack Developer": 3, "DevOps Engineer": 1 }
  },
  {
    id: 2,
    text: "How interested are you in designing user interfaces?",
    answers: ["It's my passion", "I enjoy it sometimes", "I can do it if needed", "I'd rather not"],
    scores: { "Frontend Developer": 3, "UX/UI Designer": 3, "Full Stack Developer": 2 }
  },
  {
    id: 3,
    text: "How familiar are you with server-side programming concepts?",
    answers: ["I'm an expert", "I have good knowledge", "I know the basics", "It's all new to me"],
    scores: { "Backend Developer": 3, "Full Stack Developer": 3, "DevOps Engineer": 2 }
  },
  {
    id: 4,
    text: "How interested are you in working with databases?",
    answers: ["Databases fascinate me", "I like working with data", "I can use them if needed", "I prefer to avoid them"],
    scores: { "Backend Developer": 3, "Full Stack Developer": 2, "Database Administrator": 3 }
  },
  {
    id: 5,
    text: "How comfortable are you with version control systems like Git?",
    answers: ["Git is second nature to me", "I use it regularly", "I know basic commands", "What's Git?"],
    scores: { "Frontend Developer": 2, "Backend Developer": 2, "Full Stack Developer": 3, "DevOps Engineer": 3 }
  },
  {
    id: 6,
    text: "How interested are you in optimizing application performance?",
    answers: ["Performance is key", "I'm interested in optimization", "I can do it if needed", "It's not my priority"],
    scores: { "Frontend Developer": 2, "Backend Developer": 3, "Full Stack Developer": 3, "Performance Engineer": 3 }
  },
  {
    id: 7,
    text: "How comfortable are you with cloud technologies (e.g., AWS, Azure, GCP)?",
    answers: ["Cloud is my expertise", "I'm comfortable with cloud", "I have basic cloud knowledge", "Cloud is new to me"],
    scores: { "Cloud Architect": 3, "DevOps Engineer": 3, "Full Stack Developer": 2 }
  },
  {
    id: 8,
    text: "How interested are you in creating and managing APIs?",
    answers: ["API design excites me", "I enjoy working with APIs", "I can manage APIs", "I'd rather not work with APIs"],
    scores: { "API Developer": 3, "Backend Developer": 3, "Full Stack Developer": 2 }
  },
  {
    id: 9,
    text: "How comfortable are you with implementing accessibility features?",
    answers: ["Accessibility is a priority", "I'm familiar with accessibility", "I know basic accessibility", "Accessibility is new to me"],
    scores: { "Accessibility Specialist": 3, "Frontend Developer": 2, "UX/UI Designer": 2 }
  },
  {
    id: 10,
    text: "How interested are you in machine learning and AI integration?",
    answers: ["AI/ML is my passion", "I'm interested in AI/ML", "I have basic AI/ML knowledge", "AI/ML is not my focus"],
    scores: { "AI/ML Engineer": 3, "Data Scientist": 2, "Full Stack Developer": 1 }
  },
  {
    id: 11,
    text: "How comfortable are you with working in agile development environments?",
    answers: ["Agile is my natural environment", "I'm comfortable with agile", "I know agile principles", "Agile is new to me"],
    scores: { "Scrum Master": 3, "Product Manager": 2, "Full Stack Developer": 2, "DevOps Engineer": 2 }
  },
  {
    id: 12,
    text: "How interested are you in staying up-to-date with the latest web technologies and trends?",
    answers: ["I'm a tech enthusiast", "I stay updated on tech trends", "I keep up with some trends", "I'm not focused on tech trends"],
    scores: { "Technology Evangelist": 3, "Frontend Developer": 2, "Full Stack Developer": 2, "DevOps Engineer": 2 }
  }
] as const;

function calculateResults(answers: number[]): string {
  const scores: Record<string, number> = {};

  questions.forEach((question, index) => {
    const answerIndex = answers[index];
    const answerScores = question.scores;

    for (const [career, score] of Object.entries(answerScores)) {
      scores[career] = (scores[career] || 0) + score * (4 - answerIndex) / 3;
    }
  });

  const sortedCareers = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sortedCareers[0][0];
}

export default function CareerQuiz() {
  const totalQuestions = useMemo(() => questions.length, []);
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(() => Array(totalQuestions).fill(-1))
  const [result, setResult] = useState<string | null>(null)

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = parseInt(value)
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      if (!answers.includes(-1)) {
        setResult(calculateResults(answers))
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setAnswers(Array(totalQuestions).fill(-1))
    setResult(null)
  }

  if (result) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Your Career Recommendation</CardTitle>
          <CardDescription className="text-center">Based on your answers, we suggest:</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-center text-primary">{result}</p>
          <p className="mt-4 text-center text-muted-foreground">
            This recommendation is based on your responses to our quiz. Remember, this is just a suggestion, and your actual career path may vary based on your personal interests, experiences, and opportunities.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleReset} className="w-full">Take the Quiz Again</Button>
        </CardFooter>
      </Card>
    )
  }

  const currentQuestionData = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Next.js Career Path Quiz</CardTitle>
        <CardDescription>Question {currentQuestion + 1} of {totalQuestions}</CardDescription>
        <Progress value={progress} className="w-full mt-2" />
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-4">{currentQuestionData.text}</h3>
        <RadioGroup 
          onValueChange={handleAnswer} 
          value={answers[currentQuestion] === -1 ? undefined : answers[currentQuestion].toString()} 
          className="space-y-3"
        >
          {currentQuestionData.answers.map((answer, index) => (
            <div key={index} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent transition-colors">
              <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
              <Label htmlFor={`answer-${index}`} className="flex-grow cursor-pointer">{answer}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentQuestion === 0}>
          Previous
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={answers[currentQuestion] === -1}
        >
          {currentQuestion === totalQuestions - 1 ? "Show Results" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  )
}