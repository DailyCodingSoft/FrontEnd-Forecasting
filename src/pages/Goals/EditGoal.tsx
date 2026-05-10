import { NumberInput, Input, Field, InputGroup, Select, Button, Text, VStack, Flex, Box, HStack, Center, createListCollection } from "@chakra-ui/react"
import { formatNumberToCurrency } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { getGoalCategories, saveGoal, getGoalByName, updateGoal } from "@/services/goals";
import type { GoalCategory, GoalRequest, UpdateGoalRequest } from "@/types/goalTypes";
import { LuSave, LuX, LuGoal } from "react-icons/lu";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

export default function EditGoal() {

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const preLoadGoal = location.state?.goal;
    const [loading, setLoading] = useState(!preLoadGoal);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("100");
    const [bonus, setBonus] = useState('');
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState<GoalCategory[]>([]);

    useEffect(() => {
        const init = async () => {
            const result = await getGoalCategories();
            setCategories(result);
            console.log(result);
            let goal = preLoadGoal;
            if (!goal && params.name) {
                const byName = await getGoalByName(params.name);
                goal = byName;
            }

            if (goal) {
                setName(goal.name);
                setQuantity(goal.quantity.toString());
                setBonus(formatNumberToCurrency(goal.bonus.toString()));

                const selected = result.find(
                    c => c.name === goal.category
                );

                setCategory(selected?.code || "");
            }
            setLoading(false);
        };
        init();
    }, []);

    function applyFormatToNumber(value: string) {
        const formatNumber = value.replaceAll('.', '');
        const formatted = formatNumberToCurrency(formatNumber);
        setBonus(formatted);
        return formatted;
    }

    function validateFields() {
        return true;
    }

    async function handleSubmit() {
        if (validateFields()) {
            const data: UpdateGoalRequest = {
                name: preLoadGoal.name,
                newName: name,
                progress: 0,
                categoryCode: category,
                quantity: parseInt(quantity),
                bonus: parseInt(bonus.replaceAll(".", ""))
            }
            try {
                await updateGoal(data);
                navigate('/goals');
            } catch (error: any) {
                //mostrar mensaje de error en el popup.
            }

        }
    }

    if (loading) {
        return (
            <Center h="70vh">
                <VStack gap={4}>
                    <Spinner size="lg" color="orange.400" />
                    <Text>Cargando meta...</Text>
                </VStack>
            </Center>
        );
    }

    return (
        <Flex justify="center" className="px-4 py-6">
            <Box className="w-full max-w-[520px] rounded-3xl bg-white px-10 py-10 shadow-sm">
                <form action="">
                    <VStack align="stretch" gap={8}>

                        <HStack align="start" gap={4} className="mb-9">
                            <Center className="h-12 min-w-12 rounded-2xl bg-orange-100 text-2xl text-orange-900">
                                <LuGoal />
                            </Center>

                            <VStack align="start" gap={1} className="flex-1">
                                <Text className="text-xl font-bold leading-tight text-gray-900">
                                    {preLoadGoal ? "Edición de la Meta" : "Creación de una Meta"}
                                </Text>

                                <Text className="text-xs leading-snug text-gray-500 text-left">
                                    Configura los objetivos de ventas para tu equipo
                                </Text>
                            </VStack>
                        </HStack>

                        <Field.Root required>
                            <VStack align="stretch" gap={2} className="w-full">
                                <Field.Label className="font-semibold text-gray-700">
                                    Nombre de la meta 🏁
                                </Field.Label>

                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nombre de la meta"
                                    className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-100 px-4 text-gray-800 placeholder:text-gray-400 "
                                />
                            </VStack>
                        </Field.Root>

                        <Field.Root required>
                            <VStack align="stretch" gap={2} className="w-full">
                                <Field.Label className="font-semibold text-gray-700">
                                    Seleccion de categoria 🍺
                                </Field.Label>

                                <Select.Root
                                    value={category ? [category] : []}
                                    onValueChange={(e) => setCategory(e.value[0])}
                                    collection={createListCollection({
                                        items: categories.map((c) => ({
                                            label: c.name,
                                            value: c.code,
                                        })),
                                    })}
                                    size="md">
                                    <Select.Trigger
                                        className=" w-full h-14 rounded-2xl border border-gray-200 bg-gray-100 px-4 text-gray-700 outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-200">
                                        <Select.ValueText placeholder="Categoría" className={`${category ? "text-gray-800" : "text-gray-400"}`} />
                                        <Select.Indicator />
                                    </Select.Trigger>

                                    <Select.Positioner>
                                        <Select.Content
                                            className="rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
                                            {categories.map((c) => (
                                                <Select.Item
                                                    item={c.code}
                                                    key={c.code}
                                                    className="cursor-pointer rounded-xl px-3 py-3 transition-colors hover:bg-orange-100 data-[highlighted]:bg-orange-100 text-gray-800">
                                                    <Select.ItemText>
                                                        {c.name}
                                                    </Select.ItemText>
                                                    <Select.ItemIndicator />
                                                </Select.Item>
                                            ))}
                                        </Select.Content>
                                    </Select.Positioner>
                                </Select.Root>
                            </VStack>
                        </Field.Root>

                        <Field.Root required>
                            <VStack align="stretch" gap={2} className="w-full">
                                <Field.Label className="font-semibold text-gray-700">
                                    Valor del bono 💲
                                </Field.Label>

                                <InputGroup
                                    startElement="$"
                                    endElement="COP"
                                    className="w-full">
                                    <Input
                                        onChange={e => {
                                            applyFormatToNumber(e.target.value)
                                        }}
                                        placeholder="1.000.000"
                                        value={bonus}
                                        className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-100 px-4 text-gray-800 placeholder:text-gray-400"
                                    />
                                </InputGroup>

                                <Field.HelperText className="text-2sm text-gray-500">
                                    Este monto sera otorgado al cumplir el 100% de la meta.
                                </Field.HelperText>
                            </VStack>
                        </Field.Root>

                        <Field.Root required>
                            <VStack align="stretch" gap={2} className="w-full">
                                <Field.Label className="font-semibold text-gray-700">
                                    Objetivo de venta 🎯
                                </Field.Label>
                                <NumberInput.Root value={quantity} onValueChange={(e) => setQuantity(e.value)} defaultValue="100" min={1} max={1000000}>
                                    <NumberInput.Input className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-100 px-4 text-gray-800 placeholder:text-gray-400" />
                                    <NumberInput.Control />
                                </NumberInput.Root>
                                <Field.HelperText className="text-2sm text-gray-500">
                                    Cuantos productos se necesitan vender para cumplir la meta.
                                </Field.HelperText>
                            </VStack>
                        </Field.Root>

                        <VStack align="stretch" gap={4} className="pt-2 mt-7">
                            <Button onClick={handleSubmit} className="h-14 rounded-2xl bg-orange-400 text-base font-semibold text-white hover:bg-orange-500">
                                <LuSave />
                                Actualizar meta
                            </Button>

                            <Button
                                onClick={() => { navigate('/goals') }}
                                variant="outline"
                                className="h-14 rounded-2xl border border-gray-300 bg-white text-base font-medium text-gray-700 hover:bg-gray-50">
                                <LuX />
                                Cancelar
                            </Button>
                        </VStack>

                    </VStack>
                </form>
            </Box>
        </Flex>
    )
}