ディレクトリ構成

code-campas/
├── README.md
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── .env.local
├── .env.example
├── .gitignore
│
├── public/
│ ├── favicon.ico
│ ├── logo.png
│ └── images/
│
├── src/
│ ├── app/
│ │ ├── globals.css
│ │ ├── layout.tsx # Root layout
│ │ ├── page.tsx # Home page
│ │ ├── loading.tsx # Global loading UI
│ │ ├── error.tsx # Global error UI
│ │ ├── not-found.tsx # 404 page
│ │ │
│ │ ├── (auth)/ # Route groups
│ │ │ ├── login/
│ │ │ │ └── page.tsx
│ │ │ ├── register/
│ │ │ │ └── page.tsx
│ │ │ └── layout.tsx # Auth specific layout
│ │ │
│ │ ├── dashboard/
│ │ │ ├── page.tsx # Student dashboard
│ │ │ ├── loading.tsx
│ │ │ └── layout.tsx
│ │ │
│ │ ├── materials/
│ │ │ ├── page.tsx # Materials list
│ │ │ ├── [slug]/
│ │ │ │ └── page.tsx # Individual material
│ │ │ └── layout.tsx
│ │ │
│ │ ├── admin/
│ │ │ ├── page.tsx # Admin dashboard
│ │ │ ├── users/
│ │ │ │ ├── page.tsx # User management
│ │ │ │ └── [id]/
│ │ │ │ └── page.tsx # User detail
│ │ │ ├── materials/
│ │ │ │ └── page.tsx # Material management
│ │ │ └── layout.tsx # Admin layout
│ │ │
│ │ └── api/ # API Routes
│ │ ├── auth/
│ │ │ ├── login/
│ │ │ │ └── route.ts
│ │ │ ├── register/
│ │ │ │ └── route.ts
│ │ │ └── logout/
│ │ │ └── route.ts
│ │ ├── users/
│ │ │ ├── route.ts # GET /api/users, POST /api/users
│ │ │ ├── [id]/
│ │ │ │ └── route.ts # GET/PUT/DELETE /api/users/:id
│ │ │ └── approve/
│ │ │ └── route.ts # POST /api/users/approve
│ │ ├── materials/
│ │ │ ├── route.ts
│ │ │ ├── [id]/
│ │ │ │ └── route.ts
│ │ │ └── sync/
│ │ │ └── route.ts # GitHub sync endpoint
│ │ ├── progress/
│ │ │ └── route.ts
│ │ └── webhook/
│ │ └── github/
│ │ └── route.ts # GitHub webhook handler
│ │
│ ├── components/ # React Components
│ │ ├── ui/ # shadcn/ui components
│ │ │ ├── button.tsx
│ │ │ ├── card.tsx
│ │ │ ├── input.tsx
│ │ │ ├── progress.tsx
│ │ │ ├── table.tsx
│ │ │ ├── toast.tsx
│ │ │ └── ...
│ │ │
│ │ ├── auth/ # Authentication components
│ │ │ ├── LoginForm.tsx
│ │ │ ├── RegisterForm.tsx
│ │ │ └── AuthGuard.tsx
│ │ │
│ │ ├── dashboard/ # Dashboard components
│ │ │ ├── ProgressCard.tsx
│ │ │ ├── RecentArticles.tsx
│ │ │ └── StatsOverview.tsx
│ │ │
│ │ ├── materials/ # Material related components
│ │ │ ├── MaterialList.tsx
│ │ │ ├── MaterialCard.tsx
│ │ │ ├── MaterialReader.tsx
│ │ │ ├── SearchBar.tsx
│ │ │ └── UnderstandingButton.tsx
│ │ │
│ │ ├── admin/ # Admin components
│ │ │ ├── UserTable.tsx
│ │ │ ├── ApprovalActions.tsx
│ │ │ ├── MaterialManager.tsx
│ │ │ └── SyncStatus.tsx
│ │ │
│ │ ├── common/ # Common/shared components
│ │ │ ├── Header.tsx
│ │ │ ├── Footer.tsx
│ │ │ ├── Sidebar.tsx
│ │ │ ├── LoadingSpinner.tsx
│ │ │ ├── ErrorMessage.tsx
│ │ │ └── Breadcrumbs.tsx
│ │ │
│ │ └── providers/ # Context providers
│ │ ├── AuthProvider.tsx
│ │ ├── ThemeProvider.tsx
│ │ └── ToastProvider.tsx
│ │
│ ├── lib/ # Utility libraries
│ │ ├── supabase.ts # Supabase client
│ │ ├── auth.ts # Authentication utilities
│ │ ├── github.ts # GitHub API utilities
│ │ ├── email.ts # Email utilities
│ │ ├── utils.ts # General utilities
│ │ ├── validations.ts # Zod schemas
│ │ └── constants.ts # App constants
│ │
│ ├── hooks/ # Custom React hooks
│ │ ├── useAuth.ts
│ │ ├── useProgress.ts
│ │ ├── useMaterials.ts
│ │ ├── useUsers.ts
│ │ └── useSupabase.ts
│ │
│ ├── types/ # TypeScript type definitions
│ │ ├── auth.ts
│ │ ├── user.ts
│ │ ├── material.ts
│ │ ├── progress.ts
│ │ ├── database.ts # Supabase generated types
│ │ └── api.ts
│ │
│ ├── store/ # State management (if needed)
│ │ ├── authStore.ts # Zustand store for auth
│ │ ├── materialStore.ts
│ │ └── progressStore.ts
│ │
│ ├── styles/ # Global styles
│ │ ├── globals.css
│ │ └── components.css
