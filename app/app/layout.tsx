"use client";
import './globals.css'
import { Noto_Sans } from 'next/font/google'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const noto = Noto_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '600', '500', '700', "800"]
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RecoilRoot>

      <html lang="en">
        <body className={noto.className}>{children}</body>
      </html>
    </RecoilRoot>
  )
}
