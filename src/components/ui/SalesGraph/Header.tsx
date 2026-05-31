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
                <Heading
                    as="h2"
                    fontSize="xl"
                    fontWeight="bold"
                    color="gray.800"
                    letterSpacing="tight"
                >
                    {title}
                </Heading>
                <Text fontSize="xs" color="gray.400" mt={0.5}>
                    {subtitle}
                </Text>
            </Box>

            {children && <Box flexShrink={0}>{children}</Box>}
        </Flex>
    );
}
