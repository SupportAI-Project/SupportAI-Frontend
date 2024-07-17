import React, { useEffect, useRef, useState } from "react";
import "./Textarea.scss";

interface TextareaProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

const Textarea: React.FC<TextareaProps> = React.memo(
  ({ message, onMessageChange, onSendMessage }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [prevHeight, setPrevHeight] = useState(24);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const input = e.target.value;
      const lines = input.split("\n");
      if (lines.length <= 10) {
        onMessageChange(input);
      } else {
        onMessageChange(lines.slice(0, 10).join("\n"));
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && e.shiftKey) {
        const lines = message.split("\n");
        if (lines.length >= 10) {
          e.preventDefault();
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        onSendMessage();
      }
    };

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        const newHeight = Math.min(textareaRef.current.scrollHeight, 10 * 31);

        // Set new height and margin-top to move the textarea upwards
        textareaRef.current.style.height = `${newHeight}px`;
        textareaRef.current.style.marginTop = `-${newHeight - 24}px`;

        setPrevHeight(newHeight);
      }
    }, [message, prevHeight]);

    return (
      <textarea
        ref={textareaRef}
        className="form-control form-control-lg textarea-chat"
        placeholder="Enter text here..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={1} // Start with a single row
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
