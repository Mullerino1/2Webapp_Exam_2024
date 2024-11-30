
import Link from "next/link"

export default function Navigation() {

    return (
        <>
        <nav>
        <h1 >
          <Link href="/">FrontPage</Link>
        </h1>
        <ul className="flex gap-8" data-testid="nav">
          <li className="text-base font-semibold" data-testid="nav_courses">
            <Link href="/EventsPage">Kurs</Link>
          </li>
          <li className="text-base font-semibold" data-testid="nav_new">
            <Link href="/AttendPage">Attend</Link>
          </li>
        </ul>
      </nav>
      </>
    )
}