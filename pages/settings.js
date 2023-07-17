import { useState } from 'react';
import Error from 'next/error'
import { useRouter } from 'next/router'
import { useSettings } from '../context/settings'
import { formatCategoryNames } from '../lib/helpers';
import { Settings, Categories } from '../components'

export default function SettingsPage({categories, error}) {
  const { push } = useRouter()
  const [amountError, setAmtError] = useState(false)
  const [categoryError, setCtgError] = useState(false)
  const { category, amount } = useSettings()

  function startQuiz () {
    if (category === null) {
      setCtgError(true)
      return;
    } else {
      setCtgError(false)
    }
    if (amount < 5 || amount > 20) {
      setAmtError(true)
      return;
    } else {
      setAmtError(false)
    }
    push(`/${category.name.replace(/ /g, '-')}`)
  }

  if (error) return <Error statusCode={error.code} title={error.message}/>

  return (
    <div className="w-full h-full flex justify-center items-center p-2">
      <div className='max-w-xl md:rounded md:shadow-md md:p-2'>
        <Settings start={startQuiz} categories={categories}/>
      </div>
    </div>
  )
}

export async function getStaticProps(){
  try{
    const response = await fetch('https://opentdb.com/api_category.php');
      const data = await response.json();

      const categories = data.trivia_categories.map(ctg =>(
          {
            id: ctg.id,
            name: formatCategoryNames(ctg.name)
          }
      ));
      return {
          props: { categories },
    }
  } catch(error) {
    return {
      props: {
        error: {code: error.code, message: error.message}
      }
    }
  }

}
