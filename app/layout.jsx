import AppBar from '../components/AppBar'
import Providers from '../components/Providers'
import './global.scss'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}