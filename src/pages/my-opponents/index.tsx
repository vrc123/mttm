import styles from '@/styles/pages/MyAnalyses.module.css'
import { useState } from 'react'
import { supabase } from '../../../supabase-client'
import SearchField from '@/components/SearchField'

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

export default function MyAnalyses({ data }: Opponents) {

  const [query, setQuery] = useState('')

  return (
    <>
      <div className={styles.myAnalyses}>
            <h1>My opponents</h1>
            <p>Find your opponents</p>
            <SearchField placeholder='Search for an opponent' value={query} onChange={(e) => setQuery(e.target.value)} />
            {data.length != 0 && <div>
                {data.filter(((opponent) => {
                if (query.toLowerCase() === '') {
                    return data
                } else if (opponent.middleName == '') {
                    if((opponent.firstName.toLowerCase() + ' ' + opponent.lastName.toLowerCase()).includes(query.toLocaleLowerCase())) {
                        return data
                    }
                } else if (opponent.middleName != undefined) {
                    if((opponent.firstName.toLowerCase() + ' ' + opponent.middleName.toLowerCase() + ' ' + opponent.lastName.toLowerCase()).includes(query.toLocaleLowerCase())) {
                        return data
                    }
                }
            })).map((opponent) => {
                    return(
                        <div>
                            <p>Name: {opponent.firstName} {opponent.middleName} {opponent.lastName}</p>
                            <p>Country: {opponent.country}</p>
                            <p>Birthday: {opponent.country}</p>
                        </div>
                    )
                })}
            </div>}
      </div>
    </>
  )
}