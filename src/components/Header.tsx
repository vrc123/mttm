import styles from '@/styles/components/Header.module.css'
import Link from 'next/link';
import NavLink from './NavLink';

const navLinks = [
  {
    id: 1,
    text: 'Home',
    href: '/'
  },{
    id: 2,
    text: 'My opponents',
    href: '/my-opponents'
  },{
    id: 3,
    text: 'My analyses',
    href: '/my-analyses'
  },{
    id: 4,
    text: 'Create an analysis',
    href: '/my-analyses/create'
  },
]

export default function Header() {

  return (
    <header className={styles.header}>
      <Link href='/'>
        <h3>MTTM</h3>
      </Link>
      <nav>
        {navLinks.map((navLink) => {
          return (
            <NavLink key={navLink.id} {...navLink} />
          )
        })}
      </nav>
    </header>
  )
}