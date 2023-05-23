import {ReactNode} from "react";
import {Inter} from 'next/font/google'
import {Navbar} from "@/src/components";

const inter = Inter({subsets: ['latin']})


type Props = {
  children: ReactNode
}
export function Default({children}: Props) {
  return (
    <div className={`flex min-h-screen flex-col items-start justify-start p-24 ${inter.className}`}>
      <Navbar/>
      <main className={'py-4'}>
        {children}
      </main>
    </div>
  )
}