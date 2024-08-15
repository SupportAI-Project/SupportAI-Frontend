import React from "react";
import { Guide } from "@/types";
import GuideViewer from "@/components/GuideViewer/GuideViewer";
import { useRouter } from "next/router";
import { userAgent } from "next/server";

const GuideItem: React.FC = ({}) => {
  const router = useRouter();
  const { id: queryId } = router.query;

  return (
    <div>
      <GuideViewer />
    </div>
  );
};

export default GuideItem;

// Example for design
const sampleGuide = {
  title: "Introduction to Python Programming",
  creationDate: "January 15, 2024",
  content: `
        <h2>Getting Started</h2>
        <ul>
          <li><a href="https://www.python.org/downloads/" target="_blank">Download Python</a></li>
          <li>Install Python on your machine</li>
          <li>Verify installation with <code>python --version</code></li>
        </ul>
        
        <h2>Basic Syntax</h2>
        <p>Here’s a simple example:</p>
        <pre>
          <code>
            # Print Hello, World!
            print("Hello, World!")
          </code>
        </pre>
        
        <h2>Functions</h2>
        <p>Functions help you organize code:</p>
        <pre>
          <code>
            def greet(name):
                return f"Hello, {name}!"
            
            print(greet("Alice"))
          </code>
        </pre>

        <h2>Functions</h2>
        <p>Functions help you organize code:</p>
        <pre>
          <code>
            def greet(name):
                return f"Hello, {name}!"
            
            print(greet("Alice"))
          </code>
        </pre>
        
        
        <footer>
          <p>For more details, visit the <a href="https://docs.python.org/3/" target="_blank">official Python documentation</a>.</p>
        </footer>
      `,
};
