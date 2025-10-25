# 🕐 Clock Dashboard

A beautiful, customizable clock dashboard built with Next.js and React that displays multiple time zones with analog and digital clocks.

## ✨ Features

- **Multiple Time Zones**: Display clocks for different time zones simultaneously
- **Analog & Digital Clocks**: Beautiful SVG-based analog clocks with digital time display
- **Add/Remove Clocks**: Easily add or remove clocks for any timezone
- **Custom Labels**: Give each clock a custom name
- **Dark Mode**: Toggle between light and dark themes
- **Real-time Updates**: All clocks update every second
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Built with TailwindCSS for a sleek, modern interface

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd clock-dashboard
```

Or if you already have the project, navigate to the project directory.

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Usage

### Adding a Clock

1. Select a timezone from the dropdown menu
2. (Optional) Enter a custom label for the clock
3. Click the "Add Clock" button

### Removing a Clock

Click the trash icon (🗑️) in the top-right corner of any clock card

### Toggling Dark Mode

Click the sun/moon icon in the top-right corner of the page

## 🌍 Available Time Zones

- New York (EST)
- Los Angeles (PST)
- Chicago (CST)
- London (GMT)
- Paris (CET)
- Tokyo (JST)
- Shanghai (CST)
- Dubai (GST)
- Sydney (AEDT)
- Auckland (NZDT)

## 🛠️ Built With

- **[Next.js 16](https://nextjs.org/)** - React framework
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[TailwindCSS 4](https://tailwindcss.com/)** - Styling
- **[Lucide React](https://lucide.dev/)** - Icons
- **[date-fns](https://date-fns.org/)** - Date formatting
- **[date-fns-tz](https://github.com/marnusw/date-fns-tz)** - Timezone support

## 📁 Project Structure

```
clock-dashboard/
├── app/
│   ├── components/
│   │   ├── Clock.tsx          # Individual clock component
│   │   └── ClockDashboard.tsx # Main dashboard component
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── public/                    # Static assets
├── package.json
└── README.md
```

## 🎨 Customization

You can customize the application by:

- Adding more timezones to the `POPULAR_TIMEZONES` array in `ClockDashboard.tsx`
- Modifying the color scheme in the Tailwind classes
- Adjusting the clock hand styles in `Clock.tsx`
- Changing the default clocks that appear on first load

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📄 License

ISC
