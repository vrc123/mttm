import styles from '@/styles/pages/MyAnalyses.module.css'
import { useState } from 'react'
import { supabase } from '../../../supabase-client'
import SearchField from '@/components/SearchField'
import AnalysisList from '@/components/AnalysisList'

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
          <p>Find your archived matches</p>
          <SearchField placeholder='Search for an opponent' value={query} onChange={(e) => setQuery(e.target.value)} />
          {data.length != 0 && <AnalysisList analyses={data} query={query} />}
      </div>
    </>
  )
}