import { useState } from 'react';
import Error from 'next/error'
import { useRouter } from 'next/router'
import { useSettings } from '../context/settings'
import { Settings, Categories } from '../components'
import { Button } from '../components/common'

export default function SettingsPage({data, error}) {
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
    <div className="relative px-2 py-4">
      <div className="flex-1">
        <Settings/>
        {amountError? <p className="p-2 text-center text-sm text-red-400">Number of questions should be more than 5 and not more than 20!</p>: null}
      </div>
      <div className="flex-1 pb-12">
        {categoryError? <p className="p-2 text-center text-sm text-red-400">Please select a category!</p>: null}
        <Categories list={data.trivia_categories}/>
      </div>
      <div className="text-center w-full fixed bottom-0 py-1">
          <Button type="primary" size="lg" click={startQuiz}>Start Quiz</Button>
      </div>
    </div>
  )
}

export async function getStaticProps(){
  try{
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    return {
      props: { data },
    }
  } catch(error) {
    console.log(error)
    return {
      props: {
        error: {code: error.code, message: error.message}
      }
    }
  }

}
