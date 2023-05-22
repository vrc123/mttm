import styles from '@/styles/pages/MyOpponents.module.css'
import { useState } from 'react'
import { supabase } from '../../../supabase-client'
import SearchField from '@/components/SearchField'
import OpponentList from '@/components/OpponentList'
import Button from '@/components/Button'
import Link from 'next/link'

export async function getServerSideProps() {
  const { data } = await supabase
  .from("opponents")
  .select(`
    id,  
    firstName,
    middleName,
    lastName,
    country,
    birthday
  `)
  return {
    props: {
      data,
    },
  }
}

interface Opponent {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  country: string;
  birthday: string;
}

interface Opponents {
  data: Opponent[];
}

export default function MyOpponents({ data }: Opponents) {

  const [query, setQuery] = useState('')

  const [visibleOpponents, setVisibleOpponents] = useState(8);

  function showMoreOpponents() {
    setVisibleOpponents(visibleOpponents + 8);
  }

  let visibleData = data.slice(0, visibleOpponents)

  return (
    <>
      <div className={styles.myOpponents}>
            <h1>My opponents</h1>
            <p>Find your opponents</p>
            <SearchField placeholder='Search for an opponent' value={query} onChange={(e) => setQuery(e.target.value)} />
            {data.length != 0 && <OpponentList opponents={visibleData} query={query} />}
            {visibleData.length != data.length && <Button variant='secondary' label='Show more' onClick={showMoreOpponents} />}
            <p>Can't find the opponent you are looking for? <Link href='/my-opponents/add'>Click here</Link> to add a new opponent.</p>
      </div>
    </>
  )
}