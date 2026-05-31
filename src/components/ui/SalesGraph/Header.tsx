"use client";

import type { ReactNode } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface HeaderProps {
    title: string;
    subtitle: string;
    children?: ReactNode;
}

export default function Header({ title, subtitle, children }: HeaderProps) {
    return (
        <Flex align="flex-start" justify="space-between" mb={3} px={1} gap={4}>
            <Box>
                <Heading as="h2" textStyle="heading.section" color="text.primary">
                    {title}
                </Heading>
                <Text textStyle="body.xs" color="text.muted" mt={0.5}>
                    {subtitle}
                </Text>
            </Box>

            {children && <Box flexShrink={0}>{children}</Box>}
        </Flex>
    );
}
