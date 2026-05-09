import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import CssPage from './pages/css'
import HomePage from './pages/home'
import BackendPage from './pages/backend'
import NextJsPage from './pages/nextjs'
import ReactJsPage from './pages/reactjs'
import VuePage from './pages/vue'
import './App.css'

const vscodeExtensionsDocument = {
  title: 'VSCode Extensions for Fast Manual Coding',
  intro:
    'These are non-AI extensions that improve speed, readability, and quality while coding manually.',
  steps: [
    'Install only the extensions you will actively use every day.',
    'Enable format and lint checks on save for faster feedback.',
    'Use snippets, auto rename, and path completion to reduce repetitive typing.',
  ],
  commands: [
    'Enable: Editor > Format On Save',
    'Enable: Editor > Code Actions On Save > source.fixAll.eslint',
    'Set default formatter to Prettier or your team formatter',
  ],
  extensionList: [
    {
      name: 'ESLint',
      use: 'Finds JavaScript and TypeScript issues early while typing.',
      features: ['Real-time lint diagnostics', 'Auto-fix supported rules', 'Team rule consistency'],
    },
    {
      name: 'Prettier - Code formatter',
      use: 'Formats code instantly for a consistent style.',
      features: ['One-click formatting', 'Format on save', 'Supports many file types'],
    },
    {
      name: 'Path Intellisense',
      use: 'Auto-completes file paths in imports and strings.',
      features: ['Fast path suggestions', 'Reduces import typos', 'Saves navigation time'],
    },
    {
      name: 'Error Lens',
      use: 'Shows errors and warnings directly inline in the editor.',
      features: ['Inline error messages', 'Quick visual debugging', 'Highlights critical issues'],
    },
    {
      name: 'Auto Rename Tag',
      use: 'Renames matching HTML/JSX tags automatically.',
      features: ['Paired tag syncing', 'Great for JSX editing', 'Prevents broken markup'],
    },
    {
      name: 'GitLens',
      use: 'Provides detailed Git context while coding.',
      features: ['Line blame view', 'History and author insights', 'Quick commit navigation'],
    },
    {
      name: 'ES7+ React/Redux/React-Native snippets',
      use: 'Speeds up React component and hook boilerplate.',
      features: ['Common snippet shortcuts', 'Cleaner component scaffolding', 'Faster repetitive coding'],
    },
    {
      name: 'Material Icon Theme',
      use: 'Improves file explorer readability with file icons.',
      features: ['Better visual scanning', 'Framework-specific icons', 'Cleaner project navigation'],
    },
  ],
}

const reactVscodeExtensionsDocument = {
  ...vscodeExtensionsDocument,
  extensionList: [
    {
      name: 'Tailwind CSS IntelliSense',
      use: 'Provides autocomplete, linting, and hover preview for Tailwind classes in React files.',
      features: ['Class name autocomplete', 'Real-time class validation', 'CSS preview on hover'],
    },
    {
      name: 'Path Intellisense',
      use: 'Auto-completes file and folder paths while writing imports.',
      features: ['Fast import path suggestions', 'Reduced typo errors', 'Faster file linking'],
    },
    {
      name: 'Auto Import',
      use: 'Automatically suggests and inserts missing imports in JavaScript and TypeScript.',
      features: ['Auto import suggestions', 'Quick fix import insert', 'Cleaner coding flow'],
    },
    {
      name: 'React Router Snippets',
      use: 'Speeds up writing route, link, and navigation boilerplate.',
      features: ['Ready snippets for routes', 'Faster router setup', 'Less repetitive typing'],
    },
    {
      name: 'VSCode React Refactor',
      use: 'Adds refactor actions for React components and JSX structures.',
      features: ['Extract component helpers', 'JSX refactor shortcuts', 'Cleaner component organization'],
    },
    {
      name: 'Import Cost',
      use: 'Shows real-time package size next to imports to avoid heavy dependencies.',
      features: ['Inline import size info', 'Bundle-awareness while coding', 'Helps keep app lightweight'],
    },
  ],
}

const vueVscodeExtensionsDocument = {
  ...vscodeExtensionsDocument,
  extensionList: [
    {
      name: 'Vue - Official',
      use: 'Primary language support for Vue Single File Components in VS Code.',
      features: ['SFC syntax support', 'Template/type checking', 'Refactor and diagnostics'],
    },
    {
      name: 'Path Intellisense',
      use: 'Auto-completes import paths in Vue projects.',
      features: ['Fast path suggestions', 'Fewer import mistakes', 'Better navigation speed'],
    },
    {
      name: 'Auto Import',
      use: 'Suggests and inserts missing imports while writing Vue JavaScript/TypeScript code.',
      features: ['Auto import hints', 'Quick fix imports', 'Less manual import typing'],
    },
    {
      name: 'ESLint',
      use: 'Shows lint issues in Vue script blocks and project files.',
      features: ['Inline lint diagnostics', 'Rule-based quality checks', 'Auto-fix on save'],
    },
    {
      name: 'Prettier - Code formatter',
      use: 'Formats Vue templates, scripts, and styles consistently.',
      features: ['One-click formatting', 'Format on save', 'Consistent team style'],
    },
    {
      name: 'Vue VSCode Snippets',
      use: 'Adds quick snippets for common Vue component and directive patterns.',
      features: ['Boilerplate shortcuts', 'Faster component creation', 'Reduced repetitive typing'],
    },
    {
      name: 'Import Cost',
      use: 'Displays package size for imports so you can avoid heavy dependencies.',
      features: ['Import size display', 'Bundle awareness', 'Helps performance decisions'],
    },
  ],
}

