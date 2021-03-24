import Error from 'next/error';
import {useRouter} from 'next/router'

function AuthError() {
    const {query: {error}} = useRouter()

    return <Error statusCode={error} title="Failed to login. Try again"/>
}

export default AuthError