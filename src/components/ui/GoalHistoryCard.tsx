import { Badge, Box, Flex, FormatNumber, Icon, Progress, Stack, Tag, Text } from "@chakra-ui/react";
import type { Goal } from "@/types/goalTypes";
import { getCategoryVisual, getStatusVisual } from "@/constants/goalVisuals";

type GoalHistoryCardProps = {
    goal: Goal;
};

export default function GoalHistoryCard({ goal }: GoalHistoryCardProps) {
    const category = getCategoryVisual(goal.category);
    const status = getStatusVisual(goal.status);
    const soldUnits = Math.round((goal.progress / 100) * goal.quantity);

    return (
        <Box
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="2xl"
            shadow="sm"
            p="5"
            w="full"
        >
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
                        <Text fontWeight="bold" fontSize="md" color="gray.800" truncate>
                            {goal.name}
                        </Text>
                        <Tag.Root
                            width="fit-content"
                            fontSize="xs"
                            textTransform="uppercase"
                            letterSpacing="wide"
                            bg="gray.100"
                            color="gray.400"
                            borderRadius="sm"
                            px="1.5"
                            py="0.5"
                            borderWidth="0"
                        >
                            <Tag.Label>{goal.category}</Tag.Label>
                        </Tag.Root>
                    </Stack>
                </Flex>

                <Stack gap="0" align="end" flexShrink="0">
                    <Text fontSize="xs" textTransform="uppercase" letterSpacing="wide" color="gray.400">
                        Bono
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="gray.800" whiteSpace="nowrap">
                        <FormatNumber value={goal.bonus} style="currency" currency="COP" />
                    </Text>
                </Stack>
            </Flex>

            <Progress.Root value={goal.progress} colorPalette={status.palette} mt="4">
                <Flex justify="space-between" mb="1">
                    <Progress.Label fontSize="sm" color="gray.600">
                        Progreso
                    </Progress.Label>
                    <Progress.ValueText fontSize="sm" fontWeight="semibold" color={`${status.palette}.600`}>
                        {`${goal.progress}%`}
                    </Progress.ValueText>
                </Flex>
                <Progress.Track h="2" borderRadius="full" bg="gray.100">
                    <Progress.Range borderRadius="full" />
                </Progress.Track>
            </Progress.Root>

            <Flex
                justify="space-between"
                align="center"
                mt="4"
                pt="4"
                borderTop="1px solid"
                borderColor="gray.100"
            >
                <Flex gap="8">
                    <Stack gap="0">
                        <Text fontSize="xs" textTransform="uppercase" letterSpacing="wide" color="gray.400">
                            Objetivo
                        </Text>
                        <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                            {`${goal.quantity} Unidades`}
                        </Text>
                    </Stack>
                    <Stack gap="0">
                        <Text fontSize="xs" textTransform="uppercase" letterSpacing="wide" color="gray.400">
                            Unidades vendidas
                        </Text>
                        <Text fontSize="sm" fontWeight="semibold" color="gray.700">
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
        </Box>
    );
}
