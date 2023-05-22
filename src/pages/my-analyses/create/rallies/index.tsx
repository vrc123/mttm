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

    const analysis = useSelector((state: RootState) => state.analysis)
    const serves = useSelector((state: RootState) => state.serves)
    const recieves = useSelector((state: RootState) => state.recieves)

    const dispatch = useDispatch()

    const router = useRouter()
    
    async function addRallies(e: { preventDefault: () => void }) {
        e.preventDefault()

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

            const { data: forehandServes, error } = await supabase
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

            if (forehandServes) {
                
                const { data: backhandServes, error } = await supabase
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
        
                if (backhandServes) {

                    const { data: serves, error } = await supabase
                    .from('serves')
                    .insert([{
                        fhServesId: forehandServes[0].id,
                        bhServesId: backhandServes[0].id,
                    }]).select('*')
        
                    if (serves) {

                        const { data: forehandRecieves, error } = await supabase
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

                        if (forehandRecieves) {
                            
                            const { data: backhandRecieves, error } = await supabase
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

                            if (backhandRecieves) {

                                const { data: recieves, error } = await supabase
                                .from('recieves')
                                .insert([{
                                    fhRecievesId: forehandRecieves[0].id,
                                    bhRecievesId: backhandRecieves[0].id,
                                }]).select('*')

                                if (recieves) {

                                    const { data: ralliesMore, error } = await supabase
                                    .from('ralliesMore')
                                    .insert([{
                                        wins: moreWins,
                                        loses: moreLoses,
                                    }]).select('*')

                                    if (ralliesMore) {

                                        const { data: ralliesLess, error } = await supabase
                                        .from('ralliesLess')
                                        .insert([{
                                            wins: lessWins,
                                            loses: lessLoses,
                                        }]).select('*')

                                        if (ralliesLess) {

                                            const { data: rallies, error } = await supabase
                                            .from('rallies')
                                            .insert([{
                                                ralliesMoreId: ralliesMore[0].id,
                                                ralliesLessId: ralliesLess[0].id,
                                            }]).select('*')

                                            if (rallies) {
                                                const { data: analyses, error } = await supabase
                                                .from('analyses')
                                                .insert([{
                                                    date: analysis.date,
                                                    opponentId: analysis.opponentId,
                                                    score: analysis.score,
                                                    servesId: serves[0].id,
                                                    recievesId: recieves[0].id,
                                                    ralliesId: rallies[0].id,
                                                }]).select('*')

                                                if (analyses) {

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

                                                if (error) {
                                                    setError(true)
                                                }
                                            }

                                            if (error) {
                                                setError(true)
                                            }
                                        }

                                        if (error) {
                                            setError(true)
                                        }
                                    }

                                    if (error) {
                                        setError(true)
                                    }
                                }

                                if (error) {
                                    setError(true)
                                }
                            }

                            if (error) {
                                setError(true)
                            }
                        }

                        if (error) {
                            setError(true)
                        }
                    }
        
                    if (error) {
                        setError(true)
                    }
                }
        
                if (error) {
                    setError(true)
                }
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
                changeValidation={setValidation}
                changeError={setError}
                onSubmit={addRallies}
            />
        </div>
    )
}