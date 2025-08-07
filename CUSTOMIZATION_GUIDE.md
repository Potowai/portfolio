# 🎨 Portfolio Customization Guide

This guide will help you transform this portfolio website from Alexis Fiolleau's original into your own personalized portfolio.

## 📋 Quick Checklist

- [ ] Update package.json with your info
- [ ] Update HTML meta tags and title
- [ ] Replace personal content in data files
- [ ] Update social media links
- [ ] Add your own projects
- [ ] Replace images and assets
- [ ] Update copyright headers
- [ ] Configure analytics (optional)
- [ ] Update README.md
- [ ] Test and deploy

## 🔧 Step-by-Step Customization

### 1. Basic Information

#### Update `package.json`
```json
{
  "name": "your-portfolio.com",
  "url": "https://your-portfolio.com",
  "description": "My creative portfolio website",
  "author": "Your Name",
  "email": "fiolleaua@gmail",
  "repository": "https://github.com/yourusername/your-portfolio.git",
  "homepage": "https://github.com/yourusername/your-portfolio"
}
```

#### Update `index.html` meta tags
- Change author, description, title
- Update Open Graph properties
- Replace keywords with your own

### 2. Personal Content

#### Update `src/data/texts.ts`
- **Intro Section**: Replace with your name and introduction
- **Contact Section**: Update with your email
- **About Section**: Write your own story, skills, and background

#### Update `src/data/social.ts`
- Replace all social media URLs with your own
- Add/remove platforms as needed
- Keep the same filename structure for icons

### 3. Projects

#### Update `src/data/projects.ts`
- Replace all projects with your own
- Use the provided template structure
- Add project images to `public/images/`
- Set `visible: false` to hide projects

**Project Template:**
```typescript
{
  name: "Your Project Name",
  image: "../../images/your-project.png",
  technologies: "React, TypeScript, etc.",
  summary: "Brief description",
  description: "Detailed description",
  repository: "https://github.com/yourusername/project",
  deployment: "https://your-project.com",
  video: "", // Optional
  visible: true,
}
```

### 4. Awards Section (Removed)

The awards section has been completely removed from the portfolio. If you want to add it back later, you would need to:
- Create `src/data/awards.ts` with award data
- Create `src/sections/awards/` folder with Awards.ts and awards.scss
- Add the awards section back to the HTML structure
- Import and call the awards function in main.ts

### 5. Assets & Images

#### Replace Images
- **Favicon**: `public/assets/icons/favicon.ico`
- **Project Images**: Add to `public/images/`
- **Screenshots**: Update `screenshots/` folder
- **Social Icons**: Icons are in `public/assets/icons/social/`

#### Update Screenshots
- Take new screenshots of your customized site
- Replace files in `screenshots/` folder
- Update README.md with new screenshots

### 6. Styling & Colors

#### Color Palette (`src/data/colors.ts`)
- The site uses a predefined color palette
- You can modify colors to match your brand
- Colors are referenced by index (0-6)

### 7. Analytics (Optional)

#### Google Analytics
- Create a `.env` file in the root
- Add: `VITE_GA_TRACKING_ID=your-ga-tracking-id`
- The site will automatically use your analytics

### 8. Copyright & Legal

#### Update Copyright Headers
- All files have been updated with placeholder copyright
- Replace "Your Name" and "fiolleaua@gmail" globally
- The AGPL-3.0 license requires you to keep source code public

### 9. README & Documentation

#### Update `README.md`
- Replace all references to Alexis Fiolleau
- Update project description and features
- Add your own screenshots
- Update contact information
- Remove awards section if not applicable

### 10. Final Steps

#### Test Everything
```bash
npm run dev
```
- Check all sections load correctly
- Verify all links work
- Test responsive design
- Validate project images load

#### Deploy
- Push to your GitHub repository
- Deploy to Vercel, Netlify, or your preferred platform
- Update domain in package.json and meta tags

## 🎯 Key Files to Customize

### Essential Files:
- `package.json` - Basic project info
- `index.html` - Meta tags and title
- `src/data/texts.ts` - All personal text content
- `src/data/social.ts` - Social media links
- `src/data/projects.ts` - Your projects
- `README.md` - Project documentation

### Optional Files:
- `src/data/colors.ts` - Color palette
- `.env` - Analytics configuration

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 💡 Tips

1. **Start Small**: Begin with basic info and gradually add projects
2. **Images**: Optimize images for web (WebP format recommended)
3. **Content**: Keep descriptions concise but informative
4. **Testing**: Test on different devices and browsers
5. **SEO**: Update meta tags for better search visibility

## 🆘 Need Help?

- Check the original documentation in README.md
- Review the TypeScript interfaces for data structure
- Look at the existing examples in data files
- Test changes incrementally

## 📜 License Note

This project uses AGPL-3.0 license, which means:
- You must keep your source code public
- Any modifications must also be open source
- You must include the license notice
- Commercial use is allowed but with restrictions

Make sure you understand and comply with the license terms!