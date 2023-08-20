import { Box, Flex, HStack, Link, Text, chakra } from '@chakra-ui/react'
import React from 'react'
import useWeb3 from '../../contexts/useWeb3'

const links = [
  {
    label: 'GeckoTerminal',
    href: 'https://www.geckoterminal.com/eth/pools/0x415b5ad4376255e6cc91be2a0e838b7c7845a28e',
    isExternal: true
  },
  {
    label: 'DexScan',
    href: 'https://coinmarketcap.com/dexscan/ethereum/0x415b5ad4376255e6cc91be2a0e838b7c7845a28e/',
    isExternal: true
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/tokenbot',
    isExternal: true
  },
  {
    label: 'Telegram',
    href: 'https://t.me/tokenbotofficial',
    isExternal: true
  }
]

const Footer = () => {
  const { block } = useWeb3()
  return (
    <Box as="footer">
      <Flex
        py={8}
        flexDirection={['column', 'column', 'row']}
        justifyContent="space-between"
        alignItems="center"
        as="footer"
      >
        <Box textAlign={['center', 'center', 'initial']}>
          <Text fontWeight="bold" fontSize="md">
            $TKB Staking DApp
          </Text>
          <Text fontSize="sm" color="gray.500">
            A simple UI for staking $TKB Uniswap V3 positions
          </Text>
        </Box>
        <Box>
          <HStack spacing={4}>
            {block != 0 && (
              <Link
                py={1}
                isExternal
                href="https://etherscan.io/blocks"
                fontSize="sm"
                display="ruby"
                _hover={{
                  color: 'orange.600'
                }}
              >
                <chakra.span
                  display="block"
                  h="10px"
                  w="10px"
                  bg="green.600"
                  rounded="full"
                />{' '}
                {block}
              </Link>
            )}

            {links.map(({ href, isExternal, label }) => (
              <Link
                py={1}
                key={label}
                href={href}
                fontSize="sm"
                isExternal={isExternal}
                rel="noopener noreferrer"
                _hover={{
                  color: 'orange.600'
                }}
              >
                {label}
              </Link>
            ))}
          </HStack>
          {/* <Text fontSize="xs" color="gray.500">
            
          </Text> */}
        </Box>
      </Flex>
    </Box>
  )
}

export default Footer
