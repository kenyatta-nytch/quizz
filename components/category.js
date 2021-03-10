import { useState } from 'react';
import { useSettings } from '../context/settings';

function Categories({list}) {
    const [active, setActive] = useState()
    const { setCategory } = useSettings()
    function handleClick(val) {
        setActive(val);
        setCategory(val);
    }
    return(
        <div className="relative min-h-screen border-t flex justify-center ">
            <p className="absolute px-1 -top-3 text-gray-400 bg-white">Select Category</p>
            <div className="mt-3 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows">
            {list && list.map((ctg,idx) => (
                <div onClick={_=> handleClick(ctg)} key={idx} className={`h-24 md:h-32 p-2 flex justify-center items-center shadow-md cursor-pointer ${ctg === active? 'bg-blue-500 text-white':''}`}>
                    <p className="text-center">{ctg.name}</p>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Categories