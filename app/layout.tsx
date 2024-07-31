import { CssBaseline, CssVarsProvider } from '@mui/joy'
import AppBar from '../components/AppBar/AppBar'
import AuthProvider from '../components/AuthProvider/AuthProvider'
import './global.scss'
import '@fontsource/inter'

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en">
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