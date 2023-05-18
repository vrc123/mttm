import styles from '@/styles/components/SelectOpponentList.module.css'
import { useDispatch } from 'react-redux';
import { saveOpponentId } from '@/features/analysisSlice'
import SelectOpponentItem from './SelectOpponentItem'

interface Opponent {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    country: string;
    birthday: string;
}

interface SelectOpponentListProps {
   opponents: Opponent[];
   selectedOpponentValue: number;
   changeOpponent: React.Dispatch<React.SetStateAction<number>>;
}

export default function SelectOpponentList({ opponents, selectedOpponentValue, changeOpponent }: SelectOpponentListProps) {

    return (
        <div className={styles.selectOpponentList}>
            {opponents.map((opponent) => {

                function selectOpponent() {
                    changeOpponent(opponent.id)
                }
                
                return (
                    <SelectOpponentItem key={opponent.id} selectedOpponentValue={selectedOpponentValue} opponentId={opponent.id} firstName={opponent.firstName} middleName={opponent.middleName} lastName={opponent.lastName} country={opponent.country} onClick={selectOpponent} />
                )
            })}
        </div>
    )
}