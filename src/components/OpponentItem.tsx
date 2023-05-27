import styles from '@/styles/components/OpponentItem.module.css'
import { supabase } from '../../supabase-client';
import { useRouter } from 'next/router';
import Button from './Button';
import { useState } from 'react';
import Delete from './Delete';

interface OpponentItemProps {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    country: string;
    birthday: string;
}

interface Analysis {
    opponentId: number;
    serves: {
        fhServesId: number;
        bhServesId: number;
    },
    recieves: {
        fhRecievesId: number;
        bhRecievesId: number;
    },
    rallies: {
        ralliesMoreId: number;
        ralliesLessId: number;
    }
}

interface AnalysisDeleteProps {
    data: Analysis | null
}

export default function OpponentItem({ id, firstName, middleName, lastName, country, birthday }: OpponentItemProps) {

    const [opponentDelete, setOpponentDelete] = useState(false)
    const [error, setError] = useState(false)

    const router = useRouter()

    function openModal() {
        setOpponentDelete(true)
    }

    function editOpponent() {
        router.push('my-opponents/edit/' + id)
    }
   
    async function deleteOpponent() {

        const { data: analyses, error} = await supabase
        .from('analyses')
        .select('*')
        .eq('opponentId', id)

        if (analyses) {

            for (let i = 0; i < analyses.length; i++) {

                const { data: analysis}: AnalysisDeleteProps = await supabase
                .from('analyses')
                .select(`
                    opponentId,
                    serves ( 
                        fhServesId,
                        bhServesId
                    ),
                    recieves ( 
                        fhRecievesId,
                        bhRecievesId
                    ),
                    rallies ( 
                        ralliesMoreId,
                        ralliesLessId
                    )
                `)
                .eq('id', analyses[i].id)
                .single()

                if (analysis != null) {

                    const { error: fhServesError } = await supabase
                    .from('forehandServes')
                    .delete()
                    .eq('id', analysis.serves.fhServesId)

                    const { error: bhServesError } = await supabase
                    .from('backhandServes')
                    .delete()
                    .eq('id', analysis.serves.bhServesId)
        
                    const { error: fhRecievesError } = await supabase
                    .from('forehandRecieves')
                    .delete()
                    .eq('id', analysis.recieves.fhRecievesId)
        
                    const { error: bhRecievesError } = await supabase
                    .from('backhandRecieves')
                    .delete()
                    .eq('id', analysis.recieves.bhRecievesId)
        
                    const { error: ralliesMoreError } = await supabase
                    .from('ralliesMore')
                    .delete()
                    .eq('id', analysis.rallies.ralliesMoreId)
        
                    const { error: ralliesLessError } = await supabase
                    .from('ralliesLess')
                    .delete()
                    .eq('id', analysis.rallies.ralliesLessId)
                    
        
                    if (fhServesError || bhServesError || fhRecievesError || bhRecievesError || ralliesMoreError || ralliesLessError) {
                        setError(true)
                    }
                }
            }

            const { error } = await supabase
            .from('opponents')
            .delete()
            .eq('id', id)

            if (error) {
                setError(true)
            } else {
                router.reload()
            }
        }
                    
        if (error) {
            setError(true)
        }
    }
    
    return (
        <div className={styles.opponentItem} >
            <p>Name: {firstName} {middleName} {lastName}</p>
            <p>Country: {country}</p>
            <p>Birthday: {birthday}</p>
            <Button variant='secondary' label='Edit' onClick={editOpponent} />
            <Button variant='delete' label='Delete' onClick={openModal} />
            <Delete deleteItem={opponentDelete} setDeleteItem={setOpponentDelete} error={error} setError={setError} deleteFunction={deleteOpponent} />
        </div>
    )
}