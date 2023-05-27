import styles from '@/styles/pages/SelectOpponent.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveOpponentId } from '@/features/analysisSlice'
import { useRouter } from 'next/router'
import { supabase } from '../../../../../supabase-client'
import SelectOpponentList from '@/components/SelectOpponentList'
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

    const [opponent, setOpponent] = useState(0)
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const router = useRouter()

    function next() {

        setIsLoading(true)

        let validationArray = [];

        if (opponent === 0) {
            validationArray.push('- Please select an opponent')
        }

        if (opponent != 0) {
            dispatch(saveOpponentId(opponent))
            router.push("/my-analyses/create/score")
        } else {
            setIsLoading(false)
            setValidation(true)
            setValidations(validationArray)
        }
    }

    return (
        <>
            <div className={styles.selectOpponent}>
                <h1>Select your opponent</h1>
                {data.length != 0 && <SelectOpponentList opponents={data} selectedOpponentValue={opponent} changeOpponent={setOpponent} />}
                <p>Can't find the right opponent to select? <Link href='/my-analyses/create/opponent/add'>Click here</Link> to add a new opponent.</p>
                {!isLoading && <Button variant='primary' label='Next' onClick={next} />}
                {isLoading && <p className={styles.loading}>Loading...</p>}
                <Validation validation={validation} setValidation={setValidation} validations={validations} />
            </div>
        </>
    )
}