
import Link from "next/link"

export default function Navigation() {

    return (
        <>
        <nav>
        <ul className="flex gap-8" data-testid="nav">
        <li>
          <Link href="/">FrontPage</Link>
        </li>
          <li>
            <Link href="/EventsPage">Events</Link>
          </li>
        
        </ul>
      </nav>
      </>
    )
}