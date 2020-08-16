/** @jsx jsx */
import { jsx, Heading, Text } from "theme-ui"
import PageTitle from "../components/page_title"
import Layout from "../components/layout"
import PropTypes from "prop-types"

function Paragraph({ children }) {
  return (
    <Text
      sx={{
        fontSize: 3,
        mb: 3,
      }}
    >
      {children}
    </Text>
  )
}
Paragraph.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
}

export default function HomePage() {
  return (
    <Layout>
      <PageTitle>Berkeley Gateway to Innovation</PageTitle>
      <Heading>Why Berkeley?</Heading>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Paragraph>
      <Heading>Stats</Heading>
      <Paragraph>
        In 2019:
        <br />
        <strong>#1</strong> public university
        <br />
        <strong>#2</strong> university for entrepreneurship
        <br />
        <strong>#4</strong> in number of successful company founders
        <br />
        <strong>1652</strong> startup founders
        <br />
        <strong>1481</strong> startups
        <br />
        <strong>$37579.58</strong> of capital raised
        <br />
        <strong>$779.8</strong> in research funding
        <br />
        <strong>1649</strong> total active inventions
        <br />
        <strong>774</strong> active U.S. patents
        <br />
        <strong>814</strong> active foreign patents
      </Paragraph>
      <Heading>Notable Alumni:</Heading>
      <Paragraph>
        <strong>Steve Wozniak</strong>, &apos;86
        <br />
        <strong>Tom Anderson</strong>, &apos;98
        <br />
        <strong>Marc Tarpenning</strong>, &apos;85
        <br />
        ...
      </Paragraph>
    </Layout>
  )
}