const nextVscodeExtensionsDocument = {
  ...vscodeExtensionsDocument,
  extensionList: [
    {
      name: 'Next.js Snippets',
      use: 'Speeds up creation of Next.js pages, layouts, and common patterns.',
      features: ['Quick snippet shortcuts', 'Faster page scaffolding', 'Less repetitive typing'],
    },
    {
      name: 'ESLint',
      use: 'Shows lint and quality issues for Next.js JavaScript/TypeScript code.',
      features: ['Inline diagnostics', 'Rule-based code quality', 'Auto-fix support'],
    },
    {
      name: 'Prettier - Code formatter',
      use: 'Keeps Next.js project formatting consistent across files.',
      features: ['Format on save', 'Consistent code style', 'Supports JSX/TSX and JSON'],
    },
    {
      name: 'Path Intellisense',
      use: 'Auto-completes import paths in app and component files.',
      features: ['Fast path completion', 'Fewer import mistakes', 'Improved coding speed'],
    },
    {
      name: 'Auto Import',
      use: 'Auto-suggests and inserts imports while coding Next.js components.',
      features: ['Missing import suggestions', 'Quick import insertion', 'Cleaner workflow'],
    },
    {
      name: 'Tailwind CSS IntelliSense',
      use: 'Provides Tailwind class autocomplete and validation for Next.js UIs.',
      features: ['Class autocomplete', 'Hover preview', 'Invalid class warnings'],
    },
    {
      name: 'Import Cost',
      use: 'Displays package size next to imports to help optimize bundle usage.',
      features: ['Real-time import size', 'Bundle awareness', 'Dependency optimization support'],
    },
  ],
}

