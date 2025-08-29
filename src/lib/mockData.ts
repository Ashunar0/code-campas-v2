import { User, Material, Progress, Chapter } from "@/types/type";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    period: 1,
    status: "approved",
    permission: "admin",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    period: 2,
    status: "pending",
    permission: "mentor",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    period: 1,
    status: "approved",
    permission: "mentor",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    period: 3,
    status: "pending",
    permission: "student",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
  },
];

export const mockChapters: Chapter[] = [
  {
    id: 1,
    title: "JavaScript",
    description: "JavaScriptの基本的な文法と概念",
    materialsCount: 8,
    completedCount: 6,
  },
  {
    id: 2,
    title: "React",
    description: "Reactの基本的な概念と使い方",
    materialsCount: 12,
    completedCount: 8,
  },
  {
    id: 3,
    title: "Next.js",
    description: "Next.jsの基本的な概念と使い方",
    materialsCount: 10,
    completedCount: 4,
  },
  {
    id: 4,
    title: "TypeScript",
    description: "TypeScriptの基本的な概念と使い方",
    materialsCount: 15,
    completedCount: 2,
  },
  {
    id: 5,
    title: "Tailwind CSS",
    description: "Tailwind CSSの基本的な概念と使い方",
    materialsCount: 9,
    completedCount: 0,
  },
  {
    id: 6,
    title: "Git",
    description: "Gitの基本的な概念と使い方",
    materialsCount: 18,
    completedCount: 0,
  },
];

