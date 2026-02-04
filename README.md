# Interactive 3D Portfolio

**By Enea Nushi** | Software Engineer & Full Stack Developer

*An immersive, interactive 3D portfolio experience built with modern web technologies*

---

## 📖 Description

An innovative portfolio website featuring a fully navigable 3D environment where visitors can explore your professional experience, projects, and contact information through an interactive game-like interface. Built with React, TypeScript, and Three.js, this portfolio stands out with its immersive design, smooth animations, and comprehensive SEO optimization.

**Key Highlights:**
- 🎮 Walk around a 3D arena as an animated character
- 🏢 Interactive stations displaying work experience, projects, and contact info
- 📱 Fully responsive with mobile touch controls
- 🔍 SEO-optimized with structured data and social media previews
- ⚡ Fast performance with Vite build system

---

## 🛠️ Technologies Used

### Languages
- **TypeScript** - Primary language with full type safety
- **JavaScript** - Runtime language
- **HTML5** - Semantic markup
- **CSS3** - Styling and animations

### Frameworks & Libraries
| Library | Version | Purpose |
|---------|---------|---------|
| React | 18.3.1 | UI framework |
| Three.js | 0.160.0 | 3D rendering engine |
| React Three Fiber | 8.15.0 | React renderer for Three.js |
| @react-three/drei | 9.95.0 | Useful Three.js helpers |
| React Router DOM | 7.13.0 | Client-side routing |
| Framer Motion | 10.18.0 | UI animations |
| Zustand | 4.4.7 | State management |
| Tween.js | 25.0.0 | Animation tweening |

### Build Tools & Development
| Tool | Version | Purpose |
|------|---------|---------|
| Vite | 5.0.8 | Build tool & dev server |
| TypeScript | 5.3.3 | Type checking |
| @vitejs/plugin-react | 4.2.1 | React plugin for Vite |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** for cloning the repository

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/eneanushi/3D_Portfolio.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd 3D_Portfolio
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)
   - The portfolio should load with the interactive 3D environment

### Build Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |

---

## 🎨 Customization Guide

To transform this portfolio with your own information, update the following configuration files. All content is centralized for easy customization.

### Personal Information & Content

| File | Purpose |
|------|---------|
| `src/content/config.ts` | Global identity (name, initials, email, social links, copyright) |
| `src/content/home.ts` | Home page content and taglines |
| `src/content/stations.ts` | Work experience, projects, and contact data for arena |
| `src/content/resume.ts` | Resume page content (experience, education, skills) |
| `src/content/contact.ts` | Contact page content and links |
| `src/content/arena.ts` | Arena UI text and keyboard controls |

### SEO Configuration

| File | Purpose |
|------|---------|
| `src/content/seo/keywords.ts` | Target keywords for search optimization |
| `src/content/seo/metadata.ts` | Page titles, descriptions, and meta tags |
| `src/content/seo/structured-data.ts` | JSON-LD schemas for rich search results |
| `src/content/seo/social-media.ts` | Open Graph and Twitter Card settings |

> 📚 For detailed SEO customization instructions, see [`src/content/seo/README.md`](src/content/seo/README.md)

### HTML & Domain Configuration

| File | Purpose |
|------|---------|
| `index.html` | Meta tags, Open Graph, structured data (update domain) |
| `public/robots.txt` | Search engine crawling rules (update domain) |
| `public/sitemap.xml` | Page index for search engines (update domain) |
| `public/manifest.json` | PWA configuration |

---

## 📁 Required Asset Updates

When personalizing this portfolio, replace these files with your own:

### 1. Resume / CV

| Property | Value |
|----------|-------|
| **Location** | `public/documents/Resume.pdf` |
| **Instructions** | Replace with your own PDF resume |
| **Important** | Keep the exact filename `Resume.pdf` |
| **Note** | File is referenced in resume page download button |

### 2. Favicon

| Property | Value |
|----------|-------|
| **Location** | `public/favicon/favicon.png` |
| **Instructions** | Replace with your own favicon/logo |
| **Important** | Keep the exact filename `favicon.png` |
| **Recommended Size** | 512×512 pixels (PNG format) |
| **Note** | Appears in browser tabs and bookmarks |

### 3. Social Media Preview Image

| Property | Value |
|----------|-------|
| **Location** | `public/favicon/Graph_Image.png` |
| **Instructions** | Replace with your own preview image |
| **Important** | Keep the exact filename `Graph_Image.png` |
| **Recommended Size** | 1200×630 pixels (PNG format) |
| **Note** | Displayed when sharing links on social media (Facebook, LinkedIn, Twitter, WhatsApp, Discord, Slack) |

---

## 🎮 Features

