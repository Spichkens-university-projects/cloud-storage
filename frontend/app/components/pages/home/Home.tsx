import { FC, PropsWithChildren } from 'react'
import Layout from '../../layout/Layout'

interface Props {}

const Home: FC<PropsWithChildren<Props>> = ({ children }) => {
	return <Layout>Home</Layout>
}

export default Home
