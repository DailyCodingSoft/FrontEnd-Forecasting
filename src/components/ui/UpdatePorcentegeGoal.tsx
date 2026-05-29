import { useMemo, useState } from "react"
import {
    Button,
    Dialog,
    Field,
    HStack,
    Input,
    Portal,
    Progress,
    Text,
    VStack
} from "@chakra-ui/react"
import type { Goal } from "@/types/goalTypes"

type GoalProgressDialogProps = {
    open: boolean
    onClose: () => void
    goal: Goal
    onSubmit: (data: Goal) => Promise<void> | void
}
export default function GoalProgressDialog(props: GoalProgressDialogProps) {

    const [quantity, setQuantity] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const [showCompleteWarning, setShowCompleteWarning] = useState(false)
    const [showCompletedAlert, setShowCompletedAlert] = useState(false)
    /*
        Ejemplo:
        Meta total = 100 ventas
        Lleva = 40%

        Usuario agrega 30 ventas
        Nuevo progreso = 70%
    */
    const addedProgress = useMemo(() => {
        if (!props.goal || quantity <= 0)
            return props.goal?.progress || 0
        return Math.min(
            (props.goal?.progress || 0) + (quantity / (props.goal?.quantity || 1)) * 100
        )
    }, [
        quantity,
        props.goal?.quantity,
    ])
    async function submitGoal(completed: boolean) {

    try {

        if (!props.goal) return

        const updatedGoal: Goal = {
            ...props.goal,
            progress: addedProgress,
            status: completed ? "1" : "3"
        }

        setLoading(true)

        await props.onSubmit(updatedGoal)

        handleClose()

    } catch (error) {

        console.error(error)

    } finally {

        setLoading(false)

    }
}
    async function handleSubmit() {

        const completed = addedProgress >= 100

        if (addedProgress >= 100) {
            setShowCompletedAlert(true)
            return
        } 
        if (completed && !showCompleteWarning) {
            setShowCompleteWarning(true)
            return
        }
        try {
            setLoading(true)

            const updatedGoal: Goal = {
            ...props.goal,
            progress: addedProgress,
            status: "3"
        }
        setLoading(true)

        await props.onSubmit(updatedGoal)
            handleClose()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    function handleClose() {
        setQuantity(0)
        setShowCompleteWarning(false)
        props.onClose()
    }
    return (
        <Dialog.Root
            open={props.open}
            onOpenChange={(e) => { if (!e.open) handleClose() }}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content rounded="2xl">
                        <Dialog.Header>
                            <Dialog.Title>Agregar progreso</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <VStack gap="5" align="stretch">
                                <VStack align="stretch" gap="1">
                                    <Text fontSize="sm" color="text.secondary">Meta seleccionada</Text>
                                    <Text fontWeight="bold" fontSize="lg">{props.goal?.name}</Text>
                                </VStack>
                                <VStack align="stretch" gap="3">
                                    <HStack justify="space-between">
                                        <Text fontSize="sm" color="text.secondary">Progreso actual</Text>
                                        <Text fontWeight="bold">{props.goal?.progress?.toFixed(1)}%</Text>
                                    </HStack>
                                    <Progress.Root value={addedProgress} colorPalette={addedProgress >= 100 ? "success" : "brand"}>
                                        <Progress.Track h="3" rounded="full">
                                            <Progress.Range rounded="full" />
                                        </Progress.Track>
                                    </Progress.Root>
                                    <HStack justify="space-between">
                                        <Text fontSize="sm" color="text.secondary">Nuevo progreso</Text>
                                        <Text fontWeight="bold" color={addedProgress >= 100 ? "success.500" : "brand.500"}>{addedProgress.toFixed(1)}%</Text>
                                    </HStack>
                                </VStack>
                                <Field.Root>
                                    <Field.Label>Cantidad vendida</Field.Label>
                                    <Input
                                        type="number"
                                        placeholder="Ej: 25"
                                        value={quantity || ""}
                                        onChange={(e) => {
                                            setQuantity(
                                                Number(e.target.value)
                                            )
                                        }}
                                    />
                                    <Field.HelperText>
                                        Esta cantidad actualizará el progreso de la meta.
                                    </Field.HelperText>
                                </Field.Root>
                                {
                                    showCompleteWarning && (
                                        <Text
                                            color="brand.500"
                                            fontWeight="semibold"
                                            fontSize="sm"
                                        >
                                            Esta acción completará la meta.
                                            ¿Deseas marcarla como completada?
                                        </Text>
                                    )
                                }
                            </VStack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <HStack>
                                <Button
                                    variant="outline"
                                    onClick={handleClose}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    colorPalette={
                                        addedProgress >= 100
                                            ? "success"
                                            : "brand"
                                    }
                                    loading={loading}
                                    onClick={handleSubmit}
                                >
                                    {
                                        addedProgress >= 100
                                            ? "Completar meta"
                                            : "Guardar progreso"
                                    }
                                </Button>
                            </HStack>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
            <Dialog.Root
                open={showCompletedAlert}
                onOpenChange={(e) => {
                    setShowCompletedAlert(e.open)
                }}
            >
                <Portal>

                    <Dialog.Backdrop />

                    <Dialog.Positioner>

                        <Dialog.Content
                            maxW="sm"
                            rounded="2xl"
                        >

                            <Dialog.Header>
                                <Dialog.Title>
                                    Meta cumplida 🎉
                                </Dialog.Title>
                            </Dialog.Header>

                            <Dialog.Body>

                                <Text>
                                    El progreso alcanzó el 100%.
                                    ¿Deseas marcar esta meta como completada?
                                </Text>

                            </Dialog.Body>

                            <Dialog.Footer>

                                <HStack>

                                    <Button
                                        variant="outline"
                                        onClick={async () => {
                                            setShowCompletedAlert(false)
                                            await submitGoal(false)
                                        }}
                                    >
                                        NO cerrar meta
                                    </Button>

                                    <Button
                                        colorPalette="success"
                                        loading={loading}
                                        onClick={async () => {

                                            setShowCompletedAlert(false)

                                            await submitGoal(true)
                                        }}
                                    >
                                        Cerrar meta
                                    </Button>

                                </HStack>

                            </Dialog.Footer>

                        </Dialog.Content>

                    </Dialog.Positioner>

                </Portal>
            </Dialog.Root>
        </Dialog.Root>

    )
}