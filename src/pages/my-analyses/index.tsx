import styles from '@/styles/pages/MyAnalyses.module.css'
import { useState } from 'react'
import { supabase } from '../../../supabase-client'
import SearchField from '@/components/SearchField'
import AnalysisList from '@/components/AnalysisList'
import Link from 'next/link'

export async function getServerSideProps() {
  const { data } = await supabase
  .from("analyses")
  .select(`
    id,
    date,
    opponents ( firstName, middleName, lastName, country, birthday),
    score
  `)
  return {
      props: {
          data,
      },
  }
}

interface Analysis {
  id: number;
  score: string;
  date: string;
  opponents: {
      id: number;
      firstName: string;
      middleName?: string;
      lastName: string;
      country: string;
      birthday: string;
  }
}

interface Analyses {
  data: Analysis[];
}

export default function MyAnalyses({ data }: Analyses) {

  const [query, setQuery] = useState('')

  return (
    <>
      <div className={styles.myAnalyses}>
          <h1>My analyses</h1>
          <p>Find your archived match analyses</p>
          <SearchField placeholder='Search for an opponent' value={query} onChange={(e) => setQuery(e.target.value)} />
          {data.length != 0 && <AnalysisList analyses={data} query={query} />}
          <p>Can't find the analysis you are looking for? <Link href='/my-analyses/create'>Click here</Link> to create a new analysis.</p>
      </div>
    </>
  )
}