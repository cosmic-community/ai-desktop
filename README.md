# CTRL AI Desktop Assistant

![App Preview](https://imgix.cosmicjs.com/4f648550-2c11-11f1-968e-a5a1e6389181-autopilot-photo-1461749280684-dccba630e2f6-1774858828316.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A production-quality marketing and documentation website for **CTRL AI** — a Windows 11 local-first desktop assistant that lets users manage files through natural language commands. Built with Next.js 16, Tailwind CSS, and Cosmic CMS.

## Features

- 🎯 **Command Reference** — Browse all available file commands with safety indicators and examples
- ⚙️ **Settings Dashboard** — View configurable settings including allowed paths, hotkeys, and themes
- 📰 **Version Changelog** — Track releases with version badges and release type indicators
- 🖥️ **Interactive Hero** — Command palette demo that simulates the CTRL AI experience
- 🔒 **Safety-First Design** — Visual indicators for dangerous operations, simulate mode, and undo
- 📱 **Fully Responsive** — Beautiful on mobile, tablet, and desktop
- 🌙 **Dark Mode Design** — Modern dark UI inspired by developer tools
- ⚡ **Server-Side Rendering** — Fast, SEO-optimized pages powered by Cosmic CMS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69ca31e5f9808e52fa7dc49e&clone_repository=69ca335af9808e52fa7dc528)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "You are a senior startup engineer and product-minded architect. Build a production-quality MVP for a Windows 11 local-first desktop assistant called CTRL AI. Product vision: CTRL AI is an AI desktop assistant that lets users manage files through natural language commands. The MVP must focus only on file operations and trust/safety. It is for a real startup, so code quality, architecture, UX clarity, and future extensibility matter."

### Code Generation Prompt

> "Build a Next.js application for a website called 'AI DESKTOP'. The content is managed in Cosmic CMS with the following object types: commands, settings, changelog. Create a beautiful, modern, responsive design with a homepage and pages for each content type. You are a senior startup engineer and product-minded architect. Build a production-quality MVP for a Windows 11 local-first desktop assistant called CTRL AI."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS framework
- [Cosmic CMS](https://www.cosmicjs.com/docs) — Headless content management
- [TypeScript 5](https://www.typescriptlang.org/) — Type-safe JavaScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime installed
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing commands, settings, and changelog object types

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ctrl-ai-website

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Cosmic SDK Examples

### Fetching Commands

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: commands } = await cosmic.objects
  .find({ type: 'commands' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Settings

```typescript
const { objects: settings } = await cosmic.objects
  .find({ type: 'settings' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Changelog

```typescript
const { objects: entries } = await cosmic.objects
  .find({ type: 'changelog' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three Cosmic object types:

| Object Type | Description |
|-------------|-------------|
| `commands` | File operation commands with intents, categories, and safety flags |
| `settings` | Application configuration including paths, hotkeys, and themes |
| `changelog` | Version history with release notes and types |

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the repository in [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy

<!-- README_END -->