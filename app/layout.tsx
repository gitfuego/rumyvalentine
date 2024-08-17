import { CssBaseline, CssVarsProvider } from '@mui/joy'
import AppBar from '../components/AppBar/AppBar'
import AuthProvider from '../components/AuthProvider/AuthProvider'
import './global.scss'
import '@fontsource/inter'

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' type="image/x-icon" href='/images/rumvLogoOnly.svg' />
      </head>
      <body>
        <div id="wrapper">
        <AuthProvider>
          <CssVarsProvider>
            <CssBaseline />
            <AppBar />
            {children}
          </CssVarsProvider>
        </AuthProvider>
        </div>
      </body>
    </html>
  )
}