export const mockMaterials: Material[] = [
  {
    id: "1",
    title: "変数",
    chapter: 1,
    chapterTitle: "JavaScript",
    path: "/contents/01_JavaScript/01_variable",
    content: `# What is Programming?

Programming is the process of creating a set of instructions that tell a computer how to perform a task. It's like writing a recipe, but instead of cooking, you're telling a computer what to do.

## Key Concepts

### 1. Algorithms
An algorithm is a step-by-step procedure for solving a problem. Think of it as a detailed recipe that anyone can follow to get the same result.

### 2. Syntax
Every programming language has its own syntax - the rules for how code should be written. It's like grammar in human languages.

### 3. Variables
Variables are containers that store data values. They're like labeled boxes where you can put information and retrieve it later.

## Why Learn Programming?

- **Problem Solving**: Programming teaches you to break down complex problems into smaller, manageable pieces
- **Logical Thinking**: You learn to think step by step and consider all possibilities
- **Creativity**: You can build anything you can imagine - websites, apps, games, and more
- **Career Opportunities**: Programming skills are in high demand across many industries

## Getting Started

The best way to learn programming is by doing. Start with simple exercises and gradually work your way up to more complex projects. Remember, every expert was once a beginner!`,
    isRead: true,
    lastUpdated: "2024-01-20",
    readingTime: 5,
  },
  {
    id: "2",
    title: "変数とデータ型",
    chapter: 1,
    chapterTitle: "プログラミングの基本",
    path: "/contents/01_JavaScript/02_variable_and_data_type",
    content: `# Variables and Data Types

Variables are fundamental building blocks in programming. They allow us to store and manipulate data throughout our programs.

## What is a Variable?

A variable is a named storage location that holds a value. Think of it as a labeled container where you can store different types of information.

## Common Data Types

### Numbers
- **Integers**: Whole numbers like 5, -3, 42
- **Floats**: Decimal numbers like 3.14, -2.5, 0.1

### Text
- **Strings**: Text data like "Hello World", "Programming", "123"

### Boolean
- **Boolean**: True or false values

### Collections
- **Arrays**: Lists of items like [1, 2, 3, 4]
- **Objects**: Complex data structures with properties

## Best Practices

1. Use descriptive names for your variables
2. Follow naming conventions for your programming language
3. Initialize variables before using them
4. Choose the appropriate data type for your data

## Example

\`\`\`javascript
let studentName = "John Doe";
let age = 20;
let isEnrolled = true;
let grades = [85, 92, 78, 96];
\`\`\`

Understanding variables and data types is crucial for effective programming!`,
    isRead: true,
    lastUpdated: "2024-01-18",
    readingTime: 7,
  },
  {
    id: "3",
    title: "制御フロー",
    chapter: 1,
    chapterTitle: "プログラミングの基本",
    path: "/contents/01_JavaScript/03_control_flow",
    content: `# Control Flow Statements

Control flow statements determine the order in which code is executed. They allow your programs to make decisions and repeat actions.

## Conditional Statements

### If Statements
Used to execute code only when certain conditions are met.

\`\`\`javascript
if (temperature > 30) {
    console.log("It's hot outside!");
}
\`\`\`

### If-Else Statements
Provides an alternative action when the condition is false.

\`\`\`javascript
if (score >= 60) {
    console.log("You passed!");
} else {
    console.log("You need to study more.");
}
\`\`\`

## Loops

### For Loops
Used when you know how many times you want to repeat something.

\`\`\`javascript
for (let i = 0; i < 5; i++) {
    console.log("Count: " + i);
}
\`\`\`

### While Loops
Used when you want to repeat something while a condition is true.

\`\`\`javascript
let count = 0;
while (count < 10) {
    console.log(count);
    count++;
}
\`\`\`

## Switch Statements
Used when you have multiple conditions to check.

\`\`\`javascript
switch (day) {
    case "Monday":
        console.log("Start of the work week");
        break;
    case "Friday":
        console.log("TGIF!");
        break;
    default:
        console.log("Regular day");
}
\`\`\`

Control flow is what makes programs dynamic and responsive!`,
    isRead: false,
    lastUpdated: "2024-01-22",
    readingTime: 8,
  },
  {
    id: "4",
    title: "配列の基本",
    chapter: 2,
    chapterTitle: "データ構造",
    path: "/contents/01_JavaScript/04_array",
    content: `# Introduction to Arrays

Arrays are one of the most fundamental data structures in programming. They allow you to store multiple values in a single variable.

## What is an Array?

An array is an ordered collection of elements. Think of it as a list where each item has a position (index).

## Creating Arrays

\`\`\`javascript
// Empty array
let emptyArray = [];

// Array with numbers
let numbers = [1, 2, 3, 4, 5];

// Array with strings
let fruits = ["apple", "banana", "orange"];

// Mixed array
let mixed = [1, "hello", true, 3.14];
\`\`\`

## Accessing Array Elements

Arrays use zero-based indexing, meaning the first element is at index 0.

\`\`\`javascript
let colors = ["red", "green", "blue"];
console.log(colors[0]); // "red"
console.log(colors[1]); // "green"
console.log(colors[2]); // "blue"
\`\`\`

## Common Array Operations

### Adding Elements
\`\`\`javascript
let numbers = [1, 2, 3];
numbers.push(4); // Adds to the end
numbers.unshift(0); // Adds to the beginning
\`\`\`

### Removing Elements
\`\`\`javascript
numbers.pop(); // Removes from the end
numbers.shift(); // Removes from the beginning
\`\`\`

### Finding Array Length
\`\`\`javascript
console.log(numbers.length);
\`\`\`

## Iterating Through Arrays

\`\`\`javascript
let fruits = ["apple", "banana", "orange"];

// Using for loop
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// Using forEach
fruits.forEach(function(fruit) {
    console.log(fruit);
});
\`\`\`

Arrays are essential for managing collections of data efficiently!`,
    isRead: false,
    lastUpdated: "2024-01-19",
    readingTime: 10,
  },
];

export const mockProgress: Progress = {
  userId: "1",
  overall: 75,
  byChapter: {
    1: 85,
    2: 65,
    3: 40,
    4: 15,
    5: 0,
    6: 0,
  },
  recentMaterials: ["1", "2", "4"],
  unreadCount: 24,
};

export const currentUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  period: 1,
  status: "approved",
  permission: "admin",
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-01-15"),
};
