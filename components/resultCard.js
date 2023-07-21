export default function ResultCard({data, click}) {
  return (
    <div onClick={_ => click(data)} className="bg-white h-20 w-5/6 mb-3 mx-auto p-2 divide-y cursor-pointer shadow-md">
      <div className="py-1 text-center">
        <p className="px-2 text-lg text-secondary inline font-semibold">{data.category}</p>
        <p className="px-2 inline text-gray-500">Question Type: <span className="text-secondary font-semibold">{data.type}</span></p>
      </div>
      <div className="py-1 text-center">
        <p className="mx-3 px-2 inline text-sm text-gray-500">Scored <span className="text-secondary text-base font-semibold">{data.score}</span></p>
        <p className="mx-3 px-2 inline font-semibold text-secondary">{data.amount}<span className="text-sm font-normal text-gray-500"> Questions</span></p>
        <p className="mx-3 px-2 inline font-semibold text-secondary">{data.type}</p>
      </div>
    </div>
  )
}