const pages = [
  {
    path: '/home',
    label: 'Home',
    title: 'Welcome to MernDoc',
    element: <HomePage />,
    sidebarMode: 'button-docs',
    docs: [
      {
        id: 'home-overview',
        label: 'Platform Overview',
        document: {
          title: 'Platform Overview',
          intro: 'MernDoc is built as a practical frontend guide center for daily coding work.',
          steps: [
            'Choose a framework page from the top navbar.',
            'Use left sidebar buttons to switch to exact topic documentation.',
            'Copy snippets and commands directly into your project flow.',
          ],
          commands: [
            '1) Open framework tab',
            '2) Pick sidebar topic',
            '3) Read steps + snippets',
          ],
        },
      },
      {
        id: 'home-how-to-use',
        label: 'How to Use',
        document: {
          title: 'How to Use this Landing Page',
          intro: 'Keep this as your start page before moving into React, Next.js, Vue, or CSS docs.',
          steps: [
            'Start with Home for orientation and flow.',
            'Move to framework pages for setup-specific documentation.',
            'Visit CSS page for styling-focused Hinglish explanations.',
          ],
          commands: ['Best practice: keep one guide topic open while coding in another tab'],
        },
      },
    ],
  },
  {
    path: '/css',
    label: 'CSS',
    title: 'CSS Practical Guide',
    element: <CssPage />,
    sidebarMode: 'button-docs',
    docs: [
      {
        id: 'css-font-size-property',
        label: 'Font Size Property',
        document: {
          title: 'Font Size Property (Hinglish)',
          intro: 'Font-size decide karta hai text kitna readable aur balanced lagega on different screens.',
          steps: [
            'Body text ke liye usually 16px se start karo.',
            'Heading sizes ko hierarchy me rakho: h1 > h2 > h3.',
            'Responsive design ke liye rem use karo taki scaling easy rahe.',
          ],
          commands: [
            'body { font-size: 1rem; }',
            'h1 { font-size: 2.2rem; }',
            '@media (max-width: 768px) { h1 { font-size: 1.8rem; } }',
          ],
        },
      },
      {
        id: 'css-direction',
        label: 'Direction',
        document: {
          title: 'Direction (Hinglish)',
          intro: 'Direction se content ka flow control hota hai, especially LTR aur RTL languages ke liye.',
          steps: [
            'English content me default direction: ltr rakho.',
            'Arabic/Urdu content ke liye rtl apply karo.',
            'Flex layouts me row/column direction carefully choose karo layout intent ke basis par.',
          ],
          commands: [
            'html { direction: ltr; }',
            '.rtl-section { direction: rtl; }',
            '.toolbar { display: flex; flex-direction: row; }',
          ],
          directionTable: [
            {
              property: 'display: flex',
              value: 'container par apply',
              result: 'Children flex items ban jate hain',
            },
            {
              property: 'flex-direction: row',
              value: 'left to right',
              result: 'Content left se right move hota hai',
            },
            {
              property: 'flex-direction: column',
              value: 'top to bottom',
              result: 'Content top se bottom move hota hai',
            },
            {
              property: 'justify-content: flex-start',
              value: 'main axis start',
              result: 'Row me left, column me top side align hota hai',
            },
            {
              property: 'justify-content: center',
              value: 'main axis center',
              result: 'Content beech me aa jata hai',
            },
            {
              property: 'justify-content: flex-end',
              value: 'main axis end',
              result: 'Row me right, column me bottom side chala jata hai',
            },
            {
              property: 'align-items: flex-start',
              value: 'cross-axis start',
              result: 'Row me top, column me left align hota hai',
            },
            {
              property: 'align-items: center',
              value: 'cross-axis center',
              result: 'Row me vertical center, column me horizontal center',
            },
            {
              property: 'align-items: flex-end',
              value: 'cross-axis end',
              result: 'Row me bottom, column me right align hota hai',
            },
          ],
        },
      },
      {
        id: 'css-tailwind-page-building',
        label: 'Tailwind CSS Page Building',
        document: {
          title: 'Tailwind CSS Page Building (Hinglish)',
          intro:
            'Beginner level me page sections banana easy hai. Har section ko full width do aur height screen ke hisab se control karo.',
          steps: [
            'Section ko full screen banane ke liye h-screen aur w-full use karo.',
            'Background color class se section visually alag dikhega.',
            'Multiple sections bana ke landing page style layout create karo.',
            'Last me footer add karo for copyright, links, ya contact details.',
          ],
          commands: [
            "<div className='h-screen w-full bg-blue-900'>Section1</div>",
            "<div className='h-screen w-full bg-slate-800'>Section2</div>",
            "<div className='h-screen w-full bg-emerald-700'>Section3</div>",
            "<footer className='w-full bg-black text-white text-center py-4'>Footer</footer>",
          ],
          tailwindPageTable: [
            {
              section: 'Section 1 (Hero)',
              utility: 'h-screen w-full bg-blue-900',
              code: "<div className='h-screen w-full bg-blue-900'>Section1</div>",
              explain: 'Full screen hero section with dark blue background.',
            },
            {
              section: 'Section 2 (About)',
              utility: 'h-screen w-full bg-slate-800',
              code: "<div className='h-screen w-full bg-slate-800'>Section2</div>",
              explain: 'Second section for about/content with contrast color.',
            },
            {
              section: 'Section 3 (CTA)',
              utility: 'h-screen w-full bg-emerald-700',
              code: "<div className='h-screen w-full bg-emerald-700'>Section3</div>",
              explain: 'Final section for call-to-action area.',
            },
            {
              section: 'Footer',
              utility: 'w-full bg-black text-white text-center py-4',
              code:
                "<footer className='w-full bg-black text-white text-center py-4'>Footer</footer>",
              explain: 'Bottom area for copyright, quick links, or contact info.',
            },
          ],
        },
      },
      {
        id: 'css-unique-color-buttons',
        label: 'Unique Color Combination Buttons',
        document: {
          title: 'Unique Color Combination Buttons (Hinglish)',
          intro: 'Button colors aise choose karo jo brand identity strong kare aur contrast bhi maintain ho.',
          steps: [
            'Primary button ke liye high-contrast pair use karo.',
            'Hover state me slightly darker ya lighter variant do.',
            'Text color hamesha readable rakho (AA contrast target).',
          ],
          commands: [
            '.btn-ocean { background: #0f766e; color: #ecfeff; }',
            '.btn-sunset { background: #ea580c; color: #fff7ed; }',
            '.btn-royal { background: #1d4ed8; color: #eff6ff; }',
          ],
          colorComboTable: [
            { name: 'Ocean Teal', combo: '#0f766e + #ecfeff', use: 'Calm SaaS CTA buttons' },
            { name: 'Sunset Orange', combo: '#ea580c + #fff7ed', use: 'Attention-grabbing action buttons' },
            { name: 'Royal Blue', combo: '#1d4ed8 + #eff6ff', use: 'Professional dashboard actions' },
            { name: 'Forest Green', combo: '#166534 + #f0fdf4', use: 'Success and confirm actions' },
            { name: 'Plum Accent', combo: '#7e22ce + #faf5ff', use: 'Premium highlight buttons' },
          ],
        },
      },
    ],
  },
  {
    path: '/reactjs',
    label: 'React JS',
    title: 'React JS Page',
    element: <ReactJsPage />,
    sidebarMode: 'button-docs',
    docs: [
      {
        id: 'create-react-web',
        label: 'Create React Web',
        document: {
          title: 'Create React Web',
          intro: 'Use Vite to quickly bootstrap a modern React web app.',
          steps: [
            'Create project with React template.',
            'Move into the new folder.',
            'Install dependencies and run the dev server.',
          ],
          commands: [
            'npm create vite@latest my-react-web -- --template react',
            'cd my-react-web',
            'npm install',
            'npm run dev',
          ],
          importantNotesTable: [
            {
              note: 'Keep clean folder structure from Day 1',
              why: 'Random files later confusion create karte hain.',
              action:
                'Start with folders like components, pages, hooks, utils and assets. Feature-wise grouping karo.',
            },
            {
              note: 'Use small reusable components',
              why: 'Large component me bugs trace karna hard hota hai.',
              action:
                '200+ line component ko split karo. Repeated UI ko separate component banao.',
            },
            {
              note: 'Always use meaningful variable names',
              why: 'Poor naming se logic samajhne me errors badhte hain.',
              action:
                'data, temp, x jaisi names avoid karo. clear names use karo: userList, totalPrice, isLoading.',
            },
            {
              note: 'Use strict lint + format setup',
              why: 'Common mistakes early catch ho jati hain.',
              action:
                'ESLint + Prettier enable karo. Save pe format aur fix use karo for consistent code.',
            },
            {
              note: 'Handle null and loading states always',
              why: 'Most runtime crashes undefined/null access ki wajah se aate hain.',
              action:
                'Render guards use karo: if loading, if error, optional chaining and fallback values.',
            },
            {
              note: 'Avoid direct state mutation',
              why: 'UI updates inconsistent ho jati hain aur hidden bugs aate hain.',
              action:
                'setState ya updater function use karo. Arrays/objects ke liye spread or map pattern use karo.',
            },
            {
              note: 'Commit small and test frequently',
              why: 'Big untested changes rollback karna difficult hota hai.',
              action:
                'Feature complete hone ka wait mat karo. Small commits and quick local testing habit banao.',
            },
          ],
        },
      },
      {
        id: 'install-styling-library',
        label: 'Inatsll Styling Library',
        document: {
          title: 'Tailwind CSS with Vite (React)',
          intro: 'Install and configure Tailwind CSS in a Vite React project using the same flow as the official Tailwind Vite setup.',
          steps: [
            'Install Tailwind CSS and the Vite plugin.',
            'Add the Tailwind plugin in vite.config.js.',
            'Import Tailwind in your main CSS file.',
            'Start the dev server and use Tailwind utility classes in JSX.',
          ],
          commands: [
            'npm install tailwindcss @tailwindcss/vite',
            'vite.config.js\nimport { defineConfig } from "vite"\nimport react from "@vitejs/plugin-react"\nimport tailwindcss from "@tailwindcss/vite"\n\nexport default defineConfig({\n  plugins: [react(), tailwindcss()],\n})',
            'src/index.css\n@import "tailwindcss";',
            'src/App.jsx\n<h1 className="text-3xl font-bold underline text-sky-600">Hello Tailwind</h1>',
            'npm run dev',
          ],
          tailwindGuideTable: [
            {
              step: '1. Install packages',
              command: 'npm install tailwindcss @tailwindcss/vite',
              use: 'Tailwind aur Vite plugin project me add ho jata hai',
            },
            {
              step: '2. Plugin setup',
              command: 'vite.config.js me plugins: [react(), tailwindcss()]',
              use: 'Build ke time Tailwind classes process hongi',
            },
            {
              step: '3. CSS import',
              command: 'src/index.css me @import "tailwindcss";',
              use: 'Utility classes globally use kar paoge',
            },
            {
              step: '4. JSX me class use',
              command:
                '<button className="bg-sky-600 text-white px-4 py-2 rounded-md">Save</button>',
              use: 'Without custom CSS quickly styling apply ho jati hai',
            },
            {
              step: '5. Run and verify',
              command: 'npm run dev',
              use: 'Browser me live dekh sakte ho classes work kar rahi hain ya nahi',
            },
          ],
        },
      },
      {
        id: 'image-source',
        label: 'Image Source',
        document: {
          title: 'Image Source (React)',
          intro: 'Use this table to pick trusted image websites for React projects.',
          steps: [
            'Select one website based on your image type and license need.',
            'Download images and keep attribution if required.',
            'Optimize images before adding to public/images or src/assets.',
          ],
          websiteTable: [
            { name: 'Unsplash', link: 'https://unsplash.com', use: 'High-quality free photos' },
            { name: 'Pexels', link: 'https://www.pexels.com', use: 'Free stock photos and videos' },
            { name: 'Pixabay', link: 'https://pixabay.com', use: 'Free photos, vectors, and illustrations' },
            { name: 'Pinterest', link: 'https://www.pinterest.com', use: 'Design and inspiration references' },
            { name: 'Freepik', link: 'https://www.freepik.com', use: 'Vectors, PSD, and design assets' },
          ],
          commands: ['import heroImage from "../assets/hero.jpg"', '<img src={heroImage} alt="Hero banner" />'],
        },
      },
      {
        id: 'ui-component-material-web',
        label: 'UI Component Material Web',
        document: {
          title: 'Free + Open-Source Tailwind UI Components (Hinglish)',
          intro:
            'Yeh libraries beginner-friendly hain aur inme free/open-source components milte hain jo copy-paste karke quickly UI build kar sakte ho.',
          steps: [
            'Component copy karne se pehle project me Tailwind setup confirm karo.',
            'Reusable sections (Navbar, Hero, Card, CTA, Footer) ko component-wise break karo.',
            'Copy ke baad class names simplify karo so code maintain karna easy ho.',
          ],
          commands: [
            'Tip: hamesha docs ke free section se hi components pick karo',
            'Tip: copied code me unused classes remove karo',
            'Tip: same color/spacing tokens use karo for consistent design',
          ],
          uiLibraryTable: [
            {
              name: 'HyperUI',
              bestComponents: 'Navbar, Hero Sections, Auth Forms, Product Cards, CTA Blocks',
              features:
                'Pure Tailwind markup deta hai, copy-paste quick hai, startup landing pages ke liye best.',
              link: 'https://www.hyperui.dev',
            },
            {
              name: 'daisyUI',
              bestComponents: 'Buttons, Modals, Dropdowns, Alerts, Tabs, Navbar',
              features:
                'Tailwind plugin-based component classes milti hain; themes ready milte hain aur beginner ke liye super fast.',
              link: 'https://daisyui.com',
            },
            {
              name: 'TailGrids',
              bestComponents: 'Hero Sections, Pricing Blocks, Feature Grids, Testimonials',
              features:
                'Ready marketing blocks provide karta hai; free components se landing pages quickly assemble ho jate hain.',
              link: 'https://tailgrids.com/components',
            },
            {
              name: 'Sailboat UI',
              bestComponents: 'Cards, Buttons, Inputs, Avatars, Badges, Nav Patterns',
              features:
                'Lightweight aur clean Tailwind components deta hai; design minimal and easy-to-edit hota hai.',
              link: 'https://sailboatui.com',
            },
            {
              name: 'Wind UI',
              bestComponents: 'Form Controls, Buttons, Cards, Empty States, Dashboard Blocks',
              features:
                'Component snippets simple structure me milte hain; beginners ko class flow samajhne me help milti hai.',
              link: 'https://wind-ui.com',
            },
            {
              name: 'Magic UI',
              bestComponents: 'Animated Buttons, Spotlight Effects, Marquee, Bento Grids',
              features:
                'Modern effect-based UI snippets milte hain; portfolio aur SaaS pages ko premium look dene me useful.',
              link: 'https://magicui.design',
            },
          ],
        },
      },
      {
        id: 'vscode-extensions-react',
        label: 'VSCode Extensions',
        document: reactVscodeExtensionsDocument,
      },
    ],
  },
  {
    path: '/nextjs',
    label: 'Next JS',
    title: 'Next JS Page',
    element: <NextJsPage />,
    sidebarMode: 'button-docs',
    docs: [
      {
        id: 'create-next-web',
        label: 'Create Next Web',
        document: {
          title: 'Create Next Web',
          intro: 'Bootstrap a new Next.js app with the official starter command.',
          steps: [
            'Create the project with create-next-app.',
            'Choose TypeScript, App Router, and ESLint options as needed.',
            'Run the development server and open localhost:3000.',
          ],
          commands: [
            'npx create-next-app@latest my-next-web',
            'cd my-next-web',
            'npm run dev',
          ],
        },
      },
      {
        id: 'install-styling-library-next',
        label: 'Inatsll Styling Library',
        document: {
          title: 'Install Styling Library for Next.js',
          intro: 'Next.js works well with Tailwind CSS, styled-components, and CSS Modules.',
          steps: [
            'Install the preferred styling library.',
            'Configure globals and style entry points.',
            'Use class names or styled components inside app routes.',
          ],
          commands: [
            'npm install tailwindcss @tailwindcss/postcss postcss',
            'npm install styled-components',
            'import "./globals.css"',
          ],
        },
      },
      {
        id: 'image-source-next',
        label: 'Image Source',
        document: {
          title: 'Image Source (Next.js)',
          intro: 'Use this table to choose image websites and then render images with next/image.',
          steps: [
            'Pick a website from the table and check allowed usage.',
            'For external images, add host domain in next.config.js remotePatterns.',
            'Prefer next/image for better performance and optimization.',
          ],
          websiteTable: [
            { name: 'Unsplash', link: 'https://unsplash.com', use: 'Hero and background photos' },
            { name: 'Pexels', link: 'https://www.pexels.com', use: 'Free photos for UI sections' },
            { name: 'Burst by Shopify', link: 'https://burst.shopify.com', use: 'Business and ecommerce images' },
            { name: 'Pinterest', link: 'https://www.pinterest.com', use: 'Moodboard and trend references' },
            { name: 'Lorem Picsum', link: 'https://picsum.photos', use: 'Placeholder images during development' },
          ],
          commands: ['import Image from "next/image"', '<Image src="/images/profile.png" alt="Profile" width={300} height={200} />'],
        },
      },
      {
        id: 'ui-component-material-web-next',
        label: 'UI Component Material Web',
        document: {
          title: 'UI Component Material Web for Next.js',
          intro: 'Material UI can be used in Next.js with app directory support.',
          steps: [
            'Install Material UI dependencies.',
            'Wrap app with ThemeProvider in a client component.',
            'Use MUI components across pages and layouts.',
          ],
          commands: [
            'npm install @mui/material @emotion/react @emotion/styled',
            'import { ThemeProvider } from "@mui/material/styles"',
            '<Button variant="contained">Create</Button>',
          ],
        },
      },
      {
        id: 'vscode-extensions-next',
        label: 'VSCode Extensions',
        document: nextVscodeExtensionsDocument,
      },
    ],
  },
  {
    path: '/vue',
    label: 'Vue',
    title: 'Vue Page',
    element: <VuePage />,
    sidebarMode: 'button-docs',
    docs: [
      {
        id: 'create-vue-web',
        label: 'Create Vue Web',
        document: {
          title: 'Create Vue Web',
          intro: 'Create a Vue app quickly using Vite and start developing immediately.',
          steps: [
            'Initialize a new Vue project using the Vite Vue template.',
            'Install packages and start local development server.',
            'Build pages and components in the src folder.',
          ],
          commands: [
            'npm create vite@latest my-vue-web -- --template vue',
            'cd my-vue-web',
            'npm install',
            'npm run dev',
          ],
        },
      },
      {
        id: 'install-styling-library-vue',
        label: 'Inatsll Styling Library',
        document: {
          title: 'Install Styling Library for Vue',
          intro: 'Vue supports CSS preprocessors and UI frameworks out of the box.',
          steps: [
            'Pick Tailwind CSS, Vuetify, or Bootstrap Vue based on project type.',
            'Install dependencies and configure plugins.',
            'Apply styles globally or scoped per component.',
          ],
          commands: [
            'npm install -D tailwindcss postcss autoprefixer',
            'npm install vuetify',
            '<style scoped> .card { padding: 1rem; } </style>',
          ],
        },
      },
      {
        id: 'image-source-vue',
        label: 'Image Source',
        document: {
          title: 'Image Source (Vue)',
          intro: 'Use this table to find image resources suitable for Vue websites and apps.',
          steps: [
            'Choose source website based on asset type and license.',
            'Keep UI icons/logos in src/assets and large static media in public/images.',
            'Use meaningful alt text for accessibility.',
          ],
          websiteTable: [
            { name: 'Unsplash', link: 'https://unsplash.com', use: 'Landing page photography' },
            { name: 'Pexels', link: 'https://www.pexels.com', use: 'Free app and blog visuals' },
            { name: 'Pinterest', link: 'https://www.pinterest.com', use: 'Creative UI inspiration' },
            { name: 'Storyset', link: 'https://storyset.com', use: 'Editable illustrations for web apps' },
            { name: 'Icons8 Ouch!', link: 'https://icons8.com/illustrations', use: 'Illustration packs and icons' },
          ],
          commands: ['import heroImage from "../assets/hero.png"', '<img :src="heroImage" alt="Hero" />'],
        },
      },
      {
        id: 'ui-component-material-web-vue',
        label: 'UI Component Material Web',
        document: {
          title: 'UI Component Material Web for Vue',
          intro: 'For Vue, Vuetify is a Material Design component framework.',
          steps: [
            'Install Vuetify package and plugin setup.',
            'Register Vuetify in your app entry file.',
            'Use components like v-btn, v-card, and v-text-field.',
          ],
          commands: [
            'npm install vuetify',
            'import "vuetify/styles"',
            '<v-btn color="primary">Submit</v-btn>',
          ],
        },
      },
      {
        id: 'vscode-extensions-vue',
        label: 'VSCode Extensions',
        document: vueVscodeExtensionsDocument,
      },
    ],
  },
  {
    path: '/backend',
    label: 'Backend',
    title: 'Backend Docs',
    element: <BackendPage />,
    sidebarMode: 'button-docs',
    docs: [
      {
        id: 'create-express-api',
        label: 'Create Express API',
        document: {
          title: 'Create Express API',
          intro: 'Bootstrap a simple Node.js + Express backend API with a clean starting point.',
          steps: [
            'Create a new folder and initialize npm.',
            'Install Express and a dev runner like nodemon.',
            'Create a basic server entry file and start the dev server.',
          ],
          commands: [
            'mkdir backend-api && cd backend-api',
            'npm init -y',
            'npm install express',
            'npm install -D nodemon',
            'node server.js',
          ],
        },
      },
      {
        id: 'backend-env-config',
        label: 'Environment Setup',
        document: {
          title: 'Environment Setup',
          intro: 'Use dotenv so secrets and configs stay out of source code.',
          steps: [
            'Install dotenv and create a .env file.',
            'Load environment variables at the top of your entry file.',
            'Reference variables via process.env in config and routes.',
          ],
          commands: [
            'npm install dotenv',
            '.env\nPORT=5000\nMONGO_URI=your_mongo_uri',
            'server.js\nimport dotenv from "dotenv"\ndotenv.config()',
          ],
        },
      },
      {
        id: 'backend-mongodb',
        label: 'MongoDB Connection',
        document: {
          title: 'MongoDB Connection',
          intro: 'Connect Express to MongoDB using Mongoose with a single reusable function.',
          steps: [
            'Install mongoose and create a db connection helper.',
            'Call the connect function before starting the server.',
            'Handle connection errors with try/catch.',
          ],
          commands: [
            'npm install mongoose',
            'db.js\nimport mongoose from "mongoose"\nexport const connectDb = async () => {\n  await mongoose.connect(process.env.MONGO_URI)\n}',
            'server.js\nimport { connectDb } from "./db.js"\nconnectDb()',
          ],
        },
      },
      {
        id: 'backend-auth-jwt',
        label: 'JWT Auth Basics',
        document: {
          title: 'JWT Auth Basics',
          intro: 'Use hashed passwords and signed JWT tokens for basic authentication.',
          steps: [
            'Install jsonwebtoken and bcryptjs.',
            'Hash passwords before saving users.',
            'Create a token on login and verify it in middleware.',
          ],
          commands: [
            'npm install jsonwebtoken bcryptjs',
            'const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })',
            'const isMatch = await bcrypt.compare(password, user.password)',
          ],
        },
      },
      {
        id: 'backend-error-handling',
        label: 'Error Handling',
        document: {
          title: 'Error Handling in Express',
          intro: 'Centralize errors so routes stay clean and consistent.',
          steps: [
            'Create a global error handler middleware.',
            'Call next(error) from routes or controllers.',
            'Return structured error responses for API clients.',
          ],
          commands: [
            'app.use((err, req, res, next) => {\n  res.status(err.status || 500).json({ message: err.message || "Server error" })\n})',
            'next(new Error("Invalid request"))',
          ],
        },
      },
      {
        id: 'backend-structure',
        label: 'Folder Structure',
        document: {
          title: 'Backend Folder Structure',
          intro: 'Use a consistent structure so teams can navigate the API quickly.',
          steps: [
            'Keep routes, controllers, models, and middleware separated.',
            'Create a config folder for db and env helpers.',
            'Add a utils folder for reusable helpers.',
          ],
          commands: [
            'src/\n  controllers/\n  routes/\n  models/\n  middleware/\n  config/\n  utils/\n  server.js',
          ],
        },
      },
    ],
  },
]

