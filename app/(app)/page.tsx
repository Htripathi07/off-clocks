import { PAGE_SEO } from '../seo'
import HomeClient from './home-client'

export const metadata = PAGE_SEO.home

export default function Home() {
  return <HomeClient />
}