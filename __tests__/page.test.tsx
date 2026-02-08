import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Page from '../app/page'

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
})

describe('Page', () => {
  it('renders a heading', () => {
    const client = createTestQueryClient()
    render(
      <QueryClientProvider client={client}>
        <Page />
      </QueryClientProvider>
    )
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})
