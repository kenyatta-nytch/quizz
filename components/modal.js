import ReactDOM from 'react-dom'
import {useRouter} from 'next/router';

function Modal({ children }) {
    const container = document.querySelector('#modal__container')
    const {pathname, push} = useRouter()

    const handleClose = () => push(pathname)
    console.log(container)
    if (container) {
        return ReactDOM.createPortal(
            <div className="fixed p-3 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center" style={{zIndex: 99}}>
                <div className="relative bg-white w-full md:w-3/4 lg:w-2/3 min-h-full">
                    <div className="absolute top-2 right-2 z-50">
                        <button onClick={_ => handleClose()}>close</button>
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