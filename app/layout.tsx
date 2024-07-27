import { CssVarsProvider } from '@mui/joy';
import AppBar from '../components/AppBar/AppBar'
import AuthProvider from '../components/AuthProvider/AuthProvider'
import './global.scss'
import '@fontsource/inter';




export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <title>RU my Valentine</title>
        <link rel="icon" href="/images/logoHeartOnly.svg" />
      </head>
      <body>
        <CssVarsProvider>
          <AuthProvider>
            <AppBar />
            {children}
          </AuthProvider>
        </CssVarsProvider>
      </body>
    </html>
  )
}