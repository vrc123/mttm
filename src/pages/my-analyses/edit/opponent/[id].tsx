import styles from '@/styles/pages/SelectOpponent.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../../../../supabase-client'
import SelectOpponentList from '@/components/SelectOpponentList'
import Link from 'next/link'
import Button from '@/components/Button'
import Validation from '@/components/Validation'
import Error from '@/components/Error'

interface Context {
    params: { id: number}
}

export async function getServerSideProps(context: Context) {
    const id = context.params.id;
    const { data } = await supabase.from("opponents").select('*')
    const { data: analysis } = await supabase.from("analyses")
    .select(`
        id,
        opponents ( id )
    `)
    .eq('id', id)
    .single()
    return {
        props: {
            data,
            analysis
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

interface Analysis {
    id: number;
    opponents: {
        id: number;
    }
}

interface SelectOpponentProps {
    data: Opponent[];
    analysis: Analysis;
}

export default function SelectOpponent({ data, analysis }: SelectOpponentProps) {

    const [opponent, setOpponent] = useState(analysis.opponents.id)
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])
    const [error, setError] = useState(false)

    const router = useRouter()

    async function selectNewOpponent() {

        let validationArray = [];

        if (opponent === 0) {
            validationArray.push('- Please select an opponent')
        }

        if (opponent != 0) {

            const { data, error } = await supabase
            .from('analyses')
            .update({
                opponentId: opponent
            }).eq('id', analysis.id).select('*')

            if (data) {
                router.push('/my-analyses/' + analysis.id)
            }

            if (error) {
                setError(true)
            }

        } else {
            setValidation(true)
            setValidations(validationArray)
        }
    }

    return (
        <>
            <div className={styles.selectOpponent}>
                <h1>Select a new opponent</h1>
                {data.length != 0 && <SelectOpponentList opponents={data} selectedOpponentValue={opponent} changeOpponent={setOpponent} />}
                <p>Can't find the right opponent to select? <Link href={'/my-analyses/edit/opponent/add/' + analysis.id}>Click here</Link> to add and select a new opponent.</p>
                <Button variant='primary' label='Select' onClick={selectNewOpponent} />
                <Validation validation={validation} setValidation={setValidation} validations={validations} />
                <Error error={error} setError={setError} />
            </div>
        </>
    )
}