import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import Link from 'next/link'
import Image from 'next/image'

const Event = ({ evt }) => {
  const deleteEvent = (e) => {
    console.log('delete')
  }

  console.log(evt)

  return (
    <Layout title='Event'>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {new Date(evt.attributes.date).toLocaleDateString('en-US')} at{' '}
          {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        {evt.attributes.image && (
          <div className={styles.image}>
            <Image
              src={evt.attributes.image.data.attributes.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description:</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue: {evt.attributes.venue}</h3>
        <p>{evt.attributes.address}</p>

        <Link href='/events'>
          <a className={styles.back}>Back</a>
        </Link>
      </div>
    </Layout>
  )
}
export default Event

export const getStaticPaths = async () => {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  const paths = events.data.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const res = await fetch(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=image`
  )
  const events = await res.json()

  return {
    props: {
      evt: events.data[0],
    },
    revalidate: 1,
  }
}

// export const getServerSideProps = async ({ query: { slug } }) => {
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json()

//   return {
//     props: {
//       evt: events[0],
//     },
//   }
// }
