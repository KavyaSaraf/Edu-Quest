"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Code, Lightbulb, Rocket } from 'lucide-react';
import Link from "next/link";

export default function LearnMorePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Brain className="h-6 w-6 mr-2" />
          <span className="font-bold text-lg">EduQuest</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  About EduQuest
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  EduQuest is a cutting-edge AI learning platform designed to help you unlock your full potential in the world of artificial intelligence. Whether you're a beginner or an experienced developer, our platform offers a wide range of features to support your learning journey.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Tutor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Get personalized AI tutoring to help you understand complex concepts and solve problems.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>AI Roadmap</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Follow a structured learning path to guide you through the fundamentals of AI and beyond.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>AI Path</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Create and share your own AI learning paths to help others on their journey.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Collaborative</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Collaborate with other learners and experts to enhance your understanding and skills.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Receive constructive feedback on your projects and assignments to improve your work.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 EduQuest. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
