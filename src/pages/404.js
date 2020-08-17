/** @jsx jsx */
import { jsx, Image } from "theme-ui"
import NotFoundImage from "../images/404.svg"
import Layout from "../components/layout"
import PageTitle from "../components/page_title"

export default function NotFoundPage() {
  return (
    <Layout>
      <PageTitle sx={{ mb: 5 }}>Page Not Found</PageTitle>
      <Image src={NotFoundImage} />
    </Layout>
  )
}
