/** @jsx jsx */
import { jsx, Card, Heading, Text } from "theme-ui"
import { useState } from "react"
import { graphql } from "gatsby"
import PageTitle from "../components/page_title"
import Layout from "../components/layout"
import PropTypes from "prop-types"
// import _ from "lodash"

export const query = graphql`
  query coursesQuery {
    allCoursesJson {
      nodes {
        id
        number
        title
        description
      }
    }
  }
`

export default function CoursesPage({ data }) {
  const allCourses = data.allCoursesJson.nodes
  const [courses] = useState(allCourses)

  return (
    <Layout>
      <PageTitle>Courses</PageTitle>
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
      <Text>{course.description}</Text>
    </Card>
  )
}
CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
}
