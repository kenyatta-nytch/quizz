import Link from 'next/link'
import { signIn } from 'next-auth/client'
import { Modal } from './'

function Information() {
    
    return (
        <Modal>
            <div className="">
                <p className="p-4">Please sign in to your account in order to save your quiz results. You can still take quizes wihout an account however, the results will be lost after reviewing.<br/>
                Initial sign in will automatically create an account</p>
                <div className="flex justify-around">
                    <Link href="/settings">
                        <a className="px-3 py-2 bg-gray-200">proceed without account</a>
                    </Link>
                    <button type="button" onClick={_ => signIn(null, {callbackUrl: 'http://localhost:3000/settings'})} className="px-3 py-2 bg-green-300 cursor-pointer">proceed to sign in</button>
                </div>
            </div>
        </Modal>
    )
}

export default Information