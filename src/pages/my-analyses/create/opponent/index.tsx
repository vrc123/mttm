import styles from '@/styles/pages/SelectOpponent.module.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../store'
import { useRouter } from 'next/router'
import { supabase } from '../../../../../supabase-client'
import OpponentList from '@/components/OpponentList'
import Link from 'next/link'
import Button from '@/components/Button'
import Validation from '@/components/Validation'

export async function getServerSideProps() {
    const { data } = await supabase.from("opponents").select('*')
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

export default function SelectOpponent({ data }: Opponents) {

    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])

    const savedOpponentId = useSelector((state: RootState) => state.analysis.opponentId)

    const router = useRouter()

    function next() {

        let validationArray = [];

        if (savedOpponentId === 0) {
            validationArray.push('- Please select an opponent')
        }

        if (savedOpponentId != 0) {
            router.push("/my-analyses/create/score")
        } else {
            setValidation(true)
            setValidations(validationArray)
        }
      }

    return (
        <>
            <div className={styles.selectOpponent}>
                <h1>Select your opponent</h1>
                {data.length != 0 && <OpponentList opponents={data} />}
                <p>Can't find the right opponent to select? <Link href='/my-analyses/create/opponent/add'>Click here</Link> to add a new opponent.</p>
                <Button variant='primary' label='Next' onClick={next} />
                <Validation validation={validation} setValidation={setValidation} validations={validations} />
            </div>
        </>
    )
}