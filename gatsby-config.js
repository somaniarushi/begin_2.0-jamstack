module.exports = {
  siteMetadata: {
    title: "Berkeley Gateway to Innovation",
    description: ``,
    author: `@akirillo`,
  },

  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-netlify`,
  ],
}
