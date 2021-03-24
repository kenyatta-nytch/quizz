import Link from 'next/link'
import { signIn } from 'next-auth/client'
import { Modal } from './'
import { Button,StyledLink } from './common'

function Information() {
    const handleClick = () => signIn(null, {callbackUrl: 'http://localhost:3000/settings'})

    return (
        <Modal header="information">
            <div className="">
                <div className="mt-8 sm:mt-20">
                    <p className="px-2 py-4 text-lg text-gray-900 text-center">Please Sign In to your account in order to save your quiz results.<br/>
                        You can still take quizes wihout an account, however, the results will be lost after reviewing.<br/>
                        Initial Sign In will automatically create an account.
                    </p>
                </div>
                <div className="mt-8 sm:mt-20 p-2 flex flex-col md:flex-row justify-center md:justify-evenly">
                    <StyledLink to="/settings"> proceed without account </StyledLink>
                    <Button type="primary" size="md" click={handleClick}>proceed to sign in</Button>
                </div>
            </div>
        </Modal>
    )
}

export default Information