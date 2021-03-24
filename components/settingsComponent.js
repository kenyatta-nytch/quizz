import { useSettings } from '../context/settings'

const ACTIVE = "bg-blue-500 text-white"
const INACTIVE = "text-gray-700"

function Settings() {
    const { category, setNumber, setType, type, setDifficulty, difficulty } = useSettings();
    return(
        <div className="p-2 min-w-full min-h-full mt-8">
            <div className="flex flex-col lg:flex-row lg:justify-evenly">
                <div className="pb-8 flex justify-center items-center">
                    <label className="text-gray-700 px-2">Number of Questions:</label>
                    <input
                        type="number"
                        placeholder="10"
                        onChange={e => setNumber(e.target.value)}
                        className="focus:outline-none border-b border-gray-700 p-2 w-20 text-center text-lg"
                    />
                </div>
                <div className="flex-1 flex flex-col lg:flex-row lg:justify-evenly">
                    <div className="relative py-2 lg:mx-2 flex-1 flex justify-center items-center border-t">
                        <p className="absolute px-1 -top-3 text-gray-400 bg-white">Select Type</p>
                        <div className="w-full pb-5 mt-2 flex justify-evenly">
                            <p className={`p-2 text-center shadow rounded ${type === null? ACTIVE : INACTIVE} `} onClick={_=> setType(null)}>Any Type</p>
                            <p className={`p-2 text-center shadow rounded ${type === 'multiple'? ACTIVE : INACTIVE} `} onClick={_=> setType("multiple")}>Multiple Choices</p>
                            <p className={`p-2 text-center shadow rounded ${type === 'boolean'? ACTIVE : INACTIVE} `} onClick={_=> setType("boolean")}>True or False</p>
                        </div>
                    </div>
                    <div className="relative py-2 lg:mx-2 flex-1 flex justify-center items-center border-t">
                        <p className="absolute px-1 -top-3 text-gray-400 bg-white">Select Difficulty</p>
                        <div className="w-full pb-5 mt-2 flex justify-evenly">
                            <p className={`p-2 text-center shadow rounded ${difficulty === null? ACTIVE : INACTIVE}`} onClick={_=> setDifficulty(null)}>Any Difficulty</p>
                            <p className={`p-2 text-center shadow rounded ${difficulty === 'easy'? ACTIVE : INACTIVE}`} onClick={_=> setDifficulty("easy")}>Easy</p>
                            <p className={`p-2 text-center shadow rounded ${difficulty === 'medium'? ACTIVE : INACTIVE}`} onClick={_=> setDifficulty("medium")}>Medium</p>
                            <p className={`p-2 text-center shadow rounded ${difficulty === 'hard'? ACTIVE : INACTIVE}`} onClick={_=> setDifficulty("hard")}>Hard</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;