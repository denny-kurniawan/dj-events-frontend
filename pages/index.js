import Link from 'next/link'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  return {
    props: { events },
    revalidate: 1,
  }
}
