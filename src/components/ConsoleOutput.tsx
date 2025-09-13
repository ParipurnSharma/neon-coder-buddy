import { useState, useEffect, useRef } from "react";
import { Terminal, Trash2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConsoleOutputProps {
  output: string;
  onClear: () => void;
}

export function ConsoleOutput({ output, onClear }: ConsoleOutputProps) {
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatOutput = (text: string) => {
    if (!text.trim()) return null;

    return text.split('\n').map((line, index) => {
      let className = "leading-6";
      
      // Color coding for different types of output
      if (line.includes('Error') || line.includes('Traceback')) {
        className += " text-console-error";
      } else if (line.includes('Warning')) {
        className += " text-console-warning";
      } else if (line.startsWith('>>>') || line.startsWith('...')) {
        className += " text-primary font-medium";
      } else {
        className += " text-console-success";
      }

      return (
        <div key={index} className={className}>
          {line || '\u00A0'} {/* Non-breaking space for empty lines */}
        </div>
      );
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Terminal className="w-5 h-5 text-secondary" />
          Console Output
        </h3>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline" 
            size="sm"
            onClick={handleCopy}
            disabled={!output.trim()}
            className="hover-glow-green"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            disabled={!output.trim()}
            className="hover-glow-green"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Console Area */}
      <div className="flex-1 p-4">
        <div 
          ref={outputRef}
          className="console-output h-full p-4 overflow-y-auto font-mono text-sm"
        >
          {output.trim() ? (
            <div className="space-y-1">
              {formatOutput(output)}
            </div>
          ) : (
            <div className="text-muted-foreground/60 italic">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4" />
                <span>Ready to execute code...</span>
              </div>
              <div className="text-xs space-y-1 mt-4">
                <div>• Click "Run Code" to see output here</div>
                <div>• Error messages will appear in red</div>
                <div>• Success output will appear in green</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="px-4 py-2 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Lines: {output ? output.split('\n').length : 0}</span>
            <span>Characters: {output.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
            <span>Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}