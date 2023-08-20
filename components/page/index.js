import { Box, Flex } from '@chakra-ui/layout'
import Footer from './footer'
import Header from './header'
import Alerts from './alerts'
import React from 'react'
import Head from 'next/head'

import { useColorModeValue } from '@chakra-ui/color-mode'

const Layout = ({ children, title }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.800')

  return (
    <Flex
      minHeight="100vh"
      flexDirection="column"
      backgroundColor={bgColor}
      px={[4, 4, 12]}
    >
      <Head>
        <title>TokenBot</title>
        <link rel="icon" href="/favicon.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://earn.tokenbot.com" />
        <meta property="og:title" content="$TKB Uniswap V3 Staking DApp" />
        <meta
          property="og:description"
          content="Stake and Earn $TKB Rewards."
        />
        <meta property="og:site_name" content="TokenBot" />
        <meta
          property="og:image"
          content="https://dvuscm5v4ps9q.cloudfront.net/banner.png"
        />
      </Head>
      <Alerts />
      <Header />
      <Box flexGrow={1}>{children}</Box>
      <Footer />
    </Flex>
  )
}
export default Layout
