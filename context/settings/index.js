import { createContext,useContext,useState } from 'react';
import { useRouter } from 'next/router';

const SettingsContext = createContext()

function SettingsProvider({ children }) {
    const [category, setCategory] = useState(null)
    const [amount, setNumber] = useState(5)
    const [type, setType] = useState(null)
    const [difficulty, setDifficulty] = useState(null)
    const [time, setTime] = useState(0 || null)

    const {query: {settings}} = useRouter()

    const val = {
        category, setCategory,
        amount, setNumber,
        type, setType,
        difficulty, setDifficulty,
        time, setTime,
        settings: Boolean(settings)
    }
    return(
        <SettingsContext.Provider value={val}>{children}</SettingsContext.Provider>
    )
}

function useSettings() {
    const context = useContext(SettingsContext);

    if (context === undefined) {
        throw new Error(`useSettings must be used within an SettingsProvider`);
    }
    return context
}

export { useSettings, SettingsProvider }