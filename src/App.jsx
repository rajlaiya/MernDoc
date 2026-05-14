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
import restApiPdf from './documents/REST-API.pdf'
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
    docs: [
      {
        id: 'backend-env-setup',
        label: 'Environment Setup',
        document: {
          title: 'Environment Setup (Backend Start)',
          intro:
            'Backend start karne ke liye npm init, packages, aur MongoDB setup complete karo. Ye steps follow karke setup 10-15 min me ready ho jata hai.',
          download: {
            label: 'Download REST API PDF',
            href: restApiPdf,
            filename: 'REST-API.pdf',
          },
          steps: [
            'Project folder me jao aur npm init run karo.',
            'Express + Mongoose dono ko ek sath install karo.',
            'MongoDB website par login/signup karo (mongodb.com).',
            'Atlas me naya project banao aur new cluster create karo (free tier).',
            'Database Access me naya user banao (username + password).',
            'Network Access me IP allowlist add karo: 0.0.0.0/0.',
            'Clusters tab se Connect > Connect your application > URI copy karo.',
            'Compass install karo (MongoDB Compass GUI) aur URI se connect karo.',
            'Postman open karo aur API routes test karo (POST/GET/DELETE/PATCH).',
            'Nodemon se server run karo (server.js).',
          ],
          commands: [
            'npm init -y // for package.json file',
            'npm i express mongoose // dono ko ek sath install',
            'npm install',
            'MongoDB Atlas: Project > Build a Database > Create Cluster',
            'Network Access: Add IP Address -> 0.0.0.0/0 (Allow from anywhere)',
            'Compass: paste mongodb+srv URI and Connect',
            'Postman POST: http://localhost:3000/notes + Body (JSON)',
            'Postman GET: http://localhost:3000/notes',
            'Postman DELETE: http://localhost:3000/notes/:id',
            'Postman PATCH: http://localhost:3000/notes/:id + Body (JSON)',
            'npx nodemon server.js // server ko start karne k liye',
          ],
        },
      },
      {
        id: 'backend-image-upload',
        label: 'Deal with Image',
        document: {
          title: 'Deal with Image (Multer + Cloud Storage)',
          intro:
            'Multer middleware se images ko handle karo aur cloud storage provider (ImageKit, Cloudinary, AWS S3) par upload karke URL generate karo.',
          steps: [
            'Multer install karo.',
            'Postman me Body > form-data choose karo aur key type file set karo.',
            'Route par multer middleware add karo: upload.single("image").',
            'File buffer ko storage service me bhejo aur result URL save karo.',
            'Cloud provider ke env vars .env me set karo.',
          ],
          commands: [
            'npm i multer',
            'npm i @imagekit/nodejs // optional for ImageKit storage',
            'Postman: Body > form-data > key "image" (type: File) + key "title" (type: Text)',
            'Middleware: upload.single("image") // multer middleware',
          ],
          fileSnippets: [
            {
              title: 'src/app.js',
              code:
                'const express = require("express");\nconst multer = require("multer");\nconst uploadFile = require("./src/services/storage.service");\n\nconst app = express();\napp.use(express.json());\n\nconst upload = multer({ storage: multer.memoryStorage() });\n\napp.post("/create-post", upload.single("image"), async (req, res) => {\n  console.log(req.body);\n  console.log(req.file);\n\n  const result = await uploadFile(req.file.buffer);\n  console.log(result);\n\n  res.status(201).json({ message: "File uploaded", data: result });\n});\n\nmodule.exports = app;\n',
            },
            {
              title: 'src/services/storage.service.js',
              code:
                'const ImageKit = require("@imagekit/nodejs");\n\nconst imagekit = new ImageKit({\n  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,\n  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,\n  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,\n});\n\nasync function uploadFile(buffer) {\n  if (!process.env.IMAGEKIT_PRIVATE_KEY) {\n    throw new Error(\n      "ImageKit env vars missing: IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT",\n    );\n  }\n\n  const result = await imagekit.files.upload({\n    file: buffer,\n    fileName: "image.jpg",\n  });\n  return result;\n}\n\nmodule.exports = uploadFile;\n',
            },
          ],
          promptLines: [
            'Cloud storage providers image ko URL me convert karte hain: ImageKit, Cloudinary, AWS S3.',
            'Memory storage small uploads ke liye convenient hai; large files ke liye disk or streaming use karo.',
            'Upload success ke baad URL ko DB me save karo aur response me return karo.',
          ],
        },
      },
      {
        id: 'backend-mongodb-compass',
        label: 'MongoDB Compass',
        document: {
          title: 'MongoDB Compass Step-by-Step (Hinglish)',
          intro:
            'Compass se aap apne MongoDB data ko visual tareeke se dekh sakte ho. Ye steps beginner ke liye one-by-one hai.',
          steps: [
            'MongoDB Compass install karo (official site se).',
            'Atlas me cluster open karo > Connect > Compass select karo.',
            'Connection string copy karo aur <password> ko apne DB user password se replace karo.',
            'Compass open karke New Connection me URI paste karo.',
            'Connect button press karo, databases list check karo.',
            'Create Database se naya DB + collection banao.',
            'Backend se data insert karo, phir Compass me refresh karke verify karo.',
          ],
          commands: [
            'Example URI\nmongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority',
            'Tip: <password> ko remove karke apna real password paste karo',
          ],
          images: [
            {
              src: '/images/compass-steps.svg',
              alt: 'MongoDB Compass connection steps',
              caption: 'Install, URI paste, connect, and verify data.'
            },
          ],
          promptLines: [
            'Network Access me 0.0.0.0/0 allow karo agar local se connect karna hai.',
            'Wrong username ya password se authentication failed error aata hai.',
            'Data tabhi dikhega jab backend MongoDB me write karega.',
          ],
        },
      },
      {
        id: 'backend-connect-frontend',
        label: 'Connect with Frontend',
        document: {
          title: 'React Frontend ko Backend + MongoDB se Connect karo',
          intro:
            'Ye guide beginner ke liye full flow cover karta hai: install steps, code changes, env setup, aur testing.',
          steps: [
            'Backend folder me npm init -y run karo.',
            'Backend packages install karo: express, mongoose, cors, dotenv.',
            'Folder structure banao: src, src/db, src/models, src/routes.',
            'Backend .env me MONGO_URI aur PORT set karo.',
            'db.js me mongoose.connect use karke MongoDB connect karo.',
            'note.model.js me schema define karo (title, description).',
            'note.routes.js me GET + POST routes banao.',
            'app.js me express.json() aur cors() add karo, routes mount karo.',
            'server.js me connectDB() call karo, phir app.listen start karo.',
            'API ko Postman ya curl se test karo (GET/POST).',
            'Frontend me axios install karo (ya fetch use karo).',
            'Frontend .env me VITE_API_URL set karo.',
            'React se GET request karo aur UI me data show karo.',
            'POST request se data insert karo aur Compass me verify karo.',
          ],
          commands: [
            'Backend install\nnpm i express mongoose cors dotenv\nnpm i -D nodemon',
            'Folders\nmkdir src\nmkdir src/db\nmkdir src/models\nmkdir src/routes',
            'Backend .env\nMONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/mydb\nPORT=3000',
            'Run backend\nnpx nodemon server.js',
            'Frontend install\nnpm i axios',
            'Frontend .env\nVITE_API_URL=http://localhost:3000',
            'Quick test\ncurl http://localhost:3000/notes',
          ],
          images: [
            {
              src: '/images/connect-flow.svg',
              alt: 'React frontend to API to MongoDB flow',
              caption: 'React talks to API, API reads and writes MongoDB. Compass is used to verify data.'
            },
          ],
          fileSnippets: [
            {
              title: 'src/db/db.js',
              code:
                'const mongoose = require("mongoose");\n\nasync function connectDB() {\n  await mongoose.connect(process.env.MONGO_URI);\n  console.log("DB connected");\n}\n\nmodule.exports = connectDB;\n',
            },
            {
              title: 'src/models/note.model.js',
              code:
                'const mongoose = require("mongoose");\n\nconst noteSchema = new mongoose.Schema({\n  title: { type: String, required: true },\n  description: { type: String, required: true },\n});\n\nmodule.exports = mongoose.model("note", noteSchema);\n',
            },
            {
              title: 'src/routes/note.routes.js',
              code:
                'const express = require("express");\nconst Note = require("../models/note.model");\n\nconst router = express.Router();\n\nrouter.get("/notes", async (req, res) => {\n  const notes = await Note.find();\n  res.json(notes);\n});\n\nrouter.post("/notes", async (req, res) => {\n  const note = await Note.create(req.body);\n  res.status(201).json(note);\n});\n\nmodule.exports = router;\n',
            },
            {
              title: 'src/app.js',
              code:
                'const express = require("express");\nconst cors = require("cors");\nconst noteRoutes = require("./routes/note.routes");\n\nconst app = express();\napp.use(cors());\napp.use(express.json());\napp.use(noteRoutes);\n\nmodule.exports = app;\n',
            },
            {
              title: 'server.js',
              code:
                'const app = require("./src/app");\nconst connectDB = require("./src/db/db");\n\nconnectDB();\n\nconst port = process.env.PORT || 3000;\napp.listen(port, () => {\n  console.log(`Server running on ${port}`);\n});\n',
            },
            {
              title: 'src/api/notes.js (React)',
              code:
                'import axios from "axios";\n\nconst api = axios.create({\n  baseURL: import.meta.env.VITE_API_URL,\n});\n\nexport const fetchNotes = () => api.get("/notes");\nexport const createNote = (payload) => api.post("/notes", payload);\n',
            },
          ],
          promptLines: [
            'Same base URL use karo taki endpoints easily switch ho sakein.',
            'CORS sirf local dev me allow karo; production me origin limit karo.',
            'Compass me data refresh karke verify karo ki insert successful hua.',
          ],
        },
      },
      {
        id: 'backend-folder-structure',
        label: 'Folder Structure',
        document: {
          title: 'Backend Folder Structure',
          intro: 'Clean structure se files locate karna easy hota hai aur scaling simple hoti hai.',
          steps: [
            'Root par server.js rakho.',
            'App logic ko src/app.js me rakho.',
            'DB, models, routes, controllers ko alag folders me rakho.',
          ],
          commands: [
            'backend-api/\n  server.js\n  src/\n    app.js\n    db/\n      db.js\n    models/\n      note.model.js\n    routes/\n      note.routes.js\n    controllers/\n      note.controller.js\n    middleware/\n      auth.middleware.js',
          ],
        },
      },
      {
        id: 'backend-common-files',
        label: 'Similar Code (Files)',
        document: {
          title: 'Similar Code for Common Files',
          intro:
            'Ye same code templates har backend project me repeat hote hain. Is pattern ko follow karo to API fast setup ho jati hai.',
          steps: [
            'Model + DB + App + Server ye 4 files ka flow same hota hai.',
            'Model me schema define karo, app.js me routes likho.',
            'db.js me Mongo connect karo, server.js me app start karo.',
            'Har website ka CRUD logic same hota hai: POST, GET, DELETE, PATCH.',
            'Ek route banaya, usi pattern se baki routes ban jate hain.',
          ],
          commands: [
            'POST /notes = create new note (body se data lo)',
            'GET /notes = all notes fetch',
            'DELETE /notes/:id = specific note delete',
            'PATCH /notes/:id = description update',
            'Same pattern users, products, posts, comments sab me use hota hai',
          ],
          importantNotesTable: [
            {
              note: 'Route name short rakho',
              why: 'Short URLs easy to remember aur test karne me fast hote hain.',
              action: 'Use /notes, /users, /products jaise paths.',
            },
            {
              note: 'POST me hamesha body parse karo',
              why: 'express.json() ke bina req.body undefined aata hai.',
              action: 'app.use(express.json()) top pe add karo.',
            },
            {
              note: 'DB connect fail ho to server mat start karo',
              why: 'API crash ya blank response milta hai.',
              action: 'connectDB() ko server start se pehle call karo.',
            },
            {
              note: 'Id ke liye params use karo',
              why: 'Specific record delete/update karna easy hota hai.',
              action: 'Use /notes/:id and req.params.id.',
            },
            {
              note: 'Same CRUD logic sab projects me reuse hota hai',
              why: 'Pattern samajh aane se new APIs fast banti hain.',
              action: 'Model/route copy karo aur schema + route name replace karo.',
            },
          ],
          fileSnippets: [
            {
              title: 'src/models/note.model.js',
              code:
                'const mongoose = require("mongoose");\n\nconst noteSchema = new mongoose.Schema({\n  title: String,\n  description: String,\n});\n\nconst noteModel = mongoose.model("note", noteSchema);\n\nmodule.exports = noteModel; // noteModel ko export kar diya taki app.js me use kar sake\n',
            },
            {
              title: 'src/app.js',
              code:
                'const express = require("express");\nconst noteModel = require("./models/note.model");\n\nconst app = express(); // express ko initialize kar diya\napp.use(express.json()); // ye line isliye use karte hai taki hum req.body me data ko access kar sake\n\n/*\nPOST ka use karke hum note create karenge\nGET ka use karke hum sare notes ko fetch karenge\nDELETE ka use karke hum note ko delete karenge\nPATCH ka use karke hum note ke description ko update karenge\n*/\n\napp.post("/notes", async (req, res) => {\n  const data = req.body;\n  await noteModel.create({\n    title: data.title,\n    description: data.description,\n  });\n  res.status(201).json({ message: "Note created successfully" });\n});\n\napp.get("/notes", async (req, res) => {\n  const notes = await noteModel.find(); // find aek array return krega jisme sare notes honge\n\n  /*\n  sirf find () NO CONDITION THEN ALL NODES RETURN KREGA\n\n  findOne = [{},{}] or [] return krega, jisme pehla note return hoga jo title test_title hoga\n\n  find = {} or null return krega, jisme sare notes honge jo title test_title hoga\n\n  */\n\n  res.status(200).json({\n    message: "Notes fetched successfully",\n    notes: notes,\n  });\n});\n\napp.delete("/notes/:id", async (req, res) => {\n  const id = req.params.id;\n  await noteModel.findOneAndDelete({ _id: id });\n\n  res.status(200).json({ message: "Note deleted successfully" });\n});\n\napp.patch("/notes/:id", async (req, res) => {\n  const id = req.params.id;\n  const description = req.body.description;\n\n  await noteModel.findOneAndUpdate({ _id: id }, { description: description });\n\n  res.status(200).json({ message: "Note updated successfully" });\n});\n\nmodule.exports = app; // app ko export kar diya taki server.js me use kar sake\n',
            },
            {
              title: 'src/db/db.js',
              code:
                'const mongoose = require("mongoose");\n\nasync function connectDB() {\n  await mongoose.connect(\n    "mongodb+srv://yt:D0wBCv2XZpatMqOY@fiestbackend.lrzxghd.mongodb.net/halley",\n  );\n  console.log("Connected to Database");\n}\n\nmodule.exports = connectDB; // connectDB function ko export kar diya taki server.js me use kar sake\n',
            },
            {
              title: 'server.js',
              code:
                'const app = require("./src/app");\nconst connectDB = require("./src/db/db");\n\nconnectDB();\n\napp.listen(3000, () => {\n  console.log(`Server is running on port 3000`);\n});\n',
            },
          ],
        },
      },
      {
        id: 'backend-step-guide',
        label: 'Step-by-Step + Errors',
        document: {
          title: 'Backend Step-by-Step (with Common Errors)',
          intro: 'Start se end tak basic flow follow karo, aur common errors ka fix bhi yahin milega.',
          steps: [
            'Project folder banao aur npm init run karo.',
            'Express + Mongoose install karo.',
            'Folder structure create karo (src, models, db).',
            'app.js, db.js, note.model.js file add karo.',
            'server.js me app + db connect karo.',
            'Server start karo aur API test karo.',
          ],
          commands: [
            'npm init -y',
            'npm i express mongoose',
            'mkdir src && mkdir src/models && mkdir src/db',
            'node server.js',
          ],
          commonErrors: [
            {
              problem: 'Cannot find module "./models/note.model"',
              reason: 'Wrong file path ya file name mismatch hota hai.',
              fix: 'File ko src/models/note.model.js me rakho aur require path same rakho.',
            },
            {
              problem: 'Error: Cannot find module "./src/app"',
              reason: 'server.js me require path galat hai.',
              fix: 'server.js me require("./src/app") use karo.',
            },
            {
              problem: 'Command not found / server not starting',
              reason: 'npx nodemon command me server.js ka spelling galat hai.',
              fix: 'Use: npx nodemon server.js (no space, correct spelling).',
            },
            {
              problem: 'TypeError: app.lisen is not a function',
              reason: 'listen word me spelling mistake hota hai.',
              fix: 'Use: app.listen(3000, () => { ... })',
            },
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

  const resolveImageSrc = (src) => {
    if (!src) {
      return src
    }
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
      return src
    }
    const base = import.meta.env.BASE_URL ?? '/'
    const normalized = src.startsWith('/') ? src.slice(1) : src
    return `${base}${normalized}`
  }

  if (!document) {
    return null
  }

  const fallbackImages = [
    {
      src: '/images/steps-flow.svg',
      alt: 'Step by step flow',
      caption: 'Follow the steps one by one for a clean setup.',
    },
    {
      src: '/images/doc-layout.svg',
      alt: 'Doc layout overview',
      caption: 'Read, run commands, and verify output.',
    },
  ]
  const images = document.images?.length
    ? document.images.length >= 2
      ? document.images
      : [...document.images, ...fallbackImages].slice(0, 2)
    : fallbackImages

  return (
    <article className="doc-viewer">
      <h2>{document.title}</h2>
      <p>{document.intro}</p>
      {document.download ? (
        <div className="doc-download">
          <a
            className="doc-download-btn"
            href={document.download.href}
            download={document.download.filename}
          >
            {document.download.label}
          </a>
        </div>
      ) : null}
      {images?.length ? (
        <>
          <h3>Visual Guide</h3>
          <div className="doc-image-grid">
            {images.map((image) => (
              <figure key={image.src} className="doc-image-card">
                <img src={resolveImageSrc(image.src)} alt={image.alt} loading="lazy" />
                {image.caption ? <figcaption>{image.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </>
      ) : null}
      {document.steps?.length ? (
        <>
          <h3>Steps</h3>
          <ol>
            {document.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </>
      ) : null}
      {document.commands?.length ? (
        <>
          <h3>Quick Snippets</h3>
          <div className="snippet-grid">
            {document.commands.map((command) => (
              <pre key={command}>
                <code>{command}</code>
              </pre>
            ))}
          </div>
        </>
      ) : null}

      {document.fileSnippets?.length ? (
        <>
          <h3>Project File Code</h3>
          <div className="file-snippet-grid">
            {document.fileSnippets.map((snippet) => (
              <section key={snippet.title} className="file-snippet">
                <h4>{snippet.title}</h4>
                <pre>
                  <code>{snippet.code}</code>
                </pre>
              </section>
            ))}
          </div>
        </>
      ) : null}

      {document.promptLines?.length ? (
        <>
          <h3>Professional Prompt Lines</h3>
          <ul>
            {document.promptLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </>
      ) : null}

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

      {document.commonErrors?.length ? (
        <>
          <h3>Common Errors (Quick Fix)</h3>
          <div className="table-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  <th>Problem</th>
                  <th>Reason</th>
                  <th>Fix</th>
                </tr>
              </thead>
              <tbody>
                {document.commonErrors.map((row) => (
                  <tr key={row.problem}>
                    <td>{row.problem}</td>
                    <td>{row.reason}</td>
                    <td>{row.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </article>
  )
}

const PageShell = ({ title, pageLabel, docs, activeDocId, onSelectDoc, children }) => {
  const activeDoc = docs.find((doc) => doc.id === activeDocId) ?? docs[0]

  return (
    <div className="layout">
      <Navbar pages={pages} />
      <div className="app-shell">
        <Sidebar
          pageLabel={pageLabel}
          docs={docs}
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
    '/backend': 'backend-env-setup',
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
