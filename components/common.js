import Link from 'next/link'

const types = {
    primary: 'bg-gray-500 text-white',
    secondary: 'border border-gray-500 text-gray-900',
    tertiary: 'border-0 text-gray-900'
}

const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
}

export function QuizButton({click, isAnswered, children}) {
    return <button
        type="button"
        className={`w-32 py-2 rounded text-gray-900 mx-auto ${isAnswered ? 'bg-green-500':'bg-gray-400'}`}
        onClick={_=> click()}
    > {children} </button>
}

export function Button({type, size, click, children, extra, ...props}) {
    return <button
        {...props}
        type="button"
        onClick={_=> click()}
        className={`rounded capitalize ${types[type]} ${sizes[size]} ${extra}`}
    >{ children }</button>
}

export function StyledLink({to, children}) {
    return <Link
        href={to}>
        <p className="p-2 text-gray-500 hover:text-gray-900 transition cursor-pointer">{ children }</p>
    </Link>
}
