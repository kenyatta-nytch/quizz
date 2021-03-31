import {useState} from 'react';
import { providers, signIn } from 'next-auth/client'

const btn_style = "w-full py-3 my-2 text-center border border-gray-500 rounded-md hover:bg-gray-500 hover:text-white focus:outline-none"
const profile = process.env.NEXTAUTH_URL+'/profile'

function SignIn(props) {
    return (
        <div className="w-full h-screen p-3">
            <div className='max-w-md h-4/5 m-auto flex flex-col justify-center'>
                {Object.values(props).map((provider, idx) => (provider.type === 'email'? <EmailAuth key={idx}/>:<SocialAuth key={idx} {...provider}/>))}
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const providers = await providers()
    return { props: { providers } }
}

function EmailAuth() {
    const [email, setEmail] = useState('')
    const [isLoading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const res = await signIn('email', {email, callbackUrl: profile})
        if (res) setLoading(false);
    }

    return (
        <form className="relative border-b mb-2 py-2" method="post" onSubmit={e => handleSubmit(e)}>
            <input
                required
                type="email"
                name="email"
                value={email}
                autoComplete="off"
                placeholder="email@address.host"
                onChange={e => setEmail(e.target.value)}
                className="block w-full py-3 px-2 border border-gray-200 rounded-md text-lg hover:border-gray-500"
            />
            <button type="submit" className={btn_style}>{isLoading? 'Signing In...' : 'Sign In with Email'}</button>
            <p className="absolute text-lg px-1 -bottom-3 left-1/2 text-center bg-white">or</p>
        </form>
    )
}

function SocialAuth(provider){
    return <button type='button' onClick={_=> signIn(provider.id, {callbackUrl: profile})} className={btn_style}>Sign In with {provider.name}</button>
}

export default SignIn
