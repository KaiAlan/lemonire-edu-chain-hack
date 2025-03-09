"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, AlertCircle, CheckCircle, ChevronLeft, ChevronRight, Send, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

interface TestDetailProps {
  testId: number
}

export function TestDetail({ testId }: TestDetailProps) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState("58:45") // Mock time remaining

  // In a real app, you would fetch the test details based on the testId
  // For this example, we'll use mock data
  const test = {
    id: testId,
    title: "Frontend Development Assessment",
    company: "TechCorp",
    jobTitle: "Senior Frontend Developer",
    dueDate: "2023-03-25",
    duration: "60 minutes",
    logo: "/placeholder.svg?height=40&width=40",
    description:
      "This assessment evaluates your knowledge of frontend development concepts, including React, JavaScript, CSS, and responsive design. Please answer all questions to the best of your ability.",
    instructions: [
      "You have 60 minutes to complete this assessment.",
      "You can navigate between questions using the previous and next buttons.",
      "Your progress is automatically saved.",
      "You can review your answers before submitting.",
      "Once submitted, you cannot retake the assessment.",
    ],
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which of the following is NOT a React hook?",
        options: ["useState", "useEffect", "useContext", "useReactState"],
        answer: "useReactState",
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets",
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "Which of the following is a valid way to declare a variable in JavaScript?",
        options: ["var x = 5;", "let x = 5;", "const x = 5;", "All of the above"],
        answer: "All of the above",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "What is the output of console.log(typeof [])?",
        options: ["array", "object", "undefined", "null"],
        answer: "object",
      },
      {
        id: 5,
        type: "text",
        question: "Explain the difference between 'let' and 'const' in JavaScript.",
      },
      {
        id: 6,
        type: "multiple-choice",
        question: "Which CSS property is used to control the spacing between elements?",
        options: ["spacing", "margin", "padding", "Both B and C"],
        answer: "Both B and C",
      },
      {
        id: 7,
        type: "multiple-choice",
        question: "What does the 'useEffect' hook do in React?",
        options: [
          "Manages component state",
          "Performs side effects in function components",
          "Creates a new React component",
          "Handles form submissions",
        ],
        answer: "Performs side effects in function components",
      },
      {
        id: 8,
        type: "text",
        question: "Describe how you would implement responsive design for a website.",
      },
    ],
  }

  const currentQuestion = test.questions[currentQuestionIndex]
  const progress = Math.round(((currentQuestionIndex + 1) / test.questions.length) * 100)

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value })
  }

  const handleTextAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers({ ...answers, [currentQuestion.id]: e.target.value })
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmitTest = () => {
    setIsSubmitted(true)
    setIsSubmitDialogOpen(false)
    // In a real app, you would submit the answers to the server here

    // After a short delay, redirect to the applied jobs page
    setTimeout(() => {
      router.push("/applied-jobs")
    }, 3000)
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <main className="flex-1">
          <div className="container py-6">
            <div className="mb-6 flex items-center justify-between">
              <Button variant="ghost" onClick={() => router.push("/tests")} className="-ml-2 h-8 px-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Assessments
              </Button>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{timeRemaining} remaining</span>
              </div>
            </div>

            {!isSubmitted ? (
              <>
                <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-md">
                      <img
                        src={test.logo || "/placeholder.svg"}
                        alt={test.company}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{test.title}</h1>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Building className="mr-1 h-4 w-4" />
                          {test.company}
                        </span>
                        <span>•</span>
                        <span>{test.jobTitle}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      Question {currentQuestionIndex + 1} of {test.questions.length}
                    </span>
                    <Progress value={progress} className="h-2 w-24" />
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
                      <Badge variant="outline">
                        {currentQuestion.type === "multiple-choice" ? "Multiple Choice" : "Text Response"}
                      </Badge>
                    </div>
                    <CardDescription className="text-base font-medium">{currentQuestion.question}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {currentQuestion.type === "multiple-choice" ? (
                      <RadioGroup
                        value={answers[currentQuestion.id] as string}
                        onValueChange={handleAnswerChange}
                        className="space-y-3"
                      >
                        {currentQuestion.options?.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`} className="text-base">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      <Textarea
                        placeholder="Type your answer here..."
                        value={(answers[currentQuestion.id] as string) || ""}
                        onChange={handleTextAnswerChange}
                        className="min-h-[200px]"
                      />
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitDialogOpen(true)}
                      className="mx-2 hidden sm:inline-flex"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Submit Test
                    </Button>
                    {currentQuestionIndex < test.questions.length - 1 ? (
                      <Button onClick={handleNextQuestion}>
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={() => setIsSubmitDialogOpen(true)}>
                        Submit
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>

                <div className="mt-6 flex justify-center sm:hidden">
                  <Button variant="outline" onClick={() => setIsSubmitDialogOpen(true)} className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Test
                  </Button>
                </div>

                <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Submit Assessment</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to submit your assessment? You won't be able to change your answers after
                        submission.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex items-center justify-between">
                        <span>Total Questions</span>
                        <span>{test.questions.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Answered Questions</span>
                        <span>{Object.keys(answers).length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Unanswered Questions</span>
                        <span>{test.questions.length - Object.keys(answers).length}</span>
                      </div>
                      {test.questions.length - Object.keys(answers).length > 0 && (
                        <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            <span className="font-medium">Warning</span>
                          </div>
                          <p className="mt-1">
                            You have unanswered questions. It's recommended to answer all questions before submitting.
                          </p>
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
                        Continue Editing
                      </Button>
                      <Button onClick={handleSubmitTest}>Submit Assessment</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Assessment Submitted</h2>
                <p className="mt-2 text-muted-foreground">
                  Thank you for completing the {test.title}. Your responses have been recorded.
                </p>
                <div className="mt-6 w-full max-w-md rounded-lg border p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Assessment</span>
                      <span>{test.title}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Company</span>
                      <span>{test.company}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Job Position</span>
                      <span>{test.jobTitle}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Submission Date</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex gap-4">
                  <Button variant="outline" onClick={() => router.push("/tests")}>
                    Back to Assessments
                  </Button>
                  <Button onClick={() => router.push(`/applied-jobs/${testId}`)}>View Application</Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

