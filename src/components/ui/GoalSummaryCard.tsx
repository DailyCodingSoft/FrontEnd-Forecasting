import {
    Flex,
    Text,
    Progress,
    Icon,
    Badge,
} from "@chakra-ui/react";

import { LuFlag } from "react-icons/lu";
import Card from "@/components/ui/Card";

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
        palette: "success",
    },
    inactive: {
        label: "META INACTIVA",
        palette: "neutral",
    },
    completed: {
        label: "META COMPLETADA",
        palette: "info",
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
        <Card p={5} w="full" maxW="520px">
            <Flex justify="space-between" align="start" mb={4}>
                <Flex
                    direction="column"
                    align="start"
                    gap={1}
                >
                    <Badge
                        colorPalette={currentStatus.palette}
                        borderRadius="full"
                        px={2}
                        py={1}
                        fontSize="2xs"
                    >
                        {currentStatus.label}
                    </Badge>

                    <Text textStyle="heading.section" color="text.primary">
                        {goal.name}
                    </Text>

                    <Text textStyle="body.sm" color="text.secondary">
                        {goal.category}
                    </Text>
                </Flex>

                <Flex
                    bg="brand.50"
                    borderRadius="xl"
                    p={2.5}
                    align="center"
                    justify="center"
                >
                    <Icon
                        as={LuFlag}
                        boxSize={5}
                        color="brand.400"
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
                    fontWeight="semibold"
                    color="text.primary"
                >
                    {Math.round(percentage)}% completado
                </Text>

                <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    color="text.secondary"
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
                    bg="border.subtle"
                    borderRadius="full"
                    h="2.5"
                >
                    <Progress.Range
                        bg="brand.400"
                        borderRadius="full"
                    />
                </Progress.Track>
            </Progress.Root>
        </Card>
    );
}
