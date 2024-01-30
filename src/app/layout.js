import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google'
import './globals.css'
import TopNavbar from './components/TopNavBar/TopNavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Eustakwiat',
  description: 'Najlepsza kwiaciarnia z dostawą do domu!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopNavbar></TopNavbar>
        {children}
      </body>
    </html>
  )
}
