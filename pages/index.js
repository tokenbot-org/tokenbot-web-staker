import React, { useEffect, useState } from 'react'
import {
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Image,
  Badge
} from '@chakra-ui/react'
import { Box, Heading, Text, Center, Link } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/color-mode'

import Page from '../components/page'
import FAQs from '../components/faqs'
import { useWeb3 } from '../contexts/useWeb3'
import { useAlerts } from '../contexts/useAlerts'

import { commas } from '../utils/helpers'

import {
  findNFTByPool,
  depositNFT,
  depositStakeNFT,
  stakeNFT,
  claimReward,
  exitPool,
  withdrawNFT,
  getPoolData
} from '../utils/pools'

import { comma } from '../utils/helpers'

// TKB PROGRAM
const IncentiveKey = [
  '0x16594930D16f3970e1a4317c6016555cb2e7b7Fc',
  '0x415B5ad4376255e6CC91bE2a0e838b7C7845a28e',
  1691172000,
  1754031540,
  '0xBB6c244Bb91d597740092A4b5f7dCE71f0eC6909'
]

// const IncentiveKey = [
//   '0x6123B0049F904d730dB3C36a31167D9d4121fA6B',
//   '0x94981F69F7483AF3ae218CbfE65233cC3c60d93a',
//   1633694400,
//   1638878400,
//   '0xDAEada3d210D2f45874724BeEa03C7d4BBD41674'
// ]


const programEmissions = 10000000
const secondsInAYear = 31540000

