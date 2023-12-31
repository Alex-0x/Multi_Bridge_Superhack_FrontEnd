import "bootstrap/dist/css/bootstrap.min.css";
import { Providers } from './providers'


export const metadata = {
  title: 'multi_bridge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
