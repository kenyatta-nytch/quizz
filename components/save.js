import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../components/common'

function WithSave({ children, data }) {
    const { push } = useRouter()
    const [isSaving, setSave] = useState(false)
    const [isError, setIsError] = useState(false)

    async function handleSave() {
        setSave(true)

        if (!data.user) {
            setSave(false)
            return;
        }

        try {
            const response = await axios.post('/api/resultsdb', data)

            if (response.status === 200) {
                push('/profile')
            }

        } catch(error) {
            setIsError(true);
            throw new Error(error.message)
        }

        setSave(false)
    }
    return (
        <div>
            <div>{children}</div>
            <div className="w-full flex justify-center">
                <Button
                    type="primary"
                    size="md"
                    disabled={isSaving}
                    click={handleSave}
                >{isSaving? 'Saving..':'Save Progress'}</Button>
            </div>
        </div>
    )
}

export default WithSave;
