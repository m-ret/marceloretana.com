# marceloretana.com

Personal portfolio and blog website for Marcelo Retana — Software Engineer & Entrepreneur.

**Live Site:** [marceloretana.com](https://marceloretana.com)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PRODUCTION                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────┐         API Requests          ┌──────────────────┐   │
│   │                 │ ◄──────────────────────────── │                  │   │
│   │   Strapi CMS    │         (REST API)            │   Next.js App    │   │
│   │                 │ ────────────────────────────► │                  │   │
│   │  Strapi Cloud   │         JSON Response         │     Vercel       │   │
│   │                 │                               │                  │   │
│   └─────────────────┘                               └──────────────────┘   │
│          │                                                   │              │
│          │ PostgreSQL                                        │ CDN          │
│          ▼                                                   ▼              │
│   ┌─────────────────┐                               ┌──────────────────┐   │
│   │    Database     │                               │     Visitors     │   │
│   │   (Managed)     │                               │    (Browser)     │   │
│   └─────────────────┘                               └──────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### How It Works

1. **Next.js Frontend (Vercel)** - Static site with ISR (Incremental Static Regeneration)
   - Serves the portfolio landing page (static content)
   - Fetches blog posts from Strapi API at build time
   - Revalidates content periodically for fresh blog posts

2. **Strapi CMS (Strapi Cloud)** - Headless Content Management System
   - Provides REST API for blog content
   - Admin panel for managing blog posts, profile, and experiences
   - Handles media uploads and storage
   - PostgreSQL database for content persistence

3. **Data Flow**
   - Blog content is created/edited in Strapi Admin
   - Next.js fetches content via Strapi REST API
   - Pages are statically generated for fast loading
   - ISR ensures content stays fresh without full rebuilds

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Frontend | Next.js (App Router) | 15.x | React framework with SSG/ISR |
| CMS | Strapi | 5.x | Headless CMS for blog content |
| UI Components | shadcn/ui | latest | Accessible React components |
| Styling | Tailwind CSS | 4.x | Utility-first CSS framework |
| Language | TypeScript | 5.x | Type safety |
| Runtime | Bun | latest | Fast JavaScript runtime |
| Frontend Hosting | Vercel | - | Edge network, auto-scaling |
| CMS Hosting | Strapi Cloud | - | Managed Strapi infrastructure |
| Domain | Namecheap | - | DNS management |

---

## Project Structure

```
marceloretana.com/
├── frontend/                     # Next.js application
│   ├── app/
│   │   ├── page.tsx             # Landing page (static)
│   │   ├── blog/
│   │   │   ├── page.tsx         # Blog listing (fetches from Strapi)
│   │   │   └── [slug]/page.tsx  # Blog post (dynamic route)
│   │   ├── layout.tsx           # Root layout with ThemeProvider
│   │   └── globals.css          # Theme variables (dark/light mode)
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── sections/            # Page sections
│   │   │   ├── hero.tsx
│   │   │   ├── about.tsx
│   │   │   ├── experience.tsx
│   │   │   ├── testimonials.tsx
│   │   │   ├── contact.tsx
│   │   │   └── nav.tsx
│   │   ├── blog/                # Blog components
│   │   │   └── blocks-renderer.tsx
│   │   ├── theme-provider.tsx   # Dark/light mode context
│   │   └── theme-toggle.tsx     # Theme toggle button
│   ├── lib/
│   │   └── strapi.ts            # Strapi API client
│   ├── public/
│   │   └── profile.jpeg         # Static assets
│   └── .env.local               # Environment variables (gitignored)
│
├── cms/                          # Strapi CMS
│   ├── src/
│   │   ├── api/                 # Content type definitions
│   │   │   ├── blog-post/       # Blog post API
│   │   │   ├── experience/      # Experience API
│   │   │   └── profile/         # Profile API (single type)
│   │   └── admin/               # Admin panel customizations
│   ├── config/
│   │   ├── database.ts          # Database configuration
│   │   ├── server.ts            # Server configuration
│   │   └── middlewares.ts       # CORS, security, etc.
│   └── .env                     # Environment variables (gitignored)
│
├── .gitignore
├── package.json
└── README.md
```

---

## Environment Variables

### Understanding the Environment Setup

This project uses **separate environments** for frontend and CMS, each with their own secrets:

```
┌─────────────────────────────────────────────────────────────────┐
│                    ENVIRONMENT VARIABLES                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  FRONTEND (Next.js)              CMS (Strapi)                   │
│  ─────────────────               ───────────────                │
│  STRAPI_URL ◄─────────────────── Strapi Cloud URL               │
│  STRAPI_API_TOKEN ◄───────────── Generated in Strapi Admin      │
│                                                                  │
│                                  APP_KEYS (auto-generated)       │
│                                  API_TOKEN_SALT (auto-generated) │
│                                  JWT_SECRET (auto-generated)     │
│                                  ADMIN_JWT_SECRET (auto)         │
│                                  TRANSFER_TOKEN_SALT (auto)      │
│                                  DATABASE_* (auto on Cloud)      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Frontend Environment Variables

Create `frontend/.env.local`:

```env
# Strapi CMS Connection
# For local development, use localhost
# For production, use your Strapi Cloud URL
STRAPI_URL=https://your-project.strapiapp.com
NEXT_PUBLIC_STRAPI_URL=https://your-project.strapiapp.com

# API Token (created in Strapi Admin > Settings > API Tokens)
# Required for fetching content from Strapi
STRAPI_API_TOKEN=your-api-token-here
```

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `STRAPI_URL` | Strapi API base URL | Strapi Cloud Dashboard > Environments > Internal URL |
| `NEXT_PUBLIC_STRAPI_URL` | Same as above (client-side) | Same as above |
| `STRAPI_API_TOKEN` | API authentication token | Strapi Admin > Settings > API Tokens > Create |

### CMS Environment Variables

**Local Development** - Create `cms/.env`:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=random-salt-string
ADMIN_JWT_SECRET=random-secret-string
TRANSFER_TOKEN_SALT=random-salt-string
JWT_SECRET=random-secret-string
```

**Production (Strapi Cloud)** - Automatically configured:

Strapi Cloud auto-generates all required secrets. You don't need to set them manually.

---

## Syncing Secrets Between Environments

### Step-by-Step: Connecting Frontend to Strapi

#### 1. Get Strapi Cloud URL

```
Strapi Cloud Dashboard
  └── Your Project
      └── Settings
          └── Environments
              └── production
                  └── Internal URL: https://xxx.strapiapp.com  ← Copy this
```

#### 2. Create API Token in Strapi

```
Strapi Admin Panel (https://xxx.strapiapp.com/admin)
  └── Settings (gear icon)
      └── API Tokens
          └── Create new API Token
              ├── Name: "Frontend"
              ├── Token type: "Read-only"
              ├── Token duration: "Unlimited"
              └── Save → Copy token immediately (only shown once!)
```

#### 3. Add to Vercel Environment Variables

```
Vercel Dashboard
  └── Your Project
      └── Settings
          └── Environment Variables
              └── Add:
                  ├── STRAPI_URL = https://xxx.strapiapp.com
                  ├── NEXT_PUBLIC_STRAPI_URL = https://xxx.strapiapp.com
                  └── STRAPI_API_TOKEN = your-copied-token
```

#### 4. Redeploy

After adding environment variables, trigger a new deployment:
- Push a new commit, OR
- Go to Deployments > Redeploy

### Using Same Strapi for Local & Production

If you want local development to use production Strapi (same content everywhere):

```env
# frontend/.env.local
STRAPI_URL=https://your-project.strapiapp.com
NEXT_PUBLIC_STRAPI_URL=https://your-project.strapiapp.com
STRAPI_API_TOKEN=your-production-token
```

This means:
- Local and production frontends show same content
- Edit content in Strapi Cloud, see changes everywhere
- No need to run Strapi locally

---

## Content Types (Strapi)

### Blog Post
| Field | Type | Description |
|-------|------|-------------|
| title | String | Post title |
| slug | UID | URL-friendly identifier |
| content | Blocks | Rich text content |
| excerpt | Text | Short preview text |
| featuredImage | Media | Cover image |
| publishedAt | DateTime | Publication date |

### Experience
| Field | Type | Description |
|-------|------|-------------|
| company | String | Company name |
| role | String | Job title |
| description | Text | Role description |
| startDate | Date | Start date |
| endDate | Date | End date (null if current) |
| order | Integer | Display order |

### Profile (Single Type)
| Field | Type | Description |
|-------|------|-------------|
| name | String | Full name |
| tagline | String | Short bio |
| bio | Text | Full biography |
| profileImage | Media | Profile photo |
| email | Email | Contact email |
| linkedinUrl | String | LinkedIn profile |

---

## API Permissions

After deploying Strapi, configure public API access:

```
Strapi Admin
  └── Settings
      └── Users & Permissions Plugin
          └── Roles
              └── Public
                  └── Enable for each content type:
                      ├── blog-post: find, findOne
                      ├── experience: find, findOne
                      └── profile: find
```

This allows the frontend to fetch content without authentication for public data.

---

## Development

### Prerequisites

- [Bun](https://bun.sh/) (v1.0+)
- Node.js 18+ (for Strapi)
- Git

### Local Setup

```bash
# Clone repository
git clone https://github.com/m-ret/marceloretana.com.git
cd marceloretana.com

# Install frontend dependencies
cd frontend
bun install

# Install CMS dependencies (optional - only if running Strapi locally)
cd ../cms
bun install
```

### Running Locally

**Option A: Frontend only (using production Strapi)**

```bash
cd frontend
bun dev
# Open http://localhost:3000
```

**Option B: Full stack (local Strapi)**

```bash
# Terminal 1 - Strapi CMS
cd cms
bun develop
# Open http://localhost:1337/admin

# Terminal 2 - Frontend
cd frontend
bun dev
# Open http://localhost:3000
```

### Build

```bash
# Frontend
cd frontend
bun run build

# CMS (if self-hosting)
cd cms
bun run build
bun start
```

---

## Deployment

### Frontend → Vercel

1. **Connect Repository**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import `m-ret/marceloretana.com`
   - Set root directory: `frontend`

2. **Configure Environment Variables**
   - Add `STRAPI_URL`, `NEXT_PUBLIC_STRAPI_URL`, `STRAPI_API_TOKEN`

3. **Deploy**
   - Vercel auto-deploys on every push to `main`

4. **Custom Domain**
   - Settings > Domains > Add `marceloretana.com`
   - Configure DNS at Namecheap:
     - A Record: `@` → Vercel IP
     - CNAME: `www` → `cname.vercel-dns.com`

### CMS → Strapi Cloud

1. **Create Project**
   - Go to [cloud.strapi.io](https://cloud.strapi.io)
   - Create new project from GitHub
   - Set base directory: `cms`

2. **Environment Variables**
   - Auto-configured by Strapi Cloud

3. **Deploy**
   - Strapi Cloud auto-deploys on push

4. **Create Admin Account**
   - Visit your Strapi URL `/admin`
   - Create first admin user

5. **Generate API Token**
   - Settings > API Tokens > Create
   - Copy and add to Vercel

---

## Hosting Costs

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Hobby | Free |
| Strapi Cloud | Free | Free |
| Namecheap | Domain | ~$10/year |
| **Total** | | **~$10/year** |

### Strapi Cloud Free Tier Limits
- 10,000 API requests/month
- 10 GB storage & bandwidth
- 500 database entries
- Cold starts after inactivity

---

## Troubleshooting

### Blog shows "No posts yet"
1. Check Strapi is running and has content
2. Verify `STRAPI_URL` is correct in Vercel
3. Ensure API permissions are set (Public role)
4. Check API token is valid

### Strapi "Building" forever
- Check deploy logs in Strapi Cloud
- Free tier has cold starts - wait 30 seconds
- Verify base directory is `cms`

### SSL not working on custom domain
- DNS must show "Valid Configuration" in Vercel
- SSL is auto-provisioned after DNS validation
- Can take up to 24 hours for DNS propagation

### "Cannot find module" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules bun.lock
bun install
```

---

## License

MIT

---

## Author

**Marcelo Retana**
- Website: [marceloretana.com](https://marceloretana.com)
- Company: [GEXP Software](https://gexpsoftware.com)
- Email: marcelo@gexpsoftware.com
- LinkedIn: [linkedin.com/in/marceloretana](https://linkedin.com/in/marceloretana)
