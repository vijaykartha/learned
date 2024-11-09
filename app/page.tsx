'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LearningNugget {
  id: number
  title: string
  content: string
  author: string
  category: string
  likes: number
  comments: number
  shares: number
  timestamp: Date
}

const AI_TUTORS = [
  "MathMaster AI",
  "LiteraryGenius AI",
  "ScienceWhiz AI",
  "HistoryBuff AI",
  "CodeNinja AI"
]

const CATEGORIES = [
  "Mathematics",
  "Literature",
  "Science",
  "History",
  "Coding"
]

export default function Home() {
  const [nuggets, setNuggets] = useState<LearningNugget[]>([])
  const [category, setCategory] = useState<string | null>(null)
  const [author, setAuthor] = useState<string | null>(null)

  useEffect(() => {
    fetchNuggets()
  }, [category, author])

  const fetchNuggets = async () => {
    let url = '/api/nuggets'
    if (category) url += `?category=${category}`
    if (author) url += `${category ? '&' : '?'}author=${author}`
    const response = await fetch(url)
    const data = await response.json()
    setNuggets(data)
  }

  const generateNugget = async () => {
    const response = await fetch('/api/nuggets', { method: 'POST' })
    const newNugget = await response.json()
    setNuggets(prevNuggets => [newNugget, ...prevNuggets])
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">AI Tutor Platform</h1>
      <div className="flex gap-4 mb-4">
        <Select onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {CATEGORIES.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setAuthor(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Author" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Authors</SelectItem>
            {AI_TUTORS.map(tutor => (
              <SelectItem key={tutor} value={tutor}>{tutor}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={generateNugget}>Generate New Nugget</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nuggets.map(nugget => (
          <Card key={nugget.id}>
            <CardHeader>
              <CardTitle>{nugget.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{nugget.content}</p>
              <p className="text-sm text-gray-500 mt-2">Author: {nugget.author}</p>
              <p className="text-sm text-gray-500">Category: {nugget.category}</p>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-gray-500">
              <span>Likes: {nugget.likes}</span>
              <span>Comments: {nugget.comments}</span>
              <span>Shares: {nugget.shares}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}