export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "getting-started-with-machine-learning",
    title: "Getting Started With Machine Learning in 2026",
    excerpt: "A practical roadmap for absolute beginners — math, Python, frameworks, and the projects that actually build skill.",
    category: "Machine Learning",
    tags: ["ML", "Beginner", "Roadmap"],
    readTime: "8 min",
    date: "2026-05-10",
    content: `
## Why machine learning still matters
Machine learning is no longer optional for technical roles. In 2026, almost every product team touches an ML-powered feature.

## The foundations you actually need
You don't need a PhD. You need: linear algebra intuition, probability basics, and confident Python.

\`\`\`python
import numpy as np
from sklearn.linear_model import LogisticRegression
model = LogisticRegression().fit(X_train, y_train)
print(model.score(X_test, y_test))
\`\`\`

## Build, don't just watch
Three projects beat thirty tutorials. Pick a dataset that excites you and ship.

## Where to go next
Move to deep learning with PyTorch, then start shipping end-to-end systems.
`,
  },
  {
    slug: "aws-ec2-for-beginners",
    title: "AWS EC2 for Beginners: From Zero to First Deploy",
    excerpt: "Spin up your first EC2 instance, SSH in, and host a real app — no prior cloud experience required.",
    category: "AWS",
    tags: ["AWS", "EC2", "Cloud"],
    readTime: "10 min",
    date: "2026-04-22",
    content: `
## What is EC2?
EC2 is AWS's virtual server product — rent compute by the hour.

## Launching your first instance
Pick an Ubuntu AMI, choose t2.micro (free tier), create a key pair, launch.

\`\`\`bash
ssh -i key.pem ubuntu@<public-ip>
sudo apt update && sudo apt install nginx -y
\`\`\`

## Security groups matter
Open only the ports you need. 22 for SSH, 80/443 for web.

## Wrap up
You now have a real Linux box on the internet. Next: deploy a Flask app.
`,
  },
  {
    slug: "ace-your-ai-engineer-interview",
    title: "How to Ace Your AI Engineer Interview",
    excerpt: "What recruiters actually look for, the questions you'll get, and how to talk about projects with impact.",
    category: "Career Preparation",
    tags: ["Interview", "Career", "AI"],
    readTime: "7 min",
    date: "2026-03-15",
    content: `
## The interview loop
Expect a screen, a technical deep-dive, a system design round, and a behavioral.

## Talk about projects with the STAR method
Situation, Task, Action, Result. Always quantify the result.

## Common technical questions
- Explain bias vs variance
- How would you deploy a model to production?
- Walk me through a Transformer

## Mindset
Be curious, be honest about what you don't know, and show how you learn fast.
`,
  },
];
