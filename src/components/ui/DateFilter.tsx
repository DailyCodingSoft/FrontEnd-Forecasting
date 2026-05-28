import { useState } from 'react';
import { Text } from '@chakra-ui/react';
import { getDaysInMonth, getMonth, getWeek } from 'date-fns';
import type { dateFilterData } from '@/types/filtersTypes';
import PillSelect from '@/components/ui/PillSelect';
import FilterCard from '@/components/ui/FilterCard';

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

export default function DateFilter(props: { onSubmit: (data: dateFilterData) => void }) {
    const [year, setYear] = useState<string>();
    const [month, setMonth] = useState<string>();
    const [day, setDay] = useState<string>();
    const [week, setWeek] = useState<string>();


    const [availableDays, setAvailableDays] = useState<number[]>(Array.from({ length: getDaysInMonth(new Date(parseInt(currentYear), parseInt(currentMonth))) }, (_, i) => 1 + i));
    const [availableMonths, setAvailableMonths] = useState<number[]>(Array.from({ length: getMonth(new Date()) + 1 }, (_, i) => i))
    const [availableWeek, setAvailableWeek] = useState<number[]>(Array.from({ length: getWeek(new Date()) + 1 }, (_, i) => 1 + i))

    const availableYears = Array.from({ length: parseInt(currentYear) - 1999 + 1 }, (_, i) => i + 1999);

    // console.log(`currentyear : ${ parseInt(currentYear)} \n
    //             currentmonth : ${availableMonths} \n
    //             currentweek : ${currentWeek} \n
    //             currentday : ${availableDays}`)
    function onChangeYear(value: string) {
        setYear(value)
        if (value != currentYear) {
            setAvailableMonths(Array.from({ length: 12 }, (_, i) => i))
            setAvailableWeek(Array.from({ length: 52 }, (_, i) => 1 + i))
        }
        else {
            setAvailableWeek(Array.from({ length: getWeek(new Date()) + 1 }, (_, i) => 1 + i))
            setAvailableMonths(Array.from({ length: getMonth(new Date()) + 1 }, (_, i) => i))
        }
        sendData(value, month, day, week)
    }

    function onChangeMonth(value: string) {
        setMonth(value)
        setDay("")
        if (year)
            setAvailableDays(Array.from({ length: getDaysInMonth(new Date(parseInt(year), parseInt(value))) }, (_, i) => 1 + i))
        sendData(year, value, day, week)
    }

    function sendData(
        customYear = year,
        customMonth = month,
        customDay = day,
        customWeek = week
    ) {
        const selectMonth = customMonth
            ? (parseInt(customMonth) + 1).toString()
            : ""

        props.onSubmit({
            year: customYear || "",
            month: selectMonth,
            day: customDay || "",
            week: customWeek || ""
        })
    }
    return (
        <FilterCard title="Filtro por Fecha">
            <div className="flex flex-wrap justify-center gap-3">
                <label className="flex items-center gap-2">
                    <Text fontSize="sm" fontWeight="medium" color="gray.600">Año</Text>
                    <PillSelect
                        name="year_selector"
                        value={year}
                        onChange={e => onChangeYear(e.target.value)}
                    >
                        <option value="">
                            Seleccionar
                        </option>
                        {availableYears.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </PillSelect>
                </label>

                <label className="flex items-center gap-2">
                    <Text fontSize="sm" fontWeight="medium" color="gray.600">Mes</Text>
                    <PillSelect
                        name="monthSelector"
                        value={month}
                        onChange={e => onChangeMonth(e.target.value)}
                    >
                        <option value="">
                            Seleccionar
                        </option>
                        {availableMonths.map((n) => (
                            <option key={n} value={n}>{monthDictionary[n]}</option>
                        ))}
                    </PillSelect>
                </label>

                <label className="flex items-center gap-2">
                    <Text fontSize="sm" fontWeight="medium" color="gray.600">Día</Text>
                    <PillSelect
                        name="daySelector"
                        value={day}
                        disabled={!month}
                        onChange={e => {
                            setDay(e.target.value)
                            sendData(year, month, e.target.value, week)
                        }}
                    >
                        <option value="">
                            Seleccionar
                        </option>
                        {availableDays.map((d) => (
                            <option key={d} value={String(d)}>{d}</option>
                        ))}
                    </PillSelect>
                </label>

                <label className="flex items-center gap-2">
                    <Text fontSize="sm" fontWeight="medium" color="gray.600">Semana</Text>
                    <PillSelect
                        name="weekSelector"
                        value={week}
                        onChange={e => {
                            setWeek(e.target.value)
                            sendData(year, month, day, e.target.value)
                        }}
                    >
                        <option value="">
                            Seleccionar
                        </option>
                        {availableWeek.map((w) => (
                            <option key={w} value={w}>{w}</option>
                        ))}
                    </PillSelect>
                </label>
            </div>
        </FilterCard>
    );
}