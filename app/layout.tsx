import AppBar from '../components/AppBar/AppBar'
import AuthProvider from '../components/AuthProvider/AuthProvider'
import './global.scss'

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AppBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}