import { PropsWithChildren } from "react"
import Navigation from "./Navigation"


export default function Layout(props: PropsWithChildren) {
    const { children } = props

    return(
        <>
        <header>
            <Navigation/>
        </header>
        
        <main>
        {children}
        </main>
        <footer>

        </footer>
        
        </>
    )
}