import { useEffect, useState } from "react";
import { Button, Flex, Heading, Input, InputGroup, Stack, Text } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import GoalHistoryCard from "@/components/ui/GoalHistoryCard";
import StatusCard from "@/components/ui/StatusCard";
import { getAllGoals } from "@/services/goals";
import type { Goal } from "@/types/goalTypes";

const ALL_STATUSES = "";

const statusTabs: { value: string; label: string }[] = [
    { value: ALL_STATUSES, label: "Todas" },
    { value: "active", label: "Activas" },
    { value: "inactive", label: "Inactivas" },
    { value: "completed", label: "Completadas" },
];

type FetchState =
    | { status: "loading" }
    | { status: "error"; message: string }
    | { status: "ready"; goals: Goal[] };

export default function GoalHistory() {
    const [fetchState, setFetchState] = useState<FetchState>({ status: "loading" });
    const [statusFilter, setStatusFilter] = useState<string>(ALL_STATUSES);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        let cancelled = false;
        const fetchGoals = async () => {
            try {
                const goals = await getAllGoals();
                if (cancelled) return;
                setFetchState({ status: "ready", goals });
            } catch (error) {
                console.error("Error fetching goals history:", error);
                if (cancelled) return;
                setFetchState({ status: "error", message: "No se pudo cargar el historial." });
            }
        };
        fetchGoals();
        return () => {
            cancelled = true;
        };
    }, []);

    const allGoals = fetchState.status === "ready" ? fetchState.goals : [];
    const term = search.trim().toLowerCase();
    const visibleGoals = allGoals.filter(
        (g) =>
            (statusFilter === ALL_STATUSES || g.status === statusFilter) &&
            (term === "" || g.name.toLowerCase().includes(term)),
    );

    return (
        <Flex direction="column" gap={6} p={6} maxW="5xl" mx="auto">
            <Flex direction="column" gap={1}>
                <Heading as="h1" textStyle="heading.page" color="text.primary">
                    Historial de Metas
                </Heading>
                <Text textStyle="body.sm" color="text.secondary">
                    Consulta de metas y su resultado — solo lectura
                </Text>
            </Flex>

            <Flex gap="2" wrap="wrap">
                {statusTabs.map((tab) => {
                    const active = statusFilter === tab.value;
                    return (
                        <Button
                            key={tab.value || "all"}
                            onClick={() => setStatusFilter(tab.value)}
                            size="sm"
                            variant="outline"
                            borderRadius="full"
                            borderColor="border.default"
                            bg={active ? "surface.inverse" : "transparent"}
                            color={active ? "text.onInverse" : "text.secondary"}
                            textTransform="uppercase"
                            letterSpacing="wide"
                            fontSize="xs"
                            _hover={{ bg: active ? "neutral.800" : "surface.muted" }}
                        >
                            {tab.label}
                        </Button>
                    );
                })}
            </Flex>

            <InputGroup startElement={<LuSearch />} maxW="md">
                <Input
                    placeholder="Buscar por nombre..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    bg="surface.base"
                    borderColor="border.default"
                    borderRadius="xl"
                />
            </InputGroup>

            {fetchState.status === "loading" && <StatusCard>Cargando historial…</StatusCard>}

            {fetchState.status === "error" && <StatusCard>{fetchState.message}</StatusCard>}

            {fetchState.status === "ready" &&
                (visibleGoals.length > 0 ? (
                    <Stack gap="4">
                        {visibleGoals.map((goal) => (
                            <GoalHistoryCard key={goal.name} goal={goal} />
                        ))}
                    </Stack>
                ) : (
                    <StatusCard>No hay metas para mostrar.</StatusCard>
                ))}
        </Flex>
    );
}