### Interactive 3D Environment
- Navigate a character through a minimalist 3D arena
- Smooth third-person camera with damping
- Proximity-based station interactions

### Three Interactive Stations
- **Work Station** (West) - Professional experience
- **Projects Station** (North) - Portfolio showcase
- **Contact Station** (East) - Contact information

### Multiple Pages
- **Home** - Elegant entry screen with 3D Lucy statue
- **About** - Personal introduction
- **Arena** - Interactive 3D portfolio exploration
- **Resume** - Professional resume with PDF download
- **Contact** - Contact information with Tokyo 3D scene

### Controls

| Key | Action |
|-----|--------|
| W | Walk forward |
| S | Walk backward |
| A | Strafe left |
| D | Strafe right |
| Shift | Hold to run |
| H | Toggle controls panel |
| E | Interact with station |
| ESC | Close UI panels |

> **Note**: On mobile devices, use the on-screen joystick and buttons for navigation.

---

## 📂 Project Structure

```
3D_Portfolio/
├── public/
│   ├── documents/           # PDF files (Resume.pdf)
│   ├── favicon/             # Favicon and OG images
│   ├── models/3d-models/    # 3D model files (.glb, .ply)
│   ├── textures/images/     # Texture files (.jpg, .png)
│   ├── robots.txt           # Search engine rules
│   ├── sitemap.xml          # Page index
│   └── manifest.json        # PWA manifest
│
├── src/
│   ├── components/
│   │   ├── camera/          # Third-person camera system
│   │   ├── character/       # Character model and controller
│   │   ├── environment/     # Arena, stations, lighting
│   │   ├── scene/           # 3D scene components
│   │   └── ui/              # UI overlays and pages
│   │
│   ├── content/             # ⭐ All customizable content
│   │   ├── seo/             # SEO configuration
│   │   ├── config.ts        # Global settings
│   │   ├── home.ts          # Home page content
│   │   ├── stations.ts      # Work/Projects/Contact data
│   │   ├── resume.ts        # Resume content
│   │   ├── contact.ts       # Contact page content
│   │   └── arena.ts         # Arena UI content
│   │
│   ├── hooks/               # Custom React hooks
│   ├── stores/              # Zustand state management
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Constants and helpers
│   └── styles/              # Global CSS styles
│
├── index.html               # HTML entry point with SEO tags
├── ASSETS.md                # Third-party asset credits
├── LICENSE                  # CC BY-NC 4.0 license
└── README.md                # This file
```

---

## 🌐 Deployment

This portfolio is configured for deployment on:

- **Vercel** - `vercel.json` included
- **Netlify** - `netlify.toml` and `public/_redirects` included

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

> **Important**: After deployment, update your domain in:
> - `index.html` (canonical URL, OG tags, structured data)
> - `src/content/seo/metadata.ts` (siteUrl, domain)
> - `public/robots.txt` (Sitemap URL, Host)
> - `public/sitemap.xml` (all page URLs)

---

## 🔍 SEO Features

This portfolio includes comprehensive SEO optimization:

- ✅ Semantic HTML with proper heading hierarchy
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags for social media previews
- ✅ Twitter Card meta tags
- ✅ JSON-LD structured data (Person, WebSite, BreadcrumbList)
- ✅ XML sitemap
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ PWA manifest

---

## 📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for the full license text:

> MIT-License  
> Copyright \<2026\> \<Enea Nushi\>  
>  
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  
>  
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.  
>  
> THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## 🙏 Asset Credits

This project uses third-party 3D assets. See [ASSETS.md](ASSETS.md) for full attribution details.

**3D Models from Three.js Examples:**
- Lucy Statue (Home page)
- LittlestTokyo (Contact page)
- Soldier character (Arena)

All Three.js example assets are under the MIT License.

---

## 💻 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Recommended |
| Firefox | ✅ Supported |
| Safari | ✅ Supported |
| Edge | ✅ Supported |

> **Requirements**: WebGL support required for 3D rendering.

---

## 📧 Contact

**Enea Nushi**

- 🌐 Website: [www.eneanushi.space](https://www.eneanushi.space)
- 💼 LinkedIn: [linkedin.com/in/enea-nushi](https://www.linkedin.com/in/enea-nushi/)
- 🐙 GitHub: [github.com/eneanushi](https://github.com/eneanushi)
- 📧 Email: nushienea3@gmail.com

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⭐ Acknowledgments

- [Three.js](https://threejs.org/) - 3D graphics library
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React renderer for Three.js
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Zustand](https://github.com/pmndrs/zustand) - State management

---

<p align="center">
  Made with ❤️ by <a href="https://www.eneanushi.space">Enea Nushi</a>
</p>
