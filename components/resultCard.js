export default function ResultCard({data, click}) {
  return (
    <div onClick={_ => click(data)} className="bg-white w-5/6 mb-2 mx-auto p-2 divide-y cursor-pointer shadow-md">
      <div className="py-1 text-center">
        <p className="px-2 text-lg text-gray-700 inline">{data.category}</p>
        <p className="px-2 inline hidden"><span className="text-gray-500">Question Type: </span>{data.type}</p>
      </div>
      <div className="py-1 text-center">
        <p className="mx-3 px-2 inline text-gray-900"><span className="text-sm text-gray-500">Scored </span>{data.score}</p>
        <p className="mx-3 px-2 inline text-gray-900">{data.amount}<span className="text-sm text-gray-500"> Questions</span></p>
        <p className="mx-3 px-2 inline text-gray-900">{data.type}</p>
      </div>
    </div>
  )
}