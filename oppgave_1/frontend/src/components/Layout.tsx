import { Navigation } from "./Navigation"
import Footer from "./Footer"

export default function Layout () {
    return (
        <>
        <div
      className="mx-auto grid min-h-screen w-full max-w-7xl grid-rows-[auto_minmax(900px,_1fr)_30px]"
      data-testid="layout"
    >
        <header>
        <Navigation/>
        </header>
        <main className="h-full">
        <p>Siden er tom</p>
        
        </main>
        <Footer/>
        </div>

        </>
    )
}

