"use client";

import { HStack, SegmentGroup, Spacer, Text } from "@chakra-ui/react";
import type { TimeRange } from "./types";
import { TIME_RANGES, WEEKS_BY_RANGE } from "./constants";

interface TimeRangeBarProps {
    range: TimeRange;
    onChange: (range: TimeRange) => void;
    weeks: number[];
    allWeekNumbers: number[];
}

export default function TimeRangeBar({
    range,
    onChange,
    weeks,
    allWeekNumbers,
}: TimeRangeBarProps) {
    const items = TIME_RANGES.map(({ label, value }) => {
        const required = WEEKS_BY_RANGE[value];
        const disabled = required !== null && allWeekNumbers.length < required;
        return { label, value, disabled };
    });

    return (
        <HStack mb={3} px={1} gap={1}>
            <SegmentGroup.Root
                size="sm"
                value={range}
                onValueChange={({ value }) => {
                    if (value) onChange(value as TimeRange);
                }}
            >
                <SegmentGroup.Indicator />
                {items.map(({ label, value, disabled }) => (
                    <SegmentGroup.Item key={value} value={value} disabled={disabled}>
                        <SegmentGroup.ItemText>{label}</SegmentGroup.ItemText>
                        <SegmentGroup.ItemHiddenInput />
                    </SegmentGroup.Item>
                ))}
            </SegmentGroup.Root>

            <Spacer />

            {weeks.length > 0 && (
                <Text fontSize="xs" color="gray.400" fontVariantNumeric="tabular-nums">
                    S{weeks[0]} – S{weeks[weeks.length - 1]}
                </Text>
            )}
        </HStack>
    );
}
