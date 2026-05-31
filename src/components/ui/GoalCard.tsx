import { Box, IconButton, Icon, Stat, FormatNumber, Progress, HStack, Grid, Text } from "@chakra-ui/react"
import { LuPencil, LuDollarSign, LuChartNoAxesCombined } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import MutedTag from "@/components/ui/MutedTag"
import type { Goal, GoalRequest } from "@/types/goalTypes"

type GoalCardProps = {
    name: string;
    progress: number;
    categorie: string;
    bonus: number
    goal: Goal | GoalRequest;
    onBonusClick?: () => void;
}

export default function GoalCard(props: GoalCardProps) {
    const navigate = useNavigate()

    return (
        <Grid
            gridTemplateColumns="auto 1fr auto auto auto auto"
            gridTemplateRows="auto auto"
            alignItems="center"
            columnGap="3"
            rowGap="1"
            px="4"
            py="3"
            bg="surface.muted"
            borderRadius="card"
            border="1px solid"
            borderColor="border.default"
            shadow="card"
            w="full"
            maxW="full"
        >
            <Icon size="lg" gridRow="1 / 3" gridColumn="1" alignSelf="center" color="brand.400">
                <LuChartNoAxesCombined />
            </Icon>

            <Progress.Root colorPalette="brand" value={props.progress} gridRow="1" gridColumn="2" width="full" minW="0">
                <HStack gap="4" minW="0">
                    <Progress.Label fontWeight="semibold" fontSize="sm" truncate>{props.name}</Progress.Label>
                    <Progress.Track flex="1" h="2" borderRadius="full" bg="border.default">
                        <Progress.Range borderRadius="full" bg="brand.400" />
                    </Progress.Track>
                    <Progress.ValueText fontSize="xs" color="text.muted" whiteSpace="nowrap">{`${props.progress}%`}</Progress.ValueText>
                </HStack>
            </Progress.Root>

            <Box gridRow="2" gridColumn="2">
                <MutedTag label={props.categorie} />
            </Box>

            <Stat.Root gridRow="1 / 3" gridColumn="3" alignSelf="center" textAlign="right" pl="4" borderLeft="1px solid" borderColor="border.default">
                <Stat.Label textStyle="metaLabel" letterSpacing="wide" color="text.muted" whiteSpace="nowrap">Bono acumulado</Stat.Label>
                <Stat.ValueText fontSize="xl" fontWeight="bold" color="success.500" whiteSpace="nowrap">
                    <FormatNumber value={props.bonus} style="currency" currency="COP" />
                </Stat.ValueText>
            </Stat.Root>

            <IconButton variant="outline" gridRow="1 / 3" gridColumn="4" alignSelf="center" size="sm" rounded="lg" color="text.secondary" onClick={props.onBonusClick}>
                <LuPencil />
            </IconButton>

            <IconButton onClick={() => navigate(`/edit/goal/${encodeURIComponent(props.goal.name)}`, { state: { goal: props.goal } })} variant="outline" gridRow="1 / 3" gridColumn="5" alignSelf="center" size="sm" rounded="lg" color="danger.500">
                <LuPencil />
            </IconButton>

            <IconButton variant="outline" gridRow="1 / 3" gridColumn="6" alignSelf="center" size="sm" rounded="lg" color="text.secondary">
                <LuDollarSign />
            </IconButton>

            <Text
                gridRow="3"
                gridColumn="4 / 7"
                justifySelf="center"
                fontSize="xs"
                fontWeight="semibold"
                color="brand.500"
                cursor="pointer"
                _hover={{ color: "brand.600", textDecoration: "underline" }}
                onClick={() => navigate(`/goals/discount/${encodeURIComponent(props.goal.name)}`)}
            >
                Ver prediccion de precios
            </Text>
        </Grid>
    )
}
