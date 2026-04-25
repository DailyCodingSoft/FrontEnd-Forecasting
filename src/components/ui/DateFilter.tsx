import { useState } from 'react';
import Button from './Button'
import { getDate, getDaysInMonth, getMonth, getWeek } from 'date-fns';
import type { dateFilterData } from '@/types/filtersTypes';

const monthDictionary: Record<number, string> = {
    0: "Enero",
    1: "Febrero",
    2: "Marzo",
    3: "Abril",
    4: "Mayo",
    5: "Junio",
    6: "Julio",
    7: "Agosto",
    8: "Septiembre",
    9: "Octubre",
    10: "Noviembre",
    11: "Diciembre"
};

const currentYear = (new Date().getFullYear()).toString();
const currentMonth = (new Date().getMonth()).toString();
const currentDay = (getDate(new Date())).toString();
const currentWeek = (getWeek(new Date())).toString();

export default function DateFilter(props: {onSubmit: (data: dateFilterData) => void}) {
    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState(currentMonth);
    const [day, setDay] = useState(currentDay);
    const [week, setWeek] = useState(currentWeek);

    const[availableDays, setAvailableDays] = useState<number[]>(Array.from({ length: getDaysInMonth(new Date(parseInt(year), parseInt(month)))}, (_, i) => 1+i));
    const[availableMonths, setAvailableMonths] = useState<number[]>(Array.from({ length: getMonth(new Date())+1}, (_, i) => i))
    const[availableWeek, setAvailableWeek] = useState<number[]>(Array.from({ length: getWeek(new Date())}, (_, i) => 1+i))
    
    const availableYears = Array.from({ length: parseInt(currentYear) - 1999 + 1}, (_, i) => i + 1999);

    // console.log(`currentyear : ${ parseInt(currentYear)} \n
    //             currentmonth : ${availableMonths} \n
    //             currentweek : ${currentWeek} \n
    //             currentday : ${availableDays}`)

    function onChangeYear(value: string) {
        setYear(value)
        if(value != currentYear) {
            setAvailableMonths(Array.from({ length: 12}, (_, i) => i))
            setAvailableWeek(Array.from({ length: 52}, (_, i) => 1+i))
        }
        else {
            setAvailableWeek(Array.from({ length: getWeek(new Date())+1}, (_, i) => 1+i))
            setAvailableMonths(Array.from({ length: getMonth(new Date())+1}, (_, i) => i))
        }
    }

    function onChangeMonth(value: string) {
        setMonth(value)
        setAvailableDays(Array.from({ length: getDaysInMonth(new Date(parseInt(year), parseInt(value)))}, (_, i) => 1+i))
    }

    function sendData() {
        props.onSubmit({year, month:(parseInt(month)+1).toString(), day, week})
    }

    return (<>
        <label>
            Año:
            <select name="year_selector" value={year} onChange={e => onChangeYear(e.target.value)}  >
                {
                    availableYears.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))
                }
            </select>
        </label>
        <label>
            Mes:
            <select name='monthSelector' value={month} onChange={e => onChangeMonth(e.target.value)}>
                {availableMonths.map((n) => (
                        <option key={n} value={n}>
                            {monthDictionary[n]}
                        </option>
                    ))
                }
            </select>   
        </label>
        <label>
            Dia:
            <select name='daySelector' value={day} onChange={e => setDay(e.target.value)}>
                {availableDays.map((day) => (
                    <option key={day} value={day}>
                        {day}
                    </option>
                ))}
            </select>
        </label>
        <label>
            <select name='weekSelector' value={week} onChange={e => setWeek(e.target.value)}>
                {availableWeek.map((week) => (
                    <option key={week} value={week}>
                        {week}
                    </option>
                ))}
            </select>
        </label>
        <Button label="Filtrar" onClick={sendData} />
    </>)
}