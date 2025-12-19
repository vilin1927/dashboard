# Marketing Dashboard

A modern React 18 dashboard built with Chakra UI for tracking campaign performance metrics.

## Features

- **KPI Cards**: Track Spend, Leads, CPL, and CTR with clean Chakra UI components
- **Interactive Charts**: Visualize spend over time with Recharts
- **Campaign Table**: View detailed campaign performance data
- **Filtering**: Filter by date range (clickable dropdown with presets), client dropdown, and clinic dropdown
- **Export**: Download data as PDF or CSV
- **Dark/Light Mode**: Toggle between themes using Chakra UI's color mode
- **Responsive Design**: Mobile-friendly with collapsible sidebar drawer

## Tech Stack

- React 18
- TypeScript
- Vite
- **Chakra UI v2** (clean, modern component library)
- Recharts for data visualization
- React Query for data fetching
- React Icons for icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── api/              # API functions and mock data
├── components/
│   ├── dashboard/    # Dashboard-specific components
│   ├── layout/       # Layout components (Header, Sidebar)
├── lib/              # Utility functions
├── types/            # TypeScript type definitions
└── theme.ts          # Chakra UI custom theme
```

## Key Changes

### Fixed Issues:
1. **Dropdown menus now work on click** - User menu and date range picker both open/close properly
2. **"All Clients" is now selectable** - The select dropdown allows selecting "All Clients" (empty value)

### Updated UI:
- Replaced Tailwind CSS with Chakra UI for cleaner, more maintainable code
- Horizon UI inspired design with rounded corners and modern aesthetics
- Better color scheme with brand colors
- Improved spacing and typography using Poppins font

## Configuration

### Mock Data

The app currently uses mock data for development. To connect to a real API:

1. Open [src/api/index.ts](src/api/index.ts)
2. Set `USE_MOCK_DATA = false`
3. Ensure your FastAPI backend is running at `/api`

### API Endpoints

Expected backend endpoints:
- `GET /api/clients` - List all clients with their clinics
- `GET /api/kpis?start_date&end_date&client_id&clinic_id` - Get aggregated KPIs
- `GET /api/campaign-summaries?...` - Get campaign summaries
- `GET /api/spend-over-time?...` - Get daily spend data

## Customization

- **Colors**: Edit [src/theme.ts](src/theme.ts) to change the brand colors
- **Components**: All components use Chakra UI's styling props for easy customization
- **Dark Mode**: Automatically supported via Chakra UI's `useColorMode` hook

## License

MIT
# dashboard
