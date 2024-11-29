import { Navigation } from "./Navigation"
import Footer from "./Footer"
import { PropsWithChildren } from "react"
import "../styles/tailwind/main.css";


type LayoutProps = PropsWithChildren

export default function Layout(props: LayoutProps) {
    const { children } = props
    return(
        <>
         <div
      className="mx-auto grid min-h-screen w-full max-w-7xl grid-rows-[auto_minmax(900px,_1fr)_30px]"
      data-testid="layout"
    >
        <header>
            <Navigation />
        </header>
        <main className="h-full">
            {children}
        </main>
        <Footer />
        </div>
        </>
    )
}