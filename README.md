# **Quizmo**

🚀 **A modern, interactive quiz application built with React, TypeScript, and styled-components.**

![Demo Screenshot](https://i.imgur.com/lNpXcvm.png)

## **✨ Features**

✔ **Light/Dark Mode** - Toggle between themes with persistent settings  
✔ **Interactive Quizzes** - Answer questions and get instant feedback  
✔ **Review Mode** - See correct answers and explanations  
✔ **JSON Import/Export** - Easily load and share quizzes  
✔ **Responsive Design** - Works on desktop and mobile  
✔ **Type-Safe** - Built with TypeScript for better code reliability

## **🚀 Live Demo**

Check out the app here: **[Demo Link](#)**

## **🛠 Tech Stack**

- **React 18** (Functional Components + Hooks)
- **TypeScript** (Static Typing)
- **styled-components** (CSS-in-JS Theming)
- **LocalStorage** (Theme Persistence)
- **Google Fonts** (Inter + Space Mono)

## **📦 Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/Ghassanee/QCM-Quiz-Generator
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## **🔧 Project Structure**

```
src/
├── components/       # Reusable UI components
│   ├── Question.tsx  # Quiz question component
│   ├── Quiz.tsx      # Main quiz interface
│   └── ThemeToggle.tsx
├── context/          # React context providers
│   └── ThemeContext.tsx
├── styles/           # Global styles
│   └── GlobalStyles.ts
├── types/            # TypeScript interfaces
│   └── quiz.ts
├── App.tsx           # Main app component
└── index.tsx         # Entry point
```

## **📝 How to Use**

1. **Load a Quiz**: Upload a JSON file in the correct format (see `sample-quiz.json`).
2. **Take the Quiz**: Select answers and submit to see your score.
3. **Review Mode**: After submission, check explanations for each question.

### **Sample Quiz Format**

```json
{
  "title": "JavaScript Quiz",
  "questions": [
    {
      "id": 1,
      "question": "What is a closure?",
      "options": [
        { "text": "A function + its lexical scope", "correct": true },
        { "text": "A JavaScript class", "correct": false }
      ]
    }
  ]
}
```

## **📜 License**

MIT © Ghassanee

---

**Enjoy quizzing!** 🎉  
Feel free to contribute or report issues.

---
