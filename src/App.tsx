import './global.css'

import { RouterProvider } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'

import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | comando.hub">
        <link
          rel="icon"
          type="image/png"
          href="/src/assets/images/favicon.png"
        />
      </Helmet>
      <Toaster expand={false} richColors />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
