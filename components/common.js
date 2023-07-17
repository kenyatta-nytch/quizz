import { useRouter } from 'next/router'
import { createPortal } from 'react-dom'
import Link from 'next/link'

const types = {
	primary: 'bg-secondary font-semibold text-white',
	secondary: 'border border-primary text-purple-500',
	tertiary: 'border-0 text-gray-900'
}

const sizes = {
	sm: 'px-3 py-1 text-sm',
	md: 'px-4 py-2 text-base',
	lg: 'px-5 py-3 text-lg'
}

export function QuizButton({click, isAnswered, children}) {
	return <button
		type="button"
		className={`w-32 py-2 rounded mx-auto ${isAnswered ? types.primary : types.secondary}`}
		onClick={_=> click()}
	> {children} </button>
}

export function Button({type, size, click, children, extra, ...props}) {
	return <button
		{...props}
		type="button"
		onClick={_=> click()}
		className={`rounded-full capitalize ${types[type]} ${sizes[size]} ${extra}`}
	>{ children }</button>
}

export function StyledLink({to, children}) {
	const {pathname} = useRouter();
	return <Link
		href={to}>
		<p className={`p-2 transition cursor-pointer ${pathname !== '/'? 'text-white':'text-gray-500 hover:text-gray-900'}`}>{ children }</p>
	</Link>
}

export function Loader({content}) {
	const {pathname} = useRouter();
	console.info('loader', pathname);
	return (
		<div className='absolute inset-0 flex justify-center items-center bg-white'>
			<p className='font-semibold'>Loading {content}...</p>
		</div>
	)
}
