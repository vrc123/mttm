import styles from '@/styles/components/OpponentList.module.css'
import { useRouter } from 'next/router';
import OpponentItem from './OpponentItem';

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

    const router = useRouter()

    return (
        <div className={styles.opponentList}>
            {opponents.filter(((opponent) => {
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
            })).map((opponent) => {
                return (
                    <OpponentItem key={opponent.id} id={opponent.id} firstName={opponent.firstName} middleName={opponent.middleName} lastName={opponent.lastName} country={opponent.country} birthday={opponent.birthday} />
                )
            })}
        </div>
    )
}