import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

function WithSave({ children, data }) {
    const { push } = useRouter()
    const [isSaving, setSave] = useState(false)
    const {isError, setIsError} = useState(false)

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
            <div>
                <button
                    type="button"
                    disabled={isSaving}
                    onClick={_=> handleSave()}
                    className="p-2"
                >{isSaving? 'Saving..':'Save'}</button>
            </div>
        </div>
    )
}

export default WithSave;