# Quick Start Guide

## Development Server

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features Working Out of the Box

1. **Mock Data**: The dashboard loads with sample data automatically
2. **Dark/Light Mode**: Click the sun/moon icon in the header
3. **Responsive Sidebar**: Hamburger menu on mobile, permanent on desktop
4. **Filters**: Date range (Last 7/30/90 days), Client dropdown, Clinic dropdown
5. **Export**: PDF and CSV export buttons (functional)
6. **KPI Cards**: 4 cards showing Spend, Leads, CPL, CTR
7. **Line Chart**: Spend over time visualization
8. **Campaign Table**: Sortable campaign data with status badges

## Connecting to Real API

1. Set `USE_MOCK_DATA = false` in `src/api/index.ts`
2. Update `API_BASE` if needed (currently `/api`)
3. Ensure your FastAPI backend is running and accessible

## Folder Structure

```
src/
├── api/                    # API functions and mock data
│   ├── index.ts           # Main API functions
│   └── mock-data.ts       # Sample data for development
├── components/
│   ├── dashboard/         # Dashboard components
│   │   ├── dashboard.tsx  # Main dashboard container
│   │   ├── kpi-card.tsx   # KPI card component
│   │   ├── spend-chart.tsx # Chart component
│   │   ├── campaigns-table.tsx # Table component
│   │   └── filters.tsx    # Filter controls
│   ├── layout/            # Layout components
│   │   ├── header.tsx     # Top header with user menu
│   │   └── sidebar.tsx    # Collapsible sidebar
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
│   └── use-theme.tsx      # Dark/light mode hook
├── lib/                   # Utility functions
│   └── utils.ts           # Helper functions
└── types/                 # TypeScript types
    └── index.ts           # Type definitions
```

## Customization

- **Colors**: Edit [tailwind.config.js](tailwind.config.js)
- **KPIs**: Modify `src/types/index.ts` and update components
- **API endpoints**: Edit `src/api/index.ts`
- **Navigation**: Update `src/components/layout/sidebar.tsx`

## Build for Production

```bash
npm run build
npm run preview
```

Files will be in the `dist/` folder.
