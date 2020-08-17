/** @jsx jsx */
import { jsx, Card, Heading, Text, Link, Input, Flex } from "theme-ui"
import Chip from "../components/chip"
import { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import PageTitle from "../components/page_title"
import Layout from "../components/layout"
import PropTypes from "prop-types"

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

  const [resources, setResources] = useState(allResources)
  const [activeTags, setActiveTags] = useState([])
  const [searchValue, setSearchValue] = useState("")

  function toggleTag(value) {
    if (activeTags.includes(value)) {
      setActiveTags(activeTags.filter((filter) => filter !== value))
    } else {
      setActiveTags([...activeTags, value])
    }
  }

  function filterResources() {
    setResources(
      allResources.filter(
        (resource) =>
          (activeTags.length === 0 ||
            activeTags.every((tag) => resource.tags.includes(tag))) &&
          (!searchValue ||
            resource.title.toLowerCase().includes(searchValue.toLowerCase()))
      )
    )
  }

  useEffect(filterResources, [activeTags, searchValue])

  return (
    <Layout>
      <PageTitle>Resources</PageTitle>
      <Input
        placeholder="Search"
        sx={{ mb: 3 }}
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value)
        }}
      />
      <Heading sx={{ mb: 2 }} variant="subtitle">
        Types:
      </Heading>
      <Flex sx={{ flexWrap: "wrap", mb: 4 }} columns={4}>
        {possibleTags.map((tag) => (
          <Chip
            key={tag}
            onClick={() => {
              toggleTag(tag)
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
      <Heading>
        <Link href={resource.url}>{resource.title}</Link>
      </Heading>
      <Text>{resource.description}</Text>
    </Card>
  )
}
ResourceCard.propTypes = {
  resource: PropTypes.object.isRequired,
}
