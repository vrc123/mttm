import styles from '@/styles/components/Header.module.css'
import Link from 'next/link';
import NavLink from './NavLink';
import { useEffect, useState } from 'react';

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

  const [showNavLinks, setShowNavLinks] = useState(false)
  const [showIcon, setShowIcon] = useState(true)
  const [switchIcon, setSwitchIcon] = useState(false)

  useEffect(() => {
    
    if (screen.width <= 1024) {
      setShowNavLinks(true)
      setShowIcon(false)
    }

  }, [])


  function showLinks() {
    if (showNavLinks) {
      setShowNavLinks(false)
      setSwitchIcon(true)
    } else {
      setShowNavLinks(true)
      setSwitchIcon(false)
    }
  }

  return (
    <header className={styles.header}>
      <div className={`${!showIcon ? styles.menu : ''}`}>
        <Link href='/'>
          <h3>MTTM</h3>
        </Link>
        {!showIcon && <div className={styles.menuIcon} onClick={showLinks}>
          {!switchIcon && <div className={styles.menuIconOpen}>
            <div></div>
            <div></div>
            <div></div>
          </div>}
          {switchIcon && <div className={styles.menuIconClose}></div>}
        </div>}
      </div>
      {!showNavLinks && <nav>
        {navLinks.map((navLink) => {
          return (
            <NavLink key={navLink.id} {...navLink} />
          )
        })}
      </nav>}
    </header>
  )
}