const defaultSeo = {
  title: 'MernDoc | Practical Frontend Guides',
  description:
    'MernDoc provides practical documentation for React, Next.js, Vue, and CSS with clear steps and copy-ready examples.',
}

const pageSeoByPath = {
  '/home': {
    title: 'MernDoc Home | Frontend Documentation Hub',
    description:
      'Start here to explore practical documentation for React, Next.js, Vue, and CSS in MernDoc.',
  },
  '/css': {
    title: 'CSS Guide | MernDoc',
    description:
      'Learn practical CSS concepts, responsive patterns, and style workflows with beginner-friendly examples.',
  },
  '/reactjs': {
    title: 'React JS Guide | MernDoc',
    description:
      'Follow React setup and workflow documentation including tooling, UI libraries, and practical usage notes.',
  },
  '/nextjs': {
    title: 'Next.js Guide | MernDoc',
    description:
      'Read Next.js setup and project guidance with practical recommendations for app development workflows.',
  },
  '/vue': {
    title: 'Vue Guide | MernDoc',
    description:
      'Explore practical Vue documentation including setup, styling options, and UI component resources.',
  },
  '/backend': {
    title: 'Backend Guide | MernDoc',
    description:
      'Learn backend fundamentals with Node.js, Express, MongoDB, authentication, and error handling guidance.',
  },
}

