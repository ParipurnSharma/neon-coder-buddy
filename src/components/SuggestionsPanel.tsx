import { useState, useEffect } from "react";
import { Lightbulb, Bug, BookOpen, ChevronDown, ChevronUp, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Suggestion {
  type: "hint" | "debug" | "concept";
  title: string;
  content: string;
  icon: React.ReactNode;
}

interface SuggestionsPanelProps {
  exerciseId: string;
  codeOutput?: string;
}

const suggestionsByExercise: Record<string, Suggestion[]> = {
  "1": [
    {
      type: "concept",
      title: "Understanding print()",
      content: "The print() function outputs text to the console. It's one of the most basic and useful functions in Python.",
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      type: "hint",
      title: "String Formatting",
      content: "Try using different quotes: single quotes ('Hello') or double quotes (\"Hello\") both work in Python.",
      icon: <Lightbulb className="w-4 h-4" />
    }
  ],
  "2": [
    {
      type: "concept",
      title: "Variable Types",
      content: "Python automatically determines variable types: strings (text), integers (whole numbers), floats (decimals), and booleans (True/False).",
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      type: "hint",
      title: "F-string formatting",
      content: "Use f\"{variable}\" to insert variables into strings. It's the modern way to format strings in Python.",
      icon: <Lightbulb className="w-4 h-4" />
    },
    {
      type: "debug",
      title: "Common mistake",
      content: "Make sure to use quotes around strings. Without quotes, Python thinks it's a variable name.",
      icon: <Bug className="w-4 h-4" />
    }
  ],
  "3": [
    {
      type: "concept",
      title: "Modulo Operator (%)",
      content: "The % operator returns the remainder after division. Use it to check if a number is divisible by another.",
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      type: "hint",
      title: "Order matters",
      content: "Check for the most specific conditions first (like % 15) before checking individual conditions (% 3 or % 5).",
      icon: <Lightbulb className="w-4 h-4" />
    },
    {
      type: "debug",
      title: "Logic flow",
      content: "If you check % 3 before % 15, numbers divisible by 15 will match % 3 first and never reach the % 15 check.",
      icon: <Bug className="w-4 h-4" />
    }
  ]
};

export function SuggestionsPanel({ exerciseId, codeOutput }: SuggestionsPanelProps) {
  const [expandedSuggestion, setExpandedSuggestion] = useState<number | null>(0);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    setSuggestions(suggestionsByExercise[exerciseId] || []);
    setExpandedSuggestion(0);
  }, [exerciseId]);

  // Add dynamic suggestions based on code output
  useEffect(() => {
    if (codeOutput) {
      const baseSuggestions = suggestionsByExercise[exerciseId] || [];
      const dynamicSuggestions: Suggestion[] = [];

      if (codeOutput.includes("Error") || codeOutput.includes("Traceback")) {
        dynamicSuggestions.push({
          type: "debug",
          title: "Error detected",
          content: "Your code has an error. Check the console output for details and fix any syntax issues.",
          icon: <Bug className="w-4 h-4" />
        });
      } else if (codeOutput.trim()) {
        dynamicSuggestions.push({
          type: "hint",
          title: "Great job!",
          content: "Your code ran successfully! Try experimenting with different inputs or approaches.",
          icon: <Target className="w-4 h-4" />
        });
      }

      setSuggestions([...dynamicSuggestions, ...baseSuggestions]);
    }
  }, [codeOutput, exerciseId]);

  const getSuggestionStyle = (type: string) => {
    switch (type) {
      case "hint": return "border-primary/30 bg-primary/5";
      case "debug": return "border-destructive/30 bg-destructive/5";
      case "concept": return "border-secondary/30 bg-secondary/5";
      default: return "border-border bg-muted/30";
    }
  };

  const getSuggestionIconColor = (type: string) => {
    switch (type) {
      case "hint": return "text-primary";
      case "debug": return "text-destructive";
      case "concept": return "text-secondary";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-border bg-card/50">
        <Lightbulb className="w-5 h-5 text-warning" />
        <h3 className="font-semibold text-foreground">Suggestions & Hints</h3>
        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
          {suggestions.length}
        </span>
      </div>

      {/* Suggestions List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {suggestions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No suggestions available for this exercise</p>
          </div>
        ) : (
          suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`border rounded-lg transition-all duration-200 ${getSuggestionStyle(suggestion.type)}`}
            >
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto hover:bg-transparent"
                onClick={() => setExpandedSuggestion(expandedSuggestion === index ? null : index)}
              >
                <div className="flex items-center gap-3">
                  <div className={getSuggestionIconColor(suggestion.type)}>
                    {suggestion.icon}
                  </div>
                  <span className="font-medium text-left">{suggestion.title}</span>
                </div>
                {expandedSuggestion === index ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
              
              {expandedSuggestion === index && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {suggestion.content}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}