export default function Home() {
  const { account, block } = useWeb3()
  const { watchTx, addAlert } = useAlerts()
  const [positions, setPositions] = useState([])
  const [pool, setPool] = useState({})
  const cardBgColor = useColorModeValue('white', 'gray.700')
  const headerTextColor = useColorModeValue('black', 'white')

  const deposit = async (id) => {
    try {
      const tx = await depositStakeNFT(id, account, IncentiveKey)
      watchTx(tx.hash, 'Depositing NFT')
    } catch (error) {
      addAlert('fail', 'Program not active. Try later')
    }
  }

  const withdraw = async (id) => {
    const tx = await withdrawNFT(id, account)
    watchTx(tx.hash, 'Withdrawing NFT')
  }

  const stake = async (id) => {
    try {
      const tx = await stakeNFT(id, IncentiveKey)
      watchTx(tx.hash, 'Staking NFT')
    } catch (error) {
      console.log(error);
      addAlert('fail', 'Program not active. Try later')
    }
  }

  const claim = async (id, reward) => {
    const tx = await claimReward(id, account, reward, IncentiveKey)
    watchTx(tx.hash, 'Claiming rewards')
  }

  const exit = async (id, reward) => {
    const tx = await exitPool(id, account, reward, IncentiveKey)
    watchTx(tx.hash, 'Exiting pool & claiming rewards')
  }

  const inRange = (tick, lower, upper) => {
    return upper > tick && tick > lower
  }

  useEffect(async () => {
    if (account) {
      const lpPositions = await findNFTByPool(account, IncentiveKey)
      setPositions(lpPositions)
    }
    /// Calculate APY
    const data = await getPoolData(IncentiveKey[1], IncentiveKey[0])
    const emissionsPerSecond =
      programEmissions / (IncentiveKey[3] - IncentiveKey[2])
    const apy =
      ((emissionsPerSecond * data.token * secondsInAYear) / data.tvl) * 100
    setPool({ ...data, apy })
  }, [account, block])

  return (
    <Page title={pool.symbol ? pool.symbol + '/ETH' : false}>
      <Center>
        <Flex
          flexDirection="column"
          w="100%"
          maxW={{ base: '100%', md: 960 }}
          mt={16}
          alignItems="flex-start"
        >
          <Flex w="100%" maxW={['100%', 960]} mb={8}>
            <Stat>
              <StatLabel>TKB Price</StatLabel>
              <StatNumber>
                {pool.tvl ? `$${commas(pool.token, 4)}` : '$0.0'}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Pool TVL</StatLabel>
              <StatNumber>
                {pool.tvl ? `$${commas(pool.tvl, 2)}` : '$0.0'}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Staking APR</StatLabel>
              <StatNumber>
                {pool.apy ? `${commas(pool.apy, 2)}%` : '0.0%'}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Claimable Rewards</StatLabel>
              <StatNumber>
                {positions[0]
                  ? `${commas(
                      positions
                        .map((i) => (i.reward ? i.reward / 1e18 : 0))
                        .reduce((a, b) => a + b)
                    , 2)}`
                  : '0.0'}{' '}
                {`${pool.symbol ? pool.symbol : ''}`}
              </StatNumber>
            </Stat>
          </Flex>

          <Heading size="md" mb="5">
            {`Your ${pool.symbol ? pool.symbol : '???'}/ETH positions`}
          </Heading>
          <Box
            shadow="xl"
            borderRadius="2xl"
            p={4}
            bg={cardBgColor}
            borderWidth={1}
            w="100%"
            maxW={['100%', 960]}
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color={headerTextColor}>Token ID</Th>
                  <Th color={headerTextColor}>Location</Th>
                  <Th color={headerTextColor}>In Range?</Th>
                  <Th color={headerTextColor}>% of Pool</Th>
                  <Th color={headerTextColor}>Fees</Th>
                  <Th color={headerTextColor}>Rewards</Th>
                  <Th color={headerTextColor}>Actions</Th>
                </Tr>
              </Thead>

              {positions[0] ? (
                <Tbody>
                  {positions.map((position) => (
                    <Tr key={position.id}>
                      <Td fontSize="sm">
                        <Link
                          textDecoration="underline"
                          isExternal
                          href={`https://app.uniswap.org/#/pool/${position.id}`}
                        >
                          #{position.id}
                        </Link>
                      </Td>
                      <Td>
                        {!position.deposited && (
                          <Badge rounded="full" px="2" colorScheme="blue">
                            WALLET
                          </Badge>
                        )}
                        {position.deposited && !position.staked ? (
                          <Badge rounded="full" px="2" colorScheme="yellow">
                            STAKER
                          </Badge>
                        ) : null}
                        {position.deposited && position.staked ? (
                          <Badge rounded="full" px="2" colorScheme="green">
                            STAKED
                          </Badge>
                        ) : null}
                      </Td>
                      <Td>
                        {inRange(
                          pool.tick,
                          position.tickLower,
                          position.tickUpper
                        ) ? (
                          <Badge rounded="full" px="2" colorScheme="green">
                            YES
                          </Badge>
                        ) : (
                          <Badge rounded="full" px="2" colorScheme="red">
                            NO
                          </Badge>
                        )}
                      </Td>
                      <Td>
                        <Badge rounded="full" px="2" colorScheme="blue">
                          {(
                            (position.liquidity / pool.liquidity) *
                            100
                          ).toFixed(3)}
                          %
                        </Badge>
                      </Td>
                      <Td fontSize="sm" w="fit-content">
                        <Box>
                          {commas(position.fees0, 2)} <b>{pool.symbol}</b>
                        </Box>
                        <Box>
                          {commas(position.fees1)} <b>WETH</b>
                        </Box>
                      </Td>

                      <Td fontSize="sm">
                        {commas(position.reward / 1e18, 2)} {pool.symbol}
                      </Td>
                      <Td isNumeric>
                        <Flex>
                          {!position.deposited && (
                            <Button
                              colorScheme="blue"
                              mr="2"
                              onClick={() => deposit(position.id)}
                            >
                              Deposit LP
                            </Button>
                          )}
                          {position.deposited && !position.staked ? (
                            <>
                              <Button
                                colorScheme="orange"
                                mr="2"
                                onClick={() => stake(position.id)}
                              >
                                Stake LP
                              </Button>
                              <Button
                                colorScheme="gray"
                                mr="2"
                                onClick={() => withdraw(position.id)}
                              >
                                Withdraw
                              </Button>
                            </>
                          ) : null}
                          {position.deposited && position.staked ? (
                            <>
                              <Button
                                colorScheme="red"
                                mr="2"
                                onClick={() =>
                                  claim(position.id, position.reward)
                                }
                              >
                                Claim
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() =>
                                  exit(position.id, position.reward)
                                }
                              >
                                Unstake
                              </Button>
                            </>
                          ) : null}
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              ) : null}
            </Table>
            {!positions[0] && (
              <Center flexDirection="column" p="6">
                <Heading size="sm">{`No ${
                  pool.symbol ? pool.symbol : '???'
                } positions found!`}</Heading>
                <Text>
                  {`Deposit `}
                  <Link
                    isExternal
                    href={`https://app.uniswap.org/#/add/ETH/${IncentiveKey[0]}/10000`}
                  >
                    <b>{`${pool.symbol ? pool.symbol : '???'} & ETH here`}</b>
                  </Link>
                  {` to get started`}{' '}
                </Text>
              </Center>
            )}
          </Box>
          <FAQs />
        </Flex>
      </Center>
    </Page>
  )
}
