import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Text,
  ListItem,
  OrderedList,
  UnorderedList,
  Link
} from '@chakra-ui/react'

export default function FAQs() {
  return (
    <>
      <Heading ml="4" mt="16" mb="4" size="md">
        Frequently Asked Questions
      </Heading>
      <Accordion w="full" allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="600">
                What is TokenBot ($TKB)?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>
              <Link href="https://www.tokenbot.com" isExternal fontWeight="bold" textDecoration="underline">
                TokenBot
              </Link>{' '}
              is a crypto trading platform powered by{' '}
              <Link href="https://coinmarketcap.com/currencies/tokenbot/" isExternal fontWeight="bold" textDecoration="underline">
                $TKB
              </Link>.
            </Text>
            <br />
            <Text>
              The TokenBot Trading Engine is a groundbreaking solution for high-frequency, low-latency automated trading in the crypto domain. With this engine, you can seamlessly link and mirror trades from one API key to another in real-time.
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="600">
                How do I stake my TKB tokens?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>{`In order to participate in the rewards program you must provide liquidity to a specific pool and then stake it in the staking contract. `}</Text>
            <br />
            <Text>{`The steps are as follows:`}</Text>
            <OrderedList>
              <ListItem>
                {`Go to the  `}
                <Link
                  href="https://app.uniswap.org/#/add/ETH/0x6123B0049F904d730dB3C36a31167D9d4121fA6B/10000"
                  isExternal fontWeight="bold" textDecoration="underline"
                >{`Uniswap v3 "Add Liquidity" page for TKB & ETH.`}</Link>
              </ListItem>
              <ListItem>{`Select a range for your liquidity and supply the tokens.`}</ListItem>
              <ListItem>{`Click "Connect Wallet" and choose a wallet provider.`}</ListItem>
              <ListItem>{`Your LP NFTs will populate in the UI, select "Deposit" to transfer it ot the staking contract`}</ListItem>
              <ListItem>{`Once the token is transfered, you must select "Stake" to start earning rewards.`}</ListItem>
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="600">
                How do I claim my rewards?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>{`Once you have staked your NFT in the contract, denoted by a green "STAKED" badge in the UI, you will start to see rewards accruing. These rewards remain in the staking contract until you use the "Claim" or "Exit" buttons:`}</Text>
            <br />
            <UnorderedList>
              <ListItem>
                <b>Claim:</b>{' '}
                {`When you click "Claim" you are withdrawing your accumulated rewards to your wallet but your NFT stays within the staking contract, continuing to accrue rewards.`}{' '}
              </ListItem>
              <ListItem>
                <b>Exit:</b>{' '}
                {`When you click "Exit" you are withdrawing your accrued rewards and your NFT to your wallet. You will no longer accrue rewards, but you now can adjust your liquidity or withdraw your liquidity.`}{' '}
              </ListItem>
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="600">
                I don't see my Uniswap LP position on the Uniswap website anymore. Why?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>When you stake your NFT, your NFT will be temporarily held on the Staker contract. This gives it the ability to earn RBN rewards for providing liquidity. When you Exit, the NFT will be returned back to your wallet.</Text>
            <br />
            <Text>To see details of the position, click the 'Token ID' link on the left-hand side of the position.</Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  )
}
