import styles from '@/styles/pages/AddRallies.module.css'
import RalliesForm from '@/components/forms/RalliesForm'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../store'
import { saveDate, saveOpponentId, saveScore } from '@/features/analysisSlice'
import { useRouter } from 'next/router'
import { supabase } from '../../../../../supabase-client'
import { saveBhServes, saveFhServes } from '@/features/servesSlice'
import { saveBhRecieves, saveFhRecieves } from '@/features/recievesSlice'

export default function AddRallies() {

    const [more, setMore] = useState('')
    const [moreWins, setMoreWins] = useState('')
    const [moreLoses, setMoreLoses] = useState('')
    const [less, setLess] = useState('')
    const [lessWins, setLessWins] = useState('')
    const [lessLoses, setLessLoses] = useState('')
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const analysis = useSelector((state: RootState) => state.analysis)
    const serves = useSelector((state: RootState) => state.serves)
    const recieves = useSelector((state: RootState) => state.recieves)

    const dispatch = useDispatch()

    const router = useRouter()
    
    async function addRallies(e: { preventDefault: () => void }) {
        e.preventDefault()

        setIsLoading(true)

        let validationArray = []

        if (isNaN(Number(more))) {
            validationArray.push('- More needs to be a number')
        }

        if (isNaN(Number(moreWins))) {
            validationArray.push('- Wins needs to be a number (more)')
        }

        if (isNaN(Number(moreLoses))) {
            validationArray.push('- Loses needs to be a number (more)')
        }

        if (Number(more) != Number(moreWins) + Number(moreLoses) && !isNaN(Number(moreWins)) && !isNaN(Number(moreLoses))) {
            validationArray.push(`- You need to distribute ${Number(more) - (Number(moreWins) + Number(moreLoses))} rallies (more)`)
        }

        if (isNaN(Number(less))) {
            validationArray.push('- Less needs to be a number')
        }

        if (isNaN(Number(lessWins))) {
            validationArray.push('- Wins needs to be a number (less)')
        }

        if (isNaN(Number(lessLoses))) {
            validationArray.push('- Loses needs to be a number (less)')
        }

        if (Number(less) != Number(lessWins) + Number(lessLoses) && !isNaN(Number(lessWins)) && !isNaN(Number(lessLoses))) {
            validationArray.push(`- You need to distribute ${Number(less) - (Number(lessWins) + Number(lessLoses))} rallies (less)`)
        }

        if (validationArray.length === 0) {

            const { data: forehandServes, error: fhServesError } = await supabase
            .from('forehandServes')
            .insert([{
                longFh: serves.fhServes.longFh,
                longMiddle: serves.fhServes.longMiddle,
                longBh: serves.fhServes.longBh,
                halfLongFh: serves.fhServes.halfLongFh,
                halfLongMiddle: serves.fhServes.halfLongMiddle,
                halfLongBh: serves.fhServes.halfLongBh,
                shortFh: serves.fhServes.shortFh,
                shortMiddle: serves.fhServes.shortMiddle,
                shortBh: serves.fhServes.shortBh,
            }]).select('*')
            .single()

            const { data: backhandServes, error: bhServesError } = await supabase
            .from('backhandServes')
            .insert([{
                longFh: serves.bhServes.longFh,
                longMiddle: serves.bhServes.longMiddle,
                longBh: serves.bhServes.longBh,
                halfLongFh: serves.bhServes.halfLongFh,
                halfLongMiddle: serves.bhServes.halfLongMiddle,
                halfLongBh: serves.bhServes.halfLongBh,
                shortFh: serves.bhServes.shortFh,
                shortMiddle: serves.bhServes.shortMiddle,
                shortBh: serves.bhServes.shortBh,
            }]).select('*')
            .single()

            const { data: forehandRecieves, error: fhRecievesError } = await supabase
            .from('forehandRecieves')
            .insert([{
                longFh: recieves.fhRecieves.longFh,
                longMiddle: recieves.fhRecieves.longMiddle,
                longBh: recieves.fhRecieves.longBh,
                halfLongFh: recieves.fhRecieves.halfLongFh,
                halfLongMiddle: recieves.fhRecieves.halfLongMiddle,
                halfLongBh: recieves.fhRecieves.halfLongBh,
                shortFh: recieves.fhRecieves.shortFh,
                shortMiddle: recieves.fhRecieves.shortMiddle,
                shortBh: recieves.fhRecieves.shortBh,
            }]).select('*')
            .single()

            const { data: backhandRecieves, error: bhRecievesError } = await supabase
            .from('backhandRecieves')
            .insert([{
                longFh: recieves.bhRecieves.longFh,
                longMiddle: recieves.bhRecieves.longMiddle,
                longBh: recieves.fhRecieves.longBh,
                halfLongFh: recieves.bhRecieves.halfLongFh,
                halfLongMiddle: recieves.bhRecieves.halfLongMiddle,
                halfLongBh: recieves.bhRecieves.halfLongBh,
                shortFh: recieves.bhRecieves.shortFh,
                shortMiddle: recieves.bhRecieves.shortMiddle,
                shortBh: recieves.bhRecieves.shortBh,
            }]).select('*')
            .single()

            const { data: ralliesMore, error: moreError } = await supabase
            .from('ralliesMore')
            .insert([{
                wins: moreWins,
                loses: moreLoses,
            }]).select('*')
            .single()

            const { data: ralliesLess, error: lessError } = await supabase
            .from('ralliesLess')
            .insert([{
                wins: lessWins,
                loses: lessLoses,
            }]).select('*')
            .single()

            if(forehandServes && backhandServes && forehandRecieves && backhandRecieves && ralliesMore && ralliesLess) {

                const { data: serves, error: servesError } = await supabase
                .from('serves')
                .insert([{
                    fhServesId: forehandServes.id,
                    bhServesId: backhandServes.id,
                }]).select('*')
                .single()

                const { data: recieves, error: recievesError } = await supabase
                .from('recieves')
                .insert([{
                    fhRecievesId: forehandRecieves.id,
                    bhRecievesId: backhandRecieves.id,
                }]).select('*')
                .single()

                const { data: rallies, error: ralliesError } = await supabase
                .from('rallies')
                .insert([{
                    ralliesMoreId: ralliesMore.id,
                    ralliesLessId: ralliesLess.id,
                }]).select('*')
                .single()

                if(serves && recieves && rallies) {
                    
                    const { error } = await supabase
                    .from('analyses')
                    .insert([{
                        date: analysis.date,
                        opponentId: analysis.opponentId,
                        score: analysis.score,
                        servesId: serves.id,
                        recievesId: recieves.id,
                        ralliesId: rallies.id,
                    }])

                    if(!error) {

                        const placements = {
                            longFh: '',
                            longMiddle: '',
                            longBh: '',
                            halfLongFh: '',
                            halfLongMiddle: '',
                            halfLongBh: '',
                            shortFh: '',
                            shortMiddle: '',
                            shortBh: '',
                        }

                        dispatch(saveDate(''))
                        dispatch(saveOpponentId(0))
                        dispatch(saveScore(''))
                        dispatch(saveFhServes(placements))
                        dispatch(saveBhServes(placements))
                        dispatch(saveFhRecieves(placements))
                        dispatch(saveBhRecieves(placements))
                        
                        router.push('/my-analyses')
                    }

                    if(error) {
                        setIsLoading(false)
                        setError(true) 
                    }
                }

                if(servesError || recievesError || ralliesError) {
                    setIsLoading(false)
                    setError(true) 
                }
            }

            if(fhServesError || bhServesError || fhRecievesError || bhRecievesError || moreError || lessError) {
                setIsLoading(false)
                setError(true) 
            }           

        } else {
            setIsLoading(false)
            setValidation(true)
            setValidations(validationArray)
        }
  }

    return (
        <div className={styles.addRallies} >
            <h1>Add match rallies</h1>
            <RalliesForm
                buttonLabel='Create analysis'
                moreValue={more}
                onChangeMore={(e) => setMore(e.target.value)}
                lessValue={less}
                onChangeLess={(e) => setLess(e.target.value)}
                moreWinsValue={moreWins}
                onChangeMoreWins={(e) => setMoreWins(e.target.value)}
                moreLosesValue={moreLoses}
                onChangeMoreLoses={(e) => setMoreLoses(e.target.value)}
                lessWinsValue={lessWins}
                onChangeLessWins={(e) => setLessWins(e.target.value)}
                lessLosesValue={lessLoses}
                onChangeLessLoses={(e) => setLessLoses(e.target.value)}
                validationValue={validation}
                validationsValue={validations}
                errorValue={error}
                isLoadingValue={isLoading}
                changeValidation={setValidation}
                changeError={setError}
                onSubmit={addRallies}
            />
        </div>
    )
}