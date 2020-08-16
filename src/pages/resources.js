/** @jsx jsx */
import { jsx, Card, Heading, Text, Link, Input, Flex } from "theme-ui"
import Chip from "../components/Chip"
import { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import PageTitle from "../components/PageTitle"
import Layout from "../components/Layout"
import PropTypes from "prop-types"

export default function ResourcesPage() {
  const allResources = useStaticQuery(graphql`
    query resourcesQuery {
      allIrdJson {
        nodes {
          description
          title
          url
          tags
          id
        }
      }
    }
  `).allIrdJson.nodes

  const [resources] = useState(allResources)
  const [activeTags, setActiveTags] = useState([])
  const [searchValue, setSearchValue] = useState("")

  const possibleTags = [
    "Events",
    "Mentoring",
    "Education & Awareness",
    "Funding & Grants",
    "Networks",
    "Student Groups",
    "Fellowships & Scholarships",
    "Competitions",
    "Accelerators & Incubators",
    "Training & Support",
  ]

  function toggleTag(value) {
    if (activeTags.includes(value)) {
      setActiveTags(activeTags.filter((filter) => filter !== value))
    } else {
      setActiveTags([...activeTags, value])
    }
  }

  function filterResources() {
    // TODO
  }

  return (
    <Layout>
      <PageTitle>Resources</PageTitle>
      <Input
        placeholder="Search"
        sx={{ mb: 3 }}
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value)
          filterResources()
        }}
      />
      <Heading as="h4" sx={{ mb: 2 }}>
        Filters:
      </Heading>
      <Flex sx={{ flexWrap: "wrap", mb: 4 }} columns={4}>
        {possibleTags.map((tag) => (
          <Chip
            key={tag}
            onClick={() => {
              toggleTag(tag)
              filterResources()
            }}
          >
            {tag}
          </Chip>
        ))}
      </Flex>
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </Layout>
  )
}

function ResourceCard({ resource }) {
  return (
    <Card
      sx={{
        mb: 4,
      }}
    >
      <Heading as="h3">
        <Link variant="resourceTitle" href={resource.url}>
          {resource.title}
        </Link>
      </Heading>
      <Text>{resource.description}</Text>
    </Card>
  )
}
ResourceCard.propTypes = {
  resource: PropTypes.object.isRequired,
}
