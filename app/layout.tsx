import { CssBaseline, CssVarsProvider, Link, Box } from '@mui/joy'
import InitColorSchemeScipt from '@mui/joy/InitColorSchemeScript'
import AppBar from '../components/AppBar/AppBar'
import AuthProvider from '../components/AuthProvider/AuthProvider'
import './global.scss'
import '@fontsource/inter'

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' type="image/x-icon" href='/images/logoHeartOnly.svg' />
        <title>RUmyValentine</title>
        <meta name='description' content='Find your Rutgers Valentine!' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Rutgers, RUMV, Valentine" />
      </head>
      <body>
        <Box id="wrapper">
        <AuthProvider>
          <InitColorSchemeScipt />
          <CssVarsProvider>
            <CssBaseline />
            <AppBar />
            <Box id="bumper"></Box>
            {children}
          </CssVarsProvider>
        </AuthProvider>
        </Box>
        <Box component="footer">
          <span><img src='/images/logoHeartOnly.svg' />&nbsp;Made with love in New Jersey |&nbsp; <Link href="/user-agreement">User Agreement</Link></span>
        </Box>
      </body>
    </html>
  )
}