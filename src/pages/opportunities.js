/** @jsx jsx */
import { jsx, Card, Heading, Text, Link, Flex, AspectImage } from "theme-ui"
import { graphql } from "gatsby"
import moment from "moment"
import PageTitle from "../components/page_title"
import Layout from "../components/layout"
import PropTypes from "prop-types"

export const query = graphql`
  query opportunitiesPageQuery {
    allOpportunitiesJson(sort: { fields: date, order: ASC }) {
      nodes {
        title
        url
        org
        date
        description
        id
      }
    }
    allImageSharp(
      filter: { fluid: { originalName: { eq: "opportunity_placholder.png" } } }
    ) {
      nodes {
        fluid {
          src
        }
      }
    }
  }
`

export default function OpportunitiesPage({ data }) {
  const allOpportunities = data.allOpportunitiesJson.nodes.filter(
    (opportunity) => moment(opportunity.date).diff(moment()) > 0
  )
  const closestOpportunity = allOpportunities[0]
  const placeholderImage = data.allImageSharp.nodes[0].fluid.src

  return (
    <Layout>
      <PageTitle>Opportunities</PageTitle>
      <Heading sx={{ mb: 3 }}>Closest Deadline:</Heading>
      <OpportunityCard
        isClosest
        opportunity={closestOpportunity}
        placeholderImage={placeholderImage}
      />
      <Heading sx={{ mb: 3 }}>Upcoming:</Heading>
      {allOpportunities.slice(1).map((opportunity) => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </Layout>
  )
}
OpportunitiesPage.propTypes = {
  data: PropTypes.object.isRequired,
}

function OpportunityCard({ isClosest, opportunity, placeholderImage }) {
  return (
    <Card
      key={opportunity.id}
      sx={{
        mb: isClosest ? 5 : 3,
        boxShadow: isClosest ? "large" : "small",
      }}
    >
      {isClosest ? (
        <AspectImage
          ratio={16 / 9}
          src={opportunity.image || placeholderImage}
        />
      ) : null}
      <Heading variant="cardTitle" sx={{ mt: isClosest ? 3 : "inherit" }}>
        <Link href={opportunity.url}>{opportunity.title}</Link>
      </Heading>
      <Flex
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Heading variant="subtitle">{opportunity.org}</Heading>
        <Text sx={{ mr: 2, fontWeight: 700 }}>
          Due {moment(opportunity.date).format("MM/DD/YYYY")}
        </Text>
      </Flex>
      <Text>{opportunity.description}</Text>
    </Card>
  )
}
OpportunityCard.propTypes = {
  isClosest: PropTypes.bool,
  opportunity: PropTypes.object.isRequired,
  placeholderImage: PropTypes.string,
}
