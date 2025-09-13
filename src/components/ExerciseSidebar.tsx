import { useState } from "react";
import { Code, ChevronRight, Play, CheckCircle2, Clock, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Exercise {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  timeEstimate: string;
  description: string;
}

const exercises: Exercise[] = [
  {
    id: "1",
    title: "Hello World",
    difficulty: "easy",
    completed: true,
    timeEstimate: "5 min",
    description: "Learn the basics of printing output"
  },
  {
    id: "2", 
    title: "Variables & Types",
    difficulty: "easy",
    completed: true,
    timeEstimate: "10 min",
    description: "Understand different data types"
  },
  {
    id: "3",
    title: "Control Flow",
    difficulty: "medium",
    completed: false,
    timeEstimate: "20 min",
    description: "Master if statements and loops"
  },
  {
    id: "4",
    title: "Functions",
    difficulty: "medium", 
    completed: false,
    timeEstimate: "25 min",
    description: "Create reusable code blocks"
  },
  {
    id: "5",
    title: "Data Structures",
    difficulty: "hard",
    completed: false,
    timeEstimate: "45 min",
    description: "Work with arrays and objects"
  },
  {
    id: "6",
    title: "Algorithms",
    difficulty: "hard",
    completed: false,
    timeEstimate: "60 min",
    description: "Implement sorting and searching"
  }
];

interface ExerciseSidebarProps {
  selectedExercise: string;
  onExerciseSelect: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function ExerciseSidebar({ selectedExercise, onExerciseSelect, isOpen, onToggle }: ExerciseSidebarProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-secondary";
      case "medium": return "text-warning";
      case "hard": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full w-80 bg-card border-r border-border z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Exercises
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="lg:hidden"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Exercise List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              onClick={() => onExerciseSelect(exercise.id)}
              className={`
                group p-4 rounded-lg cursor-pointer border transition-all duration-200
                hover-glow-blue hover:border-primary/50
                ${selectedExercise === exercise.id 
                  ? 'bg-primary/10 border-primary/50 glow-blue' 
                  : 'bg-muted/50 border-border hover:bg-muted'
                }
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {exercise.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                    ) : (
                      <Play className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                    <h3 className="font-medium text-sm text-foreground">
                      {exercise.title}
                    </h3>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {exercise.description}
                  </p>
                  
                  <div className="flex items-center gap-3 text-xs">
                    <span className={`font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {exercise.timeEstimate}
                    </span>
                  </div>
                </div>
                
                <ChevronRight className={`
                  w-4 h-4 text-muted-foreground transition-all duration-200
                  ${selectedExercise === exercise.id ? 'text-primary rotate-90' : 'group-hover:text-primary'}
                `} />
              </div>
            </div>
          ))}
        </div>

        {/* Progress Section */}
        <div className="p-4 border-t border-border">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-xs text-muted-foreground">2/6</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full glow-blue" 
                   style={{width: '33.3%'}} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}