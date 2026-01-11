# marceloretana.com

Personal portfolio and blog website for Marcelo Retana — Software Engineer & Entrepreneur.

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | Next.js (App Router) | 15.x |
| CMS | Strapi | 5.x |
| UI Components | shadcn/ui | latest |
| Styling | Tailwind CSS | 4.x |
| Language | TypeScript | 5.x |
| Runtime | Bun | latest |

## Project Structure

```
marceloretana.com/
├── frontend/                 # Next.js application
│   ├── app/
│   │   ├── page.tsx         # Landing page
│   │   ├── blog/            # Blog pages
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Global styles & theme variables
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── sections/        # Page sections (Hero, About, Experience, etc.)
│   │   ├── blog/            # Blog components
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   └── lib/
│       └── strapi.ts        # Strapi API client
│
└── cms/                      # Strapi CMS
    ├── src/
    │   ├── api/             # Content type APIs
    │   └── admin/           # Admin customizations
    └── config/              # Strapi configuration
```

## Features

- **Dark/Light Mode** — Toggle with localStorage persistence
- **Responsive Design** — Mobile-first approach
- **Blog with CMS** — Strapi-powered content management
- **Modern UI** — Clean, minimalist Lyon & Lyon inspired design
- **Smooth Animations** — Subtle transitions and hover effects
- **SEO Ready** — Meta tags and Open Graph support

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0+)
- Node.js 18+ (for Strapi)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/m-ret/marceloretana.com.git
   cd marceloretana.com
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   bun install
   ```

3. **Install CMS dependencies**
   ```bash
   cd ../cms
   bun install
   ```

4. **Set up environment variables**

   Frontend (`frontend/.env.local`):
   ```env
   STRAPI_URL=http://localhost:1337
   STRAPI_API_TOKEN=your-api-token
   ```

   CMS (`cms/.env`):
   ```env
   HOST=0.0.0.0
   PORT=1337
   APP_KEYS=your-app-keys
   API_TOKEN_SALT=your-salt
   ADMIN_JWT_SECRET=your-secret
   TRANSFER_TOKEN_SALT=your-salt
   JWT_SECRET=your-secret
   ```

### Development

Run both servers concurrently:

```bash
# Terminal 1 - Frontend (http://localhost:3000)
cd frontend
bun dev

# Terminal 2 - Strapi CMS (http://localhost:1337/admin)
cd cms
bun develop
```

### Build

```bash
# Frontend
cd frontend
bun run build

# CMS
cd cms
bun run build
```

## Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set root directory to `frontend`
4. Add environment variables
5. Deploy

### CMS (Strapi Cloud)

1. Create account at [Strapi Cloud](https://cloud.strapi.io)
2. Import project from GitHub
3. Set root directory to `cms`
4. Configure environment variables
5. Deploy

## Content Types (Strapi)

- **Blog Post** — title, slug, content, excerpt, featuredImage, publishedAt
- **Profile** — bio, tagline, profileImage (Single Type)
- **Experience** — company, role, startDate, endDate, description, order

## Sections

| Section | Description |
|---------|-------------|
| Hero | Introduction with profile image and ventures |
| About | Bio, approach, ventures, skills, and clients |
| Experience | Work history timeline |
| Testimonials | Client reviews from Clutch & Google |
| Contact | Newsletter, location, social links, footer |

## License

MIT

## Author

**Marcelo Retana**
- Website: [marceloretana.com](https://marceloretana.com)
- Company: [GEXP Software](https://gexpsoftware.com)
- Email: marcelo@gexpsoftware.com