const setMetaContent = (selector, content) => {
  const element = document.querySelector(selector)
  if (element) {
    element.setAttribute('content', content)
  }
}

const DocumentViewer = ({ document, pageLabel }) => {
  const [copiedExtension, setCopiedExtension] = useState('')
  const [copiedCode, setCopiedCode] = useState('')

  const extensionThemeClass =
    pageLabel === 'Vue'
      ? 'ext-theme-vue'
      : pageLabel === 'React JS'
        ? 'ext-theme-react'
        : pageLabel === 'Next JS'
          ? 'ext-theme-next'
          : ''

  const handleCopyExtension = async (name) => {
    try {
      await navigator.clipboard.writeText(name)
      setCopiedExtension(name)
      window.setTimeout(() => setCopiedExtension(''), 1200)
    } catch {
      setCopiedExtension('')
    }
  }

  const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      window.setTimeout(() => setCopiedCode(''), 1200)
    } catch {
      setCopiedCode('')
    }
  }

  if (!document) {
    return null
  }

  return (
    <article className="doc-viewer">
      <h2>{document.title}</h2>
      <p>{document.intro}</p>
      <h3>Steps</h3>
      <ol>
        {document.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <h3>Quick Snippets</h3>
      <div className="snippet-grid">
        {document.commands.map((command) => (
          <pre key={command}>
            <code>{command}</code>
          </pre>
        ))}
      </div>

      {document.websiteTable?.length ? (
        <>
          <h3>Image Source Websites</h3>
          <div className="table-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  <th>Website Name</th>
                  <th>Link</th>
                  <th>Best Use</th>
                </tr>
              </thead>
              <tbody>
                {document.websiteTable.map((site) => (
                  <tr key={site.name}>
                    <td>{site.name}</td>
                    <td>
                      <a href={site.link} target="_blank" rel="noreferrer">
                        {site.link}
                      </a>
                    </td>
                    <td>{site.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      {document.colorComboTable?.length ? (
        <>
          <h3>Unique Color Combinations</h3>
          <div className="table-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  <th>Style Name</th>
                  <th>Color Combo</th>
                  <th>Best Use</th>
                </tr>
              </thead>
              <tbody>
                {document.colorComboTable.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.combo}</td>
                    <td>{item.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      {document.directionTable?.length ? (
        <>
          <h3>Direction + Flex Beginner Table</h3>
          <div className="table-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                  <th>Effect (Hinglish)</th>
                </tr>
              </thead>
              <tbody>
                {document.directionTable.map((item) => (
                  <tr key={`${item.property}-${item.value}`}>
                    <td>{item.property}</td>
                    <td>{item.value}</td>
                    <td>{item.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      {document.tailwindGuideTable?.length ? (
        <>
          <h3>Tailwind Install ke baad kaise use kare</h3>
          <div className="table-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Command / Config</th>
                  <th>Kya hoga</th>
                </tr>
              </thead>
              <tbody>
                {document.tailwindGuideTable.map((row) => (
                  <tr key={row.step}>
                    <td>{row.step}</td>
                    <td>{row.command}</td>
                    <td>{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      {document.tailwindPageTable?.length ? (
        <>
          <h3>Tailwind Page Type Section Guide</h3>
          <div className="table-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Utility Classes</th>
                  <th>Code</th>
                  <th>Copy</th>
                  <th>Beginner Notes</th>
                </tr>
              </thead>
              <tbody>
                {document.tailwindPageTable.map((row) => (
                  <tr key={row.section}>
                    <td>{row.section}</td>
                    <td>{row.utility}</td>
                    <td>{row.code}</td>
                    <td>
                      <button
                        type="button"
                        className="copy-table-btn"
                        onClick={() => handleCopyCode(row.code)}
                      >
                        {copiedCode === row.code ? 'Copied' : 'Copy'}
                      </button>
                    </td>
                    <td>{row.explain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      {document.importantNotesTable?.length ? (
        <>
          <h3>Important Notes for Better Code (Hinglish)</h3>
          <div className="table-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  <th>Important Note</th>
                  <th>Why this matters</th>
                  <th>Practical Trick</th>
                </tr>
              </thead>
              <tbody>
                {document.importantNotesTable.map((row) => (
                  <tr key={row.note}>
                    <td>{row.note}</td>
                    <td>{row.why}</td>
                    <td>{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      {document.uiLibraryTable?.length ? (
        <>
          <h3>Free Tailwind Component Libraries (Hinglish)</h3>
          <div className="table-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Best Component Names</th>
                  <th>UI Features</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {document.uiLibraryTable.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.bestComponents}</td>
                    <td>{row.features}</td>
                    <td>
                      <a href={row.link} target="_blank" rel="noreferrer">
                        {row.link}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      {document.extensionList?.length ? (
        <>
          <h3>Important Extensions (No AI)</h3>
          <div className={`extension-grid ${extensionThemeClass}`}>
            {document.extensionList.map((item) => (
              <section key={item.name} className="extension-card">
                <div className="extension-title-row">
                  <h4>{item.name}</h4>
                  <button
                    type="button"
                    className="copy-extension-btn"
                    onClick={() => handleCopyExtension(item.name)}
                  >
                    {copiedExtension === item.name ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p>
                  <strong>Use:</strong> {item.use}
                </p>
                <p className="feature-title">Features</p>
                <ul>
                  {item.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </>
      ) : null}
    </article>
  )
}

const PageShell = ({
  title,
  pageLabel,
  sidebarMode,
  docs,
  activeDocId,
  onSelectDoc,
  children,
}) => {
  const activeDoc =
    sidebarMode === 'button-docs' ? docs.find((doc) => doc.id === activeDocId) ?? docs[0] : null

  return (
    <div className="layout">
      <Navbar pages={pages} />
      <div className="app-shell">
        <Sidebar
          pageLabel={pageLabel}
          docs={docs}
          mode={sidebarMode}
          activeDocId={activeDoc?.id}
          onSelectDoc={onSelectDoc}
        />
        <main className="content-area">
          <h1>{title}</h1>
          <DocumentViewer document={activeDoc?.document} pageLabel={pageLabel} />
          <section className="page-panel">{children}</section>
        </main>
      </div>
    </div>
  )
}

const App = () => {
  const [activeDocs, setActiveDocs] = useState({
    '/home': 'home-overview',
    '/css': 'css-font-size-property',
    '/reactjs': 'create-react-web',
    '/nextjs': 'create-next-web',
    '/vue': 'create-vue-web',
    '/backend': 'create-express-api',
  })
  const location = useLocation()

  useEffect(() => {
    const seo = pageSeoByPath[location.pathname] ?? defaultSeo
    const baseUrl = window.location.origin
    const canonicalUrl = `${baseUrl}${location.pathname}`

    document.title = seo.title
    setMetaContent('meta[name="description"]', seo.description)
    setMetaContent('meta[property="og:title"]', seo.title)
    setMetaContent('meta[property="og:description"]', seo.description)
    setMetaContent('meta[property="og:url"]', canonicalUrl)
    setMetaContent('meta[name="twitter:title"]', seo.title)
    setMetaContent('meta[name="twitter:description"]', seo.description)

    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl)
    }
  }, [location.pathname])

  const handleDocSelect = (pagePath, docId) => {
    setActiveDocs((prevState) => ({
      ...prevState,
      [pagePath]: docId,
    }))
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      {pages.map((page) => (
        <Route
          key={page.path}
          path={page.path}
          element={
            <PageShell
              title={page.title}
              pageLabel={page.label}
              sidebarMode={page.sidebarMode}
              docs={page.docs}
              activeDocId={activeDocs[page.path]}
              onSelectDoc={(docId) => handleDocSelect(page.path, docId)}
            >
              {page.element}
            </PageShell>
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default App
