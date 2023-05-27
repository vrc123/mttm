import styles from '@/styles/components/AnalysisItem.module.css'
import { supabase } from '../../supabase-client';
import { useRouter } from 'next/router';
import Button from './Button';
import { useState } from 'react';
import Delete from './Delete';

interface AnalysisItemProps {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    country: string;
    score: string;
    date: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface Analysis {
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
    data: Analysis | null;
    error: {
        code: string;
        details: string;
        hint: string;
        message: string;
    } | null;
}

export default function AnalysisItem({ id, firstName, middleName, lastName, country, score, date, onClick }: AnalysisItemProps) {

    const [analysisDelete, setAnalysisDelete] = useState(false)
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    function openModal() {
        setAnalysisDelete(true)
    }
    
    async function deleteAnalysis() {        

        setIsLoading(true)

        const { data: analysis, error: analysisError }: AnalysisDeleteProps = await supabase
        .from('analyses')
        .delete()
        .eq('id', id)
        .select(`
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

            if (!fhServesError && !bhServesError && !fhRecievesError && !bhRecievesError && !ralliesMoreError && !ralliesLessError) {
                router.reload()
            }

            if (fhServesError || bhServesError || fhRecievesError || bhRecievesError || ralliesMoreError || ralliesLessError) {
                setIsLoading(false)
                setError(true)
            }
        }

        if (analysisError) {
            setIsLoading(false)
            setError(true)
        }
    }
    
    return (
        <div className={styles.analysisItem} >
            <p>Name: {firstName} {middleName} {lastName}</p>
            <p>Country: {country}</p>
            <p>Score: {score}</p>
            <p>Date: {date}</p>
            <Button variant='secondary' label='Show' onClick={onClick} />
            <Button variant='delete' label='Delete' onClick={openModal} />
            <Delete deleteItem={analysisDelete} setDeleteItem={setAnalysisDelete} error={error} setError={setError} isLoadingValue={isLoading} deleteFunction={deleteAnalysis} />
        </div>
    )
}