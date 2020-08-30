/** @jsx jsx */
import { jsx, Card, Heading, Text, Link, Flex } from "theme-ui"
import { graphql } from "gatsby"
import moment from "moment"
import PageTitle from "../components/page_title"
import Layout from "../components/layout"
import PropTypes from "prop-types"

export const query = graphql`
  query EventsPageQuery {
    allFbJson {
      nodes {
        id
        date
        description
        location
        page
        title
        url
      }
    }
  }
`

export default function EventsPage({ data }) {
  const allEvents = data.allFbJson.nodes
  const closestEvent = allEvents[0]
  console.log(closestEvent)
  return (
    <Layout>
      <PageTitle>Events</PageTitle>
      {allEvents.length === 0 ? (
        <Heading as="h3">No events at the moment!</Heading>
      ) : (
        <div>
          <Heading sx={{ mb: 3 }}>Closest Deadline:</Heading>
          <EventCard isClosest event={closestEvent} />
          <Heading sx={{ mb: 3 }}>Upcoming:</Heading>
          {allEvents.length === 1 ? (
            <Heading as="h3">No other events at the moment!</Heading>
          ) : (
            allEvents
              .slice(1)
              .map((event) => <EventCard key={event.id} event={event} />)
          )}
        </div>
      )}
    </Layout>
  )
}
EventsPage.propTypes = {
  data: PropTypes.object.isRequired,
}

function EventCard({ isClosest, event }) {
  return (
    <Card
      key={event.id}
      sx={{
        mb: isClosest ? 5 : 3,
        boxShadow: isClosest ? "large" : "small",
      }}
    >
      {/* {isClosest ? (
        <AspectImage
          ratio={16 / 9}
          // src={event.image || placeholderImage}
        />
      ) : null} */}
      <Heading variant="cardTitle" sx={{ mt: isClosest ? 3 : "inherit" }}>
        <Link href={event.url}>{event.title}</Link>
      </Heading>
      <Flex
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Heading variant="subtitle">At {event.location}</Heading>
        <Text sx={{ mr: 2, fontWeight: 700 }}>
          Due {moment(event.date).format("MM/DD/YYYY")}
        </Text>
      </Flex>
      <Text>{event.description}</Text>
    </Card>
  )
}
EventCard.propTypes = {
  isClosest: PropTypes.bool,
  event: PropTypes.object.isRequired,
}
