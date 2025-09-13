import { useState } from "react";
import { Play, RotateCcw, Copy, Check, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CodeEditorProps {
  exerciseId: string;
  onRunCode: (code: string) => void;
}

const initialCode = {
  "1": `# Welcome to your first coding exercise!
# Print "Hello, World!" to the console

print("Hello, World!")`,
  "2": `# Variables and Data Types
# Create variables of different types

name = "Python"
version = 3.11
is_popular = True

print(f"{name} {version} is popular: {is_popular}")`,
  "3": `# Control Flow - If statements and loops
# Write a program that prints numbers 1-10, but:
# - Print "Fizz" for multiples of 3
# - Print "Buzz" for multiples of 5
# - Print "FizzBuzz" for multiples of both

for i in range(1, 11):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`,
};

export function CodeEditor({ exerciseId, onRunCode }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode[exerciseId as keyof typeof initialCode] || "# Start coding here...\n");
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    onRunCode(code);
  };

  const handleReset = () => {
    setCode(initialCode[exerciseId as keyof typeof initialCode] || "# Start coding here...\n");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <FileCode className="w-5 h-5 text-primary" />
          Code Editor
        </h3>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="hover-glow-blue"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="hover-glow-blue"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={handleRun}
            className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary glow-blue"
          >
            <Play className="w-4 h-4 mr-2" />
            Run Code
          </Button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 p-4">
        <div className="relative h-full">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-editor h-full resize-none font-mono text-sm leading-6 text-foreground placeholder:text-muted-foreground"
            placeholder="# Start coding here..."
            spellCheck={false}
          />
          
          {/* Line Numbers */}
          <div className="absolute left-2 top-4 pointer-events-none">
            {code.split('\n').map((_, index) => (
              <div
                key={index}
                className="text-xs text-muted-foreground/50 leading-6 h-6 flex items-center justify-end pr-2"
                style={{ minWidth: '2rem' }}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}