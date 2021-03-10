import Link from 'next/link'
import { useSettings } from '../context/settings'
import { Settings, Categories } from '../components'

export default function SettingsPage({ data }) {
  const { category } = useSettings()
  return (
    <div className="relative px-2 py-4">
      <div className="flex-1">
        <Settings/>
      </div>
      <div className="flex-1 pb-8">
        <Categories list={data.trivia_categories}/>
      </div>
      <div className="w-full fixed bottom-0">
        <div className="">
            <Link href={category? `/${category.name.replace(/ /g, '-')}`: ''}>
                <p className="w-1/2 m-auto px-3 py-2 text-xl text-center bg-green-500 rounded">Start Quiz</p>
            </Link> 
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps(){
  let data

  try {
    const response = await fetch('https://opentdb.com/api_category.php');
    data = await response.json();
  } catch(error) {
    throw new Error(error.message)
  }

  return {
    props: {
      data,
    }
  }
}
