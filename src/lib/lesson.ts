export const firstLesson = {
  id: "what-is-programming",
  title: "What is programming?",
  subtitle: "Teach a tiny robot what to do.",
  concept: "instructions",
  story: "Imagine a tiny robot sitting on your desk. It can do exactly what you tell it — but it cannot guess what you mean.",
  steps: [
    "A program is a list of instructions.",
    "The computer follows those instructions.",
    "Good programmers turn a big goal into small, clear steps."
  ],
  challenge: {
    prompt: "Your robot has an apple in front of it. Which instruction should come first?",
    options: ["Eat the apple", "Pick up the apple", "Build a website"],
    answer: "Pick up the apple"
  }
} as const;