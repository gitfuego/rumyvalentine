import StoreProvider from "../StoreProvider"

export default function Layout({ children }: {children: React.ReactNode}) {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  )
}