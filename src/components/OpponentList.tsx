import styles from '@/styles/components/OpponentList.module.css'
import { useDispatch } from 'react-redux';
import { saveOpponentId } from '@/features/analysisSlice'
import OpponentItem from './OpponentItem'

interface Opponent {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    country: string;
    birthday: string;
}

interface OpponentListProps {
   opponents: Opponent[];
}

export default function OpponentList({ opponents }: OpponentListProps) {

    const dispatch = useDispatch()

    return (
        <div className={styles.opponentList}>
            {opponents.map((opponent) => {

                function selectOpponent() {
                    dispatch(saveOpponentId(opponent.id))
                }
                
                return (
                    <OpponentItem key={opponent.id} opponentId={opponent.id} firstName={opponent.firstName} middleName={opponent.middleName} lastName={opponent.lastName} country={opponent.country} onClick={selectOpponent} />
                )
            })}
        </div>
    )
}