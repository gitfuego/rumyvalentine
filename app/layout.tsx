import { CssBaseline, CssVarsProvider } from '@mui/joy'
import AppBar from '../components/AppBar/AppBar'
import AuthProvider from '../components/AuthProvider/AuthProvider'
import './global.scss'
import '@fontsource/inter'

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' type="image/x-icon" href='/images/logoHeartOnly.svg' />
        <title>RUmyValentine?</title>
        <meta name='description' content='Find your Rutgers Valentine!' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Rutgers, RUMV, Valentine" />
      </head>
      <body>
        <div id="wrapper">
        <AuthProvider>
          <CssVarsProvider>
            <CssBaseline />
            <AppBar />
            <div id="bumper"></div>
            {children}
          </CssVarsProvider>
        </AuthProvider>
        </div>
      </body>
    </html>
  )
}