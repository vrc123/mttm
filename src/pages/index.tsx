import styles from '@/styles/pages/Home.module.css'
import Link from 'next/link'
import Button from '@/components/Button'

export default function Home() {
  return (
    <div className={styles.home}>
      <h1>My table tennis matches</h1>
      <p>Start analyzing now</p>
      <div>
        <Link href='/my-analyses/create'>
          <Button variant='primary' label='Create an analysis' />
        </Link>
        <Link href='/my-analyses'>
          <Button variant='secondary' label='My analyses' />
        </Link>
      </div>
    </div>
  )
}