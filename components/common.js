export function Button({click, isAnswered, children}) {
    return <button
        type="button"
        className={`w-32 py-2 rounded text-gray-900 mx-auto ${isAnswered ? 'bg-green-500':'bg-gray-400'}`}
        onClick={_=> click()}
    > {children} </button>
}