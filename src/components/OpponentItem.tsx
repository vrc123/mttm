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

        const { data, error } = await supabase
        .from('opponents')
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