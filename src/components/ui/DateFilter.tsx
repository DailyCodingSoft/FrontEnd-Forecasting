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
    const[availableWeek, setAvailableWeek] = useState<number[]>(Array.from({ length: getWeek(new Date())+1}, (_, i) => 1+i))
    
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
    const pillSelect = "bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium text-sm rounded-full px-4 py-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer transition-colors duration-150";

    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-md w-fit">
            <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                Filtro por Fecha
            </h2>

            <div className="flex flex-wrap justify-center gap-3">
                <label className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Año</span>
                    <select
                        name="year_selector"
                        value={year}
                        onChange={e => onChangeYear(e.target.value)}
                        className={pillSelect}
                    >
                        {availableYears.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </label>

                <label className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Mes</span>
                    <select
                        name="monthSelector"
                        value={month}
                        onChange={e => onChangeMonth(e.target.value)}
                        className={pillSelect}
                    >
                        {availableMonths.map((n) => (
                            <option key={n} value={n}>{monthDictionary[n]}</option>
                        ))}
                    </select>
                </label>

                <label className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Día</span>
                    <select
                        name="daySelector"
                        value={day}
                        onChange={e => setDay(e.target.value)}
                        className={pillSelect}
                    >
                        {availableDays.map((d) => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="flex justify-center">
                <label className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Semana</span>
                    <select
                        name="weekSelector"
                        value={week}
                        onChange={e => setWeek(e.target.value)}
                        className={pillSelect}
                    >
                        {availableWeek.map((w) => (
                            <option key={w} value={w}>{w}</option>
                        ))}
                    </select>
                </label>
            </div>

            <Button label="Filtrar" onClick={sendData} />
        </div>
    );
}