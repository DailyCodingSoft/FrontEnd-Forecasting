import {
    NumberInput, Input, Field, InputGroup, Select, Button,
    Text, VStack, Flex, Box, HStack, Center, createListCollection,
} from "@chakra-ui/react"
import { formatNumberToCurrency } from "@/utils/helpers";
import { useState } from "react";
import type { GoalCategory } from "@/types/goalTypes";
import { LuSave, LuX, LuGoal } from "react-icons/lu";

interface GoalFormData {
    name: string
    categoryCode: string
    bonus: number
    quantity: number
}

interface GoalFormProps {
    title: string
    categories: GoalCategory[]
    initialName?: string
    initialCategory?: string
    initialBonus?: string
    initialQuantity?: string
    submitLabel: string
    onSubmit: (data: GoalFormData) => void
    onCancel: () => void
}

export default function GoalForm({
    title,
    categories,
    initialName = "",
    initialCategory = "",
    initialBonus = "",
    initialQuantity = "100",
    submitLabel,
    onSubmit,
    onCancel,
}: GoalFormProps) {
    const [name, setName] = useState(initialName);
    const [quantity, setQuantity] = useState(initialQuantity);
    const [bonus, setBonus] = useState(initialBonus);
    const [category, setCategory] = useState(initialCategory);

    function applyFormatToNumber(value: string) {
        const formatNumber = value.replaceAll('.', '');
        const formatted = formatNumberToCurrency(formatNumber);
        setBonus(formatted);
    }

    function handleSubmit() {
        onSubmit({
            name,
            categoryCode: category,
            bonus: parseInt(bonus.replaceAll(".", "")) || 0,
            quantity: parseInt(quantity) || 0,
        });
    }

    return (
        <Flex justify="center" px={4} py={6}>
            <Box w="full" maxW="520px" borderRadius="3xl" bg="surface.base" px={10} py={10} boxShadow="card">
                <form>
                    <VStack align="stretch" gap={8}>

                        <HStack align="start" gap={4} mb={9}>
                            <Center
                                h={12}
                                minW={12}
                                borderRadius="2xl"
                                bg="brand.100"
                                fontSize="2xl"
                                color="brand.900"
                            >
                                <LuGoal />
                            </Center>

                            <VStack align="start" gap={1} flex={1}>
                                <Text textStyle="heading.section" color="text.primary">
                                    {title}
                                </Text>
                                <Text textStyle="body.xs" color="text.secondary" textAlign="left">
                                    Configura los objetivos de ventas para tu equipo
                                </Text>
                            </VStack>
                        </HStack>

                        <Field.Root required>
                            <VStack align="stretch" gap={2} w="full">
                                <Field.Label fontWeight="semibold" color="text.secondary">
                                    Nombre de la meta 🏁
                                </Field.Label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nombre de la meta"
                                    h={14}
                                    layerStyle="field"
                                />
                            </VStack>
                        </Field.Root>

                        <Field.Root required>
                            <VStack align="stretch" gap={2} w="full">
                                <Field.Label fontWeight="semibold" color="text.secondary">
                                    Seleccion de categoria 🍺
                                </Field.Label>
                                <Select.Root
                                    value={category ? [category] : []}
                                    onValueChange={(e) => setCategory(e.value[0])}
                                    collection={createListCollection({
                                        items: categories.map((c) => ({ label: c.name, value: c.code })),
                                    })}
                                    size="md"
                                >
                                    <Select.Trigger
                                        h={14}
                                        layerStyle="field"
                                        _focusVisible={{
                                            borderColor: "brand.300",
                                            boxShadow: "focusRingBrand",
                                            outlineWidth: 0,
                                        }}
                                    >
                                        <Select.ValueText
                                            placeholder="Categoría"
                                            color={category ? "text.primary" : "text.muted"}
                                        />
                                        <Select.Indicator />
                                    </Select.Trigger>

                                    <Select.Positioner>
                                        <Select.Content
                                            borderRadius="card"
                                            borderColor="border.default"
                                            bg="surface.base"
                                            p={2}
                                            boxShadow="menu"
                                        >
                                            {categories.map((c) => (
                                                <Select.Item
                                                    item={c.code}
                                                    key={c.code}
                                                    cursor="pointer"
                                                    borderRadius="xl"
                                                    px={3}
                                                    py={3}
                                                    color="text.primary"
                                                    _hover={{ bg: "brand.100" }}
                                                    _highlighted={{ bg: "brand.100" }}
                                                >
                                                    <Select.ItemText>{c.name}</Select.ItemText>
                                                    <Select.ItemIndicator />
                                                </Select.Item>
                                            ))}
                                        </Select.Content>
                                    </Select.Positioner>
                                </Select.Root>
                            </VStack>
                        </Field.Root>

                        <Field.Root required>
                            <VStack align="stretch" gap={2} w="full">
                                <Field.Label fontWeight="semibold" color="text.secondary">
                                    Valor del bono 💲
                                </Field.Label>
                                <InputGroup startElement="$" endElement="COP" w="full">
                                    <Input
                                        onChange={(e) => applyFormatToNumber(e.target.value)}
                                        placeholder="1.000.000"
                                        value={bonus}
                                        h={14}
                                        layerStyle="field"
                                    />
                                </InputGroup>
                                <Field.HelperText fontSize="xs" color="text.secondary">
                                    Este monto sera otorgado al cumplir el 100% de la meta.
                                </Field.HelperText>
                            </VStack>
                        </Field.Root>

                        <Field.Root required>
                            <VStack align="stretch" gap={2} w="full">
                                <Field.Label fontWeight="semibold" color="text.secondary">
                                    Objetivo de venta 🎯
                                </Field.Label>
                                <NumberInput.Root
                                    value={quantity}
                                    onValueChange={(e) => setQuantity(e.value)}
                                    defaultValue="100"
                                    min={1}
                                    max={1000000}
                                >
                                    <NumberInput.Input
                                        h={14}
                                        layerStyle="field"
                                    />
                                    <NumberInput.Control />
                                </NumberInput.Root>
                                <Field.HelperText fontSize="xs" color="text.secondary">
                                    Cuantos productos se necesitan vender para cumplir la meta.
                                </Field.HelperText>
                            </VStack>
                        </Field.Root>

                        <VStack align="stretch" gap={4} pt={2} mt={7}>
                            <Button
                                onClick={handleSubmit}
                                h={14}
                                borderRadius="2xl"
                                bg="brand.400"
                                fontSize="md"
                                fontWeight="semibold"
                                color="text.onInverse"
                                _hover={{ bg: "brand.500" }}
                            >
                                <LuSave />
                                {submitLabel}
                            </Button>

                            <Button
                                onClick={onCancel}
                                h={14}
                                borderRadius="2xl"
                                border="1px solid"
                                borderColor="border.strong"
                                bg="surface.base"
                                fontSize="md"
                                fontWeight="medium"
                                color="text.secondary"
                                _hover={{ bg: "surface.muted" }}
                            >
                                <LuX />
                                Cancelar
                            </Button>
                        </VStack>

                    </VStack>
                </form>
            </Box>
        </Flex>
    );
}
