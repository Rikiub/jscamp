# AGENTS.md

This document outlines essential information for agents working in this repository.

## Project Type

This is a modern web project built with:
- **Framework**: React
- **Language**: TypeScript
- **Build Tool**: Vite (using `npm:rolldown-vite`)
- **Package Manager**: pnpm (implied by `pnpm-lock.yaml`)
- **Styling**: CSS Modules (`.module.css`) and global CSS (`base.css`, `theme.css`)
- **Routing**: React Router

## Essential Commands

The following commands are available via `pnpm run` (or `npm run`):

- `pnpm run dev`: Starts the development server with Vite.
- `pnpm run build`: Builds the project for production, first compiling TypeScript then using Vite.
- `pnpm run format`: Formats the entire codebase using Biome.
- `pnpm run lint`: Lints the entire codebase using Biome and automatically fixes issues.
- `pnpm run preview`: Serves the production build locally for previewing.

**Note**: No explicit test commands were found in `package.json`.

## Code Organization

The codebase follows a clear structure:

- `src/app/`: Contains core application logic:
    - `app.tsx`: Main application component.
    - `routes.tsx`: Defines application routes using `react-router`.
    - `layout/`: Reusable layout components (e.g., `MainLayout`).
    - `styles/`: Global CSS files (`base.css`, `theme.css`).
- `src/pages/`: Organizes distinct application pages. Each page resides in its own subdirectory (e.g., `src/pages/index`, `src/pages/empleos`, `src/pages/detalles`, `src/pages/404`).
    - Each page subdirectory typically contains an `index.tsx` for the page component and `styles.module.css` for scoped styles.
- `src/features/`: Contains feature-specific logic.
    - `jobs/`: Example feature for job management, including types (`types.ts`), custom hooks (`useJobs.tsx`, `useTags.tsx`), and utility functions (`utils/mapper.ts`).
- `src/components/`: Houses reusable UI components:
    - `ui/`: Generic, atomic UI components (e.g., `Button`, `Input`, `Select`).
    - `layout/`: Components related to overall page structure (e.g., `Header`, `Footer`).

## Naming Conventions and Style Patterns

- **Formatting and Linting**: The project uses [Biome](https://biomejs.dev/) for code formatting and linting. Agents should adhere to the rules enforced by Biome.
    - Run `pnpm run format` to automatically format code.
    - Run `pnpm run lint` to lint and automatically fix issues.
- **Component Naming**: React components are typically named in PascalCase.
- **File Naming**:
    - Page components: `index.tsx` within their respective page directories.
    - Custom hooks: Start with `use` (e.g., `useJobs.tsx`).
    - Utility files: Descriptive names (e.g., `mapper.ts`).
- **Styling**: CSS Modules are used for component-level styling, indicated by `.module.css` files. Global styles are in `src/app/styles/`.

## Data Fetching and State Management

- **Data Fetching**: Data is fetched using the native `fetch` API.
    - Custom hooks (e.g., `useJobsAll` in `src/features/jobs/useJobs.tsx`) encapsulate data fetching logic, often using `useEffect` and `useState` for managing loading, error, and data states.
    - `URLSearchParams` are used for constructing API query parameters.
- **Data Transformation**: Raw API responses are often transformed into application-specific types using mapper functions (e.g., `convertRawJob`, `convertRawJobsAll` in `src/features/jobs/utils/mapper.ts`).
- **State Management**: React's `useState` hook is used for local component state and for managing the state of fetched data (loading, error, data).

## Routing

- The application uses `react-router` for navigation.
- Routes are defined in `src/app/routes.tsx` using `createBrowserRouter`.
- Dynamic routes (e.g., `/empleos/:id`) are supported, and `loader` functions can be used to fetch data before rendering the route component.
- A `MainLayout` component wraps most application routes.
- A `NotFound` page is configured for unmatched routes.
