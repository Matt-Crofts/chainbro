# Chain Brothers - Static Website

A modern, dark-themed single-page website built with vanilla HTML, CSS, and JavaScript.

## 🚀 GitHub Pages Deployment

### Option 1: Deploy from Root (Recommended)

1. **Create a new GitHub repository** named `chainbro` (or any name you prefer)

2. **Initialize git and push your files:**
   ```bash
   cd /Users/mfer/chainbro
   git init
   git add .
   git commit -m "Initial commit: Chain Brothers website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/chainbro.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select:
     - Branch: `main`
     - Folder: `/ (root)`
   - Click **Save**

4. **Access your site:**
   - Your site will be live at: `https://YOUR-USERNAME.github.io/chainbro/`
   - It may take 1-2 minutes for the first deployment

### Option 2: Deploy from /docs Folder

If you prefer to keep source files separate:

1. Create a `docs` folder and move all files there:
   ```bash
   mkdir docs
   mv index.html styles.css script.js docs/
   ```

2. Follow steps 2-4 above, but select `Folder: /docs` in GitHub Pages settings

## 📁 File Structure

```
chainbro/
├── index.html          # Main HTML structure
├── styles.css          # All styles (dark theme, glassmorphism, responsive)
└── script.js           # Parallax effects and smooth scrolling
```

## 🎨 Design Features

- **Dark Apple-inspired aesthetic** with soft purple/violet accents
- **Glassmorphism effects** on cards and dashboard mockup
- **Parallax scrolling** on hero section (respects prefers-reduced-motion)
- **Smooth anchor navigation** for internal links
- **Fully responsive** - mobile-first design (375px → 1920px+)
- **Accessibility-focused** - proper heading hierarchy, keyboard navigation, WCAG AA contrast

## 🛠 Customization

### Update Google Form Link

Replace the placeholder Google Form URL in `index.html`:

```html
<!-- Line 26 and Line 137 -->
<a href="https://forms.google.com" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
```

Replace `https://forms.google.com` with your actual Google Form URL.

### Color Scheme

Edit CSS variables in `styles.css` (lines 9-16):

```css
--color-bg-primary: #0a0e1a;
--color-accent-purple: #8b7cf6;
--color-accent-cyan: #60a5fa;
```

### Content Updates

All content is in `index.html`. Key sections:
- **Hero** (lines 17-58): Main headline and CTA
- **About** (lines 63-89): Three-column feature cards
- **Principles** (lines 94-125): Six principle items
- **Future** (lines 130-143): Forward-looking statement
- **Footer** (lines 149-158): Copyright and links

## 🧪 Testing Locally

Simply open `index.html` in a modern browser. No build tools required!

For a local server (optional):
```bash
# Python 3
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📧 Contact

Email: info@chainbrothers.com.au

---

Built with ❤️ by Chain Brothers | © 2025

