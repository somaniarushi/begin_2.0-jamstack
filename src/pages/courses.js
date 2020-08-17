/** @jsx jsx */
import { jsx, Card, Heading, Text, Input, Flex } from "theme-ui"
import Chip from "../components/chip"
import { useState, useEffect } from "react"
import { graphql } from "gatsby"
import PageTitle from "../components/page_title"
import Layout from "../components/layout"
import PropTypes from "prop-types"

export const query = graphql`
  query coursesQuery {
    allCoursesJson {
      nodes {
        id
        number
        title
        description
        units
        department
      }
    }
  }
`

export default function CoursesPage({ data }) {
  const allCourses = data.allCoursesJson.nodes
  const [courses, setCourses] = useState(allCourses)
  const [activeTags, setActiveTags] = useState([])
  const [searchValue, setSearchValue] = useState("")

  const possibleTags = Array.from(
    new Set(allCourses.map((course) => course.department))
  )

  function toggleTag(value) {
    if (activeTags.includes(value)) {
      setActiveTags(activeTags.filter((filter) => filter !== value))
    } else {
      setActiveTags([...activeTags, value])
    }
  }

  function filterCourses() {
    setCourses(
      allCourses.filter(
        (course) =>
          (activeTags.length === 0 || activeTags.includes(course.department)) &&
          (!searchValue ||
            course.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            course.number
              .toLowerCase()
              .includes(searchValue.toLocaleLowerCase()))
      )
    )
  }

  useEffect(filterCourses, [activeTags, searchValue])

  return (
    <Layout>
      <PageTitle>Courses</PageTitle>
      <Input
        placeholder="Search"
        sx={{ mb: 3 }}
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value)
        }}
      />
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
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </Layout>
  )
}
CoursesPage.propTypes = {
  data: PropTypes.object.isRequired,
}

function CourseCard({ course }) {
  return (
    <Card
      sx={{
        boxShadow: "small",
      }}
    >
      <Heading>{course.number}</Heading>
      <Heading as="h3">{course.title}</Heading>
      <Text
        sx={{
          mb: 2,
        }}
      >
        {course.description}
      </Text>
      <Text
        sx={{
          fontWeight: 800,
          color: "greyText",
        }}
      >
        {course.units} units
      </Text>
    </Card>
  )
}
CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
}
