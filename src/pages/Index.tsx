import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExerciseSidebar } from "@/components/ExerciseSidebar";
import { CodeEditor } from "@/components/CodeEditor";
import { SuggestionsPanel } from "@/components/SuggestionsPanel"; 
import { ConsoleOutput } from "@/components/ConsoleOutput";

const Index = () => {
  const [selectedExercise, setSelectedExercise] = useState("1");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [suggestionsKey, setSuggestionsKey] = useState(0);

  const handleRunCode = (code: string) => {
    // Simulate code execution (in a real app, this would send to a backend)
    const timestamp = new Date().toLocaleTimeString();
    
    // Simple simulation based on code content
    let output = `>>> Executing code at ${timestamp}\n`;
    
    if (code.includes('print("Hello, World!")')) {
      output += "Hello, World!\n";
    } else if (code.includes('print(f"{name}')) {
      output += "Python 3.11 is popular: True\n";
    } else if (code.includes('FizzBuzz')) {
      output += "1\n2\nFizz\n4\nBuzz\n6\nFizz\n8\n9\nFizzBuzz\n";
    } else if (code.includes('syntax error') || code.includes('undefined')) {
      output += "Traceback (most recent call last):\n  File \"<stdin>\", line 1\nSyntaxError: invalid syntax\n";
    } else {
      output += "Code executed successfully!\n";
    }
    
    output += `>>> Execution completed\n\n`;
    
    setConsoleOutput(prev => prev + output);
    setSuggestionsKey(prev => prev + 1); // Force suggestions update
  };

  const handleClearConsole = () => {
    setConsoleOutput("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Top Header */}
      <header className="h-14 bg-card border-b border-border flex items-center px-4 z-30 relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden mr-3 hover-glow-blue"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          CodeLearn Assistant
        </h1>
        
        <div className="ml-auto text-sm text-muted-foreground">
          Ready to code
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Sidebar */}
        <ExerciseSidebar
          selectedExercise={selectedExercise}
          onExerciseSelect={setSelectedExercise}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row min-w-0">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col border-r border-border min-h-0">
            <CodeEditor 
              exerciseId={selectedExercise}
              onRunCode={handleRunCode}
            />
          </div>

          {/* Right Panel - Suggestions and Console */}
          <div className="w-full lg:w-96 flex flex-col border-l-0 lg:border-l border-border">
            {/* Suggestions Panel */}
            <div className="flex-1 min-h-0 border-b border-border">
              <SuggestionsPanel 
                key={`${selectedExercise}-${suggestionsKey}`}
                exerciseId={selectedExercise}
                codeOutput={consoleOutput}
              />
            </div>

            {/* Console Output */}
            <div className="h-64 lg:h-80">
              <ConsoleOutput 
                output={consoleOutput}
                onClear={handleClearConsole}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
