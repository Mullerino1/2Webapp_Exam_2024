import { PropsWithChildren } from "react"
import Navigation from "./Navigation"
import Footer from "@/components/Footer"


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
        <Footer/>
        
        </>
    )
}