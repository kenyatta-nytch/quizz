import { useEffect, useState } from 'react';
import { useSettings } from '../context/settings';

function Categories({list}) {
	const { setCategory, category } = useSettings()
	const [active, setActive] = useState(category)
	useEffect(() => {
		setActive(category);
	}, [category])
	function handleClick(val) {
		setCategory(val);
		setActive(val);
	}
	return(
		<div className="relative flex flex-col p-2">
			<div className='flex justify-start pb-2'>
				<p className="text-gray-400 font-semibold bg-white">Pick A Category:</p>
			</div>
			<div className="flex-1 flex flex-wrap items-center md:justify-start">
			{list && list.map((ctg,idx) => (
				<div onClick={_=> handleClick(ctg)} key={idx} className={`mx-2 mb-2 px-2 py-1 flex justify-center items-center rounded-full shadow-inner cursor-pointer transition ease-linear duration-150 ${ctg === active? 'border-secondary text-secondary border-2 font-semibold':'text-gray-600 border border-gray-400 hover:text-purple-500 hover:border-primary'}`}>
					<p className="text-center">{ctg.name}</p>
				</div>
			))}
			</div>
		</div>
	)
}

export default Categories
