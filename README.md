# Hybrid Portfolio (Next.js Edition)

A modern, interactive portfolio application built with **Next.js 15**, featuring a hybrid design that combines a structured **Bento Grid**, minimalist typography, and immersive **3D WebGL experiences**.

![Portfolio Preview](/public/images/logos/nextjs.svg) 
*(Note: Replace with an actual screenshot)*

## ✨ Key Features

- **Hybrid Design**: Merges rigid grid layouts with fluid interactive elements.
- **Bento Grid System**: Responsive, modular tile layout using CSS Grid.
- **3D Experiences**:
  - **Interactive Hero**: A playable 3D character scene using React Three Fiber.
  - **Infinite Menu**: A WebGL-based infinite 3D scroll for browsing projects.
  - **Dome Gallery**: An alternative spherical project viewer.
- **Magic UI**: "Electric" borders, Aurora backgrounds, and glassmorphism effects.
- **Minimalist Typography**: Clean, editorial aesthetic using the Geist font family.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, SCSS Modules (for specific 3D styles)
- **3D**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Drei](https://github.com/pmndrs/drei), [React Bits](https://reactbits.dev/)
- **Animation**: Framer Motion (implied usage in some components)

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    bun install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open locally**: Visit [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```text
src/app/
├── components/
│   ├── grid/          # Layout components (BentoGrid, Tile)
│   ├── three/         # 3D scenes (HeroScene, Duck)
│   ├── react-bits/    # Specialized UI effects (InfiniteMenu, LogoLoop)
│   └── content/       # Modular content tiles
├── data/              # Static content (projects.ts, texts.ts)
├── globals.css        # Global styles & Tailwind directives
└── page.tsx           # Main entry point
```

## 🎨 Customization

- **Projects**: Edit `src/app/data/projects.ts` to update your work history.
- **Bio & Text**: Update `src/app/data/texts.ts`.
- **Logos**: Add new svg/png icons to `public/images/logos/`.

---

*Built with ❤️ using Next.js and React Three Fiber.*
