import { IconButton, Tag, Icon, Stat, FormatNumber, Progress, HStack, Grid } from "@chakra-ui/react"
import { LuPencil, LuDollarSign, LuChartNoAxesCombined } from "react-icons/lu"

type GoalCardProps = {
    name: string;
    progress: number;
    categorie: string;
    bonus: number
    onBonusClick?: () => void;
}

export default function GoalCard(props: GoalCardProps) {

    return (
        <Grid
           gridTemplateColumns="auto 1fr auto auto auto"
    gridTemplateRows="auto auto"
    alignItems="center"
    columnGap="3"
    rowGap="1"
    px="4"
    py="3"
    bg="gray.50"
    borderRadius="2xl"
    border="1px solid"
    borderColor="gray.200"
    shadow="sm"
    w="full"
    maxW="full"
        >
            <Icon size="lg" gridRow="1 / 3" gridColumn="1" alignSelf="center" color="amber.400">
                <LuChartNoAxesCombined />
            </Icon>

            <Progress.Root colorPalette={"green"} value={props.progress} gridRow="1" gridColumn="2" width="full" minW="0">
                <HStack gap="4"  minW="0">
                    <Progress.Label className="font-semibold text-sm truncate">{props.name}</Progress.Label>
                    <Progress.Track flex="1" h="2" borderRadius="full" bg="gray.200">
                        <Progress.Range borderRadius="full" bg="amber.400" />
                    </Progress.Track>
                    <Progress.ValueText className="text-xs text-gray-400 whitespace-nowrap">{`${props.progress}%`}</Progress.ValueText>
                </HStack>
            </Progress.Root>

            <Tag.Root gridRow="2" gridColumn="2" width="fit-content" className="text-[11px] uppercase tracking-wide bg-gray-100 text-gray-400 rounded px-1.5 py-0.5 border-0">
                <Tag.Label>{props.categorie}</Tag.Label>
            </Tag.Root>

            <Stat.Root gridRow="1 / 3" gridColumn="3" alignSelf="center" textAlign="right" pl="4" borderLeft="1px solid" borderColor="gray.200">
                <Stat.Label className="text-[11px] uppercase tracking-wide text-gray-300 whitespace-nowrap">Bono acumulado</Stat.Label>
                <Stat.ValueText className="text-xl font-bold text-green-500 whitespace-nowrap">
                    <FormatNumber value={props.bonus} style="currency" currency="COP" />
                </Stat.ValueText>
            </Stat.Root>

            <IconButton variant="outline" gridRow="1 / 3" gridColumn="4" alignSelf="center" size="sm" rounded="lg" color="gray.500" onClick={props.onBonusClick}>
                <LuPencil />
            </IconButton>

            <IconButton variant="outline" gridRow="1 / 3" gridColumn="5" alignSelf="center" size="sm" rounded="lg" color="gray.500">
                <LuDollarSign />
            </IconButton>
        </Grid>
    )
}