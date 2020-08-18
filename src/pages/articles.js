/** @jsx jsx */
import { jsx, Card, Heading, Text, Link, Flex, IconButton } from "theme-ui"
import { useState, useEffect } from "react"
import Chip from "../components/chip"
import { graphql } from "gatsby"
import moment from "moment"
import PageTitle from "../components/page_title"
import Layout from "../components/layout"
import PropTypes from "prop-types"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export const query = graphql`
  query rssQuery {
    allRssJson(sort: { fields: date, order: DESC }) {
      nodes {
        author
        date
        excerpt
        id
        title
        url
        feedKey
      }
    }
    allRssConfigsJson {
      nodes {
        feedKey
        title
      }
    }
  }
`

export default function ArticlesPage({ data }) {
  const allArticles = data.allRssJson.nodes
  const allWeekArticles = allArticles.filter((article) =>
    moment(article.date).isSame(moment(), "week")
  )
  const allMonthArticles = allArticles.filter(
    (article) =>
      moment(article.date).isSame(moment(), "month") &&
      !moment(article.date).isSame(moment(), "week")
  )
  const [weekArticles, setWeekArticles] = useState(allWeekArticles)
  const [monthArticles, setMonthArticles] = useState(allMonthArticles)
  const [activeTags, setActiveTags] = useState([])

  const feedKeysToPossibleTags = {}
  data.allRssConfigsJson.nodes.forEach(
    (rssConfig) => (feedKeysToPossibleTags[rssConfig.feedKey] = rssConfig.title)
  )

  function toggleTag(value) {
    if (activeTags.includes(value)) {
      setActiveTags(activeTags.filter((filter) => filter !== value))
    } else {
      setActiveTags([...activeTags, value])
    }
  }

  function filterArticles() {
    setWeekArticles(
      allWeekArticles.filter(
        (article) =>
          moment(article.date).isSame(moment(), "week") &&
          (activeTags.length === 0 || activeTags.includes(article.feedKey))
      )
    )
    setMonthArticles(
      allMonthArticles.filter(
        (article) =>
          moment(article.date).isSame(moment(), "month") &&
          !moment(article.date).isSame(moment(), "week") &&
          (activeTags.length === 0 || activeTags.includes(article.feedKey))
      )
    )
  }

  useEffect(filterArticles, [activeTags])

  return (
    <Layout>
      <PageTitle>Articles</PageTitle>
      <Heading sx={{ mb: 2 }} variant="subtitle">
        Sources:
      </Heading>
      <Flex sx={{ flexWrap: "wrap", mb: 4 }} columns={4}>
        {Object.keys(feedKeysToPossibleTags).map((feedKey) => (
          <Chip
            key={feedKey}
            onClick={() => {
              toggleTag(feedKey)
            }}
          >
            {feedKeysToPossibleTags[feedKey]}
          </Chip>
        ))}
      </Flex>
      <Heading sx={{ mb: 3 }}>This Week:</Heading>
      {weekArticles.length > 0 ? (
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          adaptiveHeight={true}
          prevArrow={<ArticleSliderArrow />}
          nextArrow={<ArticleSliderArrow isNext />}
        >
          {weekArticles.map((article) => (
            <ArticleCard key={article.id} article={article} inSlider />
          ))}
        </Slider>
      ) : (
        <Heading as="h3">No articles this week!</Heading>
      )}
      <Heading sx={{ mt: 5, mb: 3 }}>This Month:</Heading>
      {monthArticles.length > 0 ? (
        monthArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      ) : (
        <Heading as="h3">No articles this month!</Heading>
      )}
    </Layout>
  )
}
ArticlesPage.propTypes = {
  data: PropTypes.object.isRequired,
}

function ArticleCard({ article, inSlider }) {
  return (
    <Card
      sx={{
        boxShadow: "small",
        mb: 3,
        mx: inSlider ? 1 : "inherit",
        mt: inSlider ? 1 : "inherit",
      }}
    >
      <Heading variant="cardTitle">
        <Link href={article.url}>{article.title}</Link>
      </Heading>
      <Flex
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Heading variant="subtitle">By {article.author}</Heading>
        <Text sx={{ mr: 2 }}>
          Published {moment(article.date).format("MM/DD/YYYY")}
        </Text>
      </Flex>
      <Text>{article.excerpt}</Text>
    </Card>
  )
}
ArticleCard.propTypes = {
  article: PropTypes.object.isRequired,
  inSlider: PropTypes.bool,
}

function ArticleSliderArrow({ isNext, onClick }) {
  return (
    <IconButton
      sx={{
        transform: "translate(0, -50%)",
        left: isNext ? "inherit" : -5,
        right: isNext ? -5 : "inherit",
      }}
      onClick={onClick}
    >
      {isNext ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-arrow-right-circle"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#2c3e50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <circle cx="12" cy="12" r="9" />
          <line x1="16" y1="12" x2="8" y2="12" />
          <line x1="16" y1="12" x2="12" y2="16" />
          <line x1="16" y1="12" x2="12" y2="8" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-arrow-left-circle"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#2c3e50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <circle cx="12" cy="12" r="9" />
          <line x1="8" y1="12" x2="16" y2="12" />
          <line x1="8" y1="12" x2="12" y2="16" />
          <line x1="8" y1="12" x2="12" y2="8" />
        </svg>
      )}
    </IconButton>
  )
}
ArticleSliderArrow.propTypes = {
  isNext: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func,
}
