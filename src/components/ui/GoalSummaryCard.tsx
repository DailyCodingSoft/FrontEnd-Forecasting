import {
    Box,
    Flex,
    Text,
    Progress,
    Icon,
    Badge,
} from "@chakra-ui/react";

import { LuFlag } from "react-icons/lu";

type GoalSummaryCardProps = {
    goal: {
        name: string;
        progress: number;
        category: string;
        bonus: number;
        status: string;
        quantity: number;
    };
};

const statusConfig = {
    active: {
        label: "META ACTIVA",
        colorScheme: "green",
    },
    inactive: {
        label: "META INACTIVA",
        colorScheme: "gray",
    },
    completed: {
        label: "META COMPLETADA",
        colorScheme: "blue",
    },
};

export default function GoalSummaryCard({
    goal,
}: GoalSummaryCardProps) {

    const percentage =
        goal.quantity > 0
            ? (goal.progress / goal.quantity) * 100
            : 0;

    const currentStatus =
        statusConfig[
        goal.status as keyof typeof statusConfig
        ] ?? statusConfig.inactive;

    return (
        <Box
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="2xl"
            p={5}
            shadow="sm"
            w="full"
            maxW="520px"
        >
            <Flex justify="space-between" align="start" mb={4}>
                <Flex
                    direction="column"
                    align="start"
                    gap={1}
                >
                    <Badge
                        colorScheme={currentStatus.colorScheme}
                        borderRadius="full"
                        px={2}
                        py={1}
                        fontSize="10px"
                    >
                        {currentStatus.label}
                    </Badge>

                    <Text
                        fontSize="xl"
                        fontWeight="700"
                        color="gray.800"
                        lineHeight="1.2"
                    >
                        {goal.name}
                    </Text>

                    <Text
                        fontSize="sm"
                        color="gray.500"
                        lineHeight="1"
                    >
                        {goal.category}
                    </Text>
                </Flex>

                <Flex
                    bg="orange.50"
                    borderRadius="xl"
                    p={2.5}
                    align="center"
                    justify="center"
                >
                    <Icon
                        as={LuFlag}
                        boxSize={5}
                        color="orange.400"
                    />
                </Flex>
            </Flex>

            <Flex
                justify="space-between"
                align="center"
                mb={2}
            >
                <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="gray.700"
                >
                    {Math.round(percentage)}% completado
                </Text>

                <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="gray.500"
                >
                    {goal.progress.toLocaleString()} / {goal.quantity.toLocaleString()}
                </Text>
            </Flex>

            <Progress.Root
                value={percentage}
                size="sm"
                borderRadius="full"
            >
                <Progress.Track
                    bg="gray.100"
                    borderRadius="full"
                    h="2.5"
                >
                    <Progress.Range
                        bg="orange.400"
                        borderRadius="full"
                    />
                </Progress.Track>
            </Progress.Root>
        </Box>
    );
}