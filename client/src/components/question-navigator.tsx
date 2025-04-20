import React from 'react';
import { cn } from '@/lib/utils';

interface QuestionNavigatorProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: number[];
  markedQuestions: number[];
  onQuestionClick: (index: number) => void;
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  markedQuestions,
  onQuestionClick,
}) => {
  // Calculate the number of questions per row (5 is a good number for most screens)
  const questionsPerRow = 5;
  
  // Create an array of question numbers
  const questionNumbers = Array.from({ length: totalQuestions }, (_, i) => i);
  
  // Split the questions into rows
  const rows = [];
  for (let i = 0; i < questionNumbers.length; i += questionsPerRow) {
    rows.push(questionNumbers.slice(i, i + questionsPerRow));
  }
  
  return (
    <div className="question-navigator">
      <div className="grid gap-3">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((questionIndex) => {
              const isAnswered = answeredQuestions.includes(questionIndex);
              const isMarked = markedQuestions.includes(questionIndex);
              const isCurrent = questionIndex === currentQuestion;
              
              return (
                <button
                  key={questionIndex}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-md font-medium text-sm transition-colors",
                    isCurrent ? "bg-primary text-white" : 
                    isAnswered ? "bg-green-500 text-white" : 
                    isMarked ? "bg-yellow-500 text-white" : 
                    "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  )}
                  onClick={() => onQuestionClick(questionIndex)}
                >
                  {questionIndex + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionNavigator;