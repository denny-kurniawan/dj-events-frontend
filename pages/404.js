import Link from 'next/link'
import { FaExclamationTriangle } from 'react-icons/fa'
import Layout from '@/components/Layout'
import styles from '@/styles/404.module.css'

const NotFound = () => {
  return (
    <Layout>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle /> <br /> 404
        </h1>
        <h4>Sorry, there is nothing here</h4>
        <Link href='/'>Go Back Home</Link>
      </div>
    </Layout>
  )
}
export default NotFound
