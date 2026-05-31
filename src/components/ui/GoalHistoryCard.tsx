import { Badge, Flex, FormatNumber, Icon, Progress, Stack, Text } from "@chakra-ui/react";
import type { Goal } from "@/types/goalTypes";
import { getCategoryVisual, getStatusVisual } from "@/constants/goalVisuals";
import Card from "@/components/ui/Card";
import MetaLabel from "@/components/ui/MetaLabel";
import MutedTag from "@/components/ui/MutedTag";

type GoalHistoryCardProps = {
    goal: Goal;
};

export default function GoalHistoryCard({ goal }: GoalHistoryCardProps) {
    const category = getCategoryVisual(goal.category);
    const status = getStatusVisual(goal.status);
    const soldUnits = Math.round((goal.progress / 100) * goal.quantity);

    return (
        <Card p="5" w="full">
            <Flex justify="space-between" align="start" gap="4">
                <Flex align="center" gap="3" minW="0">
                    <Flex
                        align="center"
                        justify="center"
                        boxSize="10"
                        borderRadius="lg"
                        bg={`${category.palette}.50`}
                        flexShrink="0"
                    >
                        <Icon as={category.icon} boxSize="5" color={`${category.palette}.500`} />
                    </Flex>
                    <Stack gap="1" minW="0">
                        <Text fontWeight="bold" fontSize="md" color="text.primary" truncate>
                            {goal.name}
                        </Text>
                        <MutedTag label={goal.category} />
                    </Stack>
                </Flex>

                <Stack gap="0" align="end" flexShrink="0">
                    <MetaLabel>Bono</MetaLabel>
                    <Text fontSize="lg" fontWeight="bold" color="text.primary" whiteSpace="nowrap">
                        <FormatNumber value={goal.bonus} style="currency" currency="COP" />
                    </Text>
                </Stack>
            </Flex>

            <Progress.Root value={goal.progress} colorPalette={status.palette} mt="4">
                <Flex justify="space-between" mb="1">
                    <Progress.Label fontSize="sm" color="text.secondary">
                        Progreso
                    </Progress.Label>
                    <Progress.ValueText fontSize="sm" fontWeight="semibold" color={`${status.palette}.600`}>
                        {`${goal.progress}%`}
                    </Progress.ValueText>
                </Flex>
                <Progress.Track h="2" borderRadius="full" bg="border.subtle">
                    <Progress.Range borderRadius="full" />
                </Progress.Track>
            </Progress.Root>

            <Flex
                justify="space-between"
                align="center"
                mt="4"
                pt="4"
                borderTop="1px solid"
                borderColor="border.subtle"
            >
                <Flex gap="8">
                    <Stack gap="0">
                        <MetaLabel>Objetivo</MetaLabel>
                        <Text fontSize="sm" fontWeight="semibold" color="text.primary">
                            {`${goal.quantity} Unidades`}
                        </Text>
                    </Stack>
                    <Stack gap="0">
                        <MetaLabel>Unidades vendidas</MetaLabel>
                        <Text fontSize="sm" fontWeight="semibold" color="text.primary">
                            {`${soldUnits} Unidades`}
                        </Text>
                    </Stack>
                </Flex>

                <Badge
                    colorPalette={status.palette}
                    borderRadius="md"
                    px="2"
                    py="1"
                    textTransform="uppercase"
                    fontSize="xs"
                >
                    {status.label}
                </Badge>
            </Flex>
        </Card>
    );
}
