import styles from '@/styles/components/OpponentList.module.css'
import { useState } from 'react';
import OpponentItem from './OpponentItem';
import Button from './Button';

interface Opponent {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    country: string;
    birthday: string;
}

interface OpponentListProps {
    query: string;
    opponents: Opponent[];
}

export default function OpponentList({ opponents, query }: OpponentListProps) {

    const [visibleOpponents, setVisibleOpponents] = useState(8);
    
    let filteredOpponents = opponents.filter(((opponent) => {
        if (query.toLowerCase() === '') {
            return opponents
        } else if (opponent.middleName == '') {
            if((opponent.firstName.toLowerCase() + ' ' + opponent.lastName.toLowerCase()).includes(query.toLocaleLowerCase())) {
                return opponents
            }
        } else if (opponent.middleName != undefined) {
            if((opponent.firstName.toLowerCase() + ' ' + opponent.middleName.toLowerCase() + ' ' + opponent.lastName.toLowerCase()).includes(query.toLocaleLowerCase())) {
                return opponents
            }
        }
    }))   
    
    function showMoreOpponents() {
        setVisibleOpponents(visibleOpponents + 8);
    }
    
    let visibleData = filteredOpponents.slice(0, visibleOpponents)

    return (
        <div className={styles.opponentList}>
            <div className={styles.list}>
                {visibleData.map((opponent) => {
                    return (
                        <OpponentItem key={opponent.id} id={opponent.id} firstName={opponent.firstName} middleName={opponent.middleName} lastName={opponent.lastName} country={opponent.country} birthday={opponent.birthday} />
                    )
                })}
            </div>
            {visibleData.length != filteredOpponents.length && <Button variant='secondary' label='Show more' onClick={showMoreOpponents} />}
        </div>
    )
}