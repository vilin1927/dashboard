# Marketing Dashboard

A modern React 18 dashboard for tracking campaign performance metrics.

## Features

- **KPI Cards**: Track Spend, Leads, CPL, and CTR at a glance
- **Interactive Charts**: Visualize spend over time with Recharts
- **Campaign Table**: View detailed campaign performance data
- **Filtering**: Filter by date range, client, and clinic
- **Export**: Download data as PDF or CSV
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Mobile-friendly with collapsible sidebar

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Recharts for data visualization
- React Query for data fetching
- Lucide React for icons

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
│   └── ui/           # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── types/            # TypeScript type definitions
```

## Configuration

### Mock Data

The app currently uses mock data for development. To connect to a real API:

1. Open `src/api/index.ts`
2. Set `USE_MOCK_DATA = false`
3. Ensure your FastAPI backend is running at `/api`

### API Endpoints

Expected backend endpoints:
- `GET /api/clients` - List all clients with their clinics
- `GET /api/kpis?start_date&end_date&client_id&clinic_id` - Get aggregated KPIs
- `GET /api/campaign-summaries?...` - Get campaign summaries
- `GET /api/spend-over-time?...` - Get daily spend data

## Backend Integration

This dashboard is designed to connect to a FastAPI backend that queries BigQuery. The backend should handle:

- Data aggregation from BigQuery
- Date range filtering
- Client/clinic filtering
- KPI calculations

## License

MIT
