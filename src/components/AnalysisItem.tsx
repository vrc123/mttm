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

export default function AnalysisItem({ id, firstName, middleName, lastName, country, score, date, onClick }: AnalysisItemProps) {

    const [analysisDelete, setAnalysisDelete] = useState(false)
    const [error, setError] = useState(false)

    const router = useRouter()

    function openModal() {
        setAnalysisDelete(true)
    }

   
    async function deleteAnalysis() {        

        const { data, error } = await supabase
        .from('analyses')
        .delete()
        .eq('id', id)
        .select('*')

        if (data) {
            router.reload()
        }

        if (error) {
            setError(true)
        }
    }
    
    return (
        <div className={styles.analysisItem} >
            <p>Name: {firstName} {middleName} {lastName}</p>
            <p>Country: {country}</p>
            <p>Score: {score}</p>
            <p>Date: {date}</p>
            <Button variant='secondary' label='Visit' onClick={onClick} />
            <Button variant='delete' label='Delete' onClick={openModal} />
            <Delete deleteItem={analysisDelete} setDeleteItem={setAnalysisDelete} error={error} setError={setError} deleteFunction={deleteAnalysis} />
        </div>
    )
}