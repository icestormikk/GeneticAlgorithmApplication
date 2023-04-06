import React from 'react';
import {motion} from 'framer-motion';
import ModalHeader from '../ModalHeader/ModalHeader.lazy';

interface ModalWindowProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    title: JSX.Element,
    content: JSX.Element,
}

/**
 * A component containing a custom window without any templates
 * @param {boolean} isOpen a property that determines whether a modal
 * window is open or not
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen
 * a function that changes the value of the {@link isOpen} property
 * @param {JSX.Element} title the title of the modal window displayed
 * at the top of it
 * @param {JSX.Element} content content of the modal window
 * @constructor
 */
function ModalWindow(
    {
        isOpen,
        setIsOpen,
        title,
        content,
    }: ModalWindowProps,
) {
    const escPressedListener = React.useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false)
            }
        },
        [setIsOpen]
    )

    React.useEffect(
        () => {
            document.body.addEventListener("keydown", escPressedListener)
            return function cleanup() {
                document.body.removeEventListener("keydown", escPressedListener)
            }
        },
        [escPressedListener]
    )

    return (
        <div
            className={"fixed top-0 left-0 h-screen w-screen bg-black/50 centered " +
            "z-[1000] " + (isOpen ? 'flex' : 'hidden')}
            onClick={() => setIsOpen(false)}
        >
            <motion.div
                initial={{
                    rotateX: 90,
                }}
                animate={{
                    rotateX: isOpen ? 0 : 90,
                }}
                data-testid="ModalWindow"
            >
                <div
                    className="bg-[#efefef] rounded-md text-black sm:max-w-[90vw]
                    lg:max-w-[80rem] max-w-[90vw]"
                    onClick={(event) => event.stopPropagation()}
                >
                    <ModalHeader content={title} setIsOpen={setIsOpen}/>
                    <div className="p-2">
                        {content}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default ModalWindow;
