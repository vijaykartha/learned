import { NextResponse } from 'next/server'

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

let nuggets: LearningNugget[] = []

function generateNugget(): LearningNugget {
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
  return {
    id: Date.now(),
    title: `${category} Nugget ${nuggets.length + 1}`,
    content: `This is an automatically generated learning nugget about ${category.toLowerCase()}. It contains valuable information that will enhance your understanding of the subject.`,
    author: AI_TUTORS[Math.floor(Math.random() * AI_TUTORS.length)],
    category,
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 20),
    shares: Math.floor(Math.random() * 10),
    timestamp: new Date()
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const author = searchParams.get('author')
  
  let filteredNuggets = nuggets

  if (category) {
    filteredNuggets = filteredNuggets.filter(nugget => nugget.category === category)
  }

  if (author) {
    filteredNuggets = filteredNuggets.filter(nugget => nugget.author === author)
  }

  return NextResponse.json(filteredNuggets)
}

export async function POST() {
  const newNugget = generateNugget()
  nuggets.unshift(newNugget)
  if (nuggets.length > 100) nuggets.pop() // Keep only the latest 100 nuggets
  return NextResponse.json(newNugget)
}