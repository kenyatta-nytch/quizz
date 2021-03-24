import ReactDOM from 'react-dom'
import {useRouter} from 'next/router';
import { Button } from '../components/common'

function Modal({ children, header }) {
    const container = document.querySelector('#modal__container')
    const {pathname, push} = useRouter()

    const handleClose = () => push(pathname)
    if (container) {
        return ReactDOM.createPortal(
            <div className="fixed p-3 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center" style={{zIndex: 99}}>
                <div className="relative bg-white w-full md:w-3/4 lg:w-1/2 min-h-full">
                    <div className="w-full p-2 flex">
                        <h3 className="flex-1 text-xl text-center text-gray-500 capitalize">{header}</h3>
                        <Button click={ handleClose } type="tertiary" size="md">close</Button>
                    </div>
                    {children}
                </div>
            </div>,
            container
        )
    }
    return null;
}

export default Modal