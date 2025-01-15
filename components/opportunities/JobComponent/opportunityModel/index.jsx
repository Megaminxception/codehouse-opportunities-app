'use client'
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';
import ModalContainer from './modelContainer';
import { useDisclosure } from '@chakra-ui/react';

export function OpportunityModal() {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => {
        setOpen(false);
        console.log("Closing modal...");
    };

    return (
        <div>
            <button
                onClick={onOpenModal}
                className='bg-[#2C2C2C] px-[1.5em] text-white py-[0.5em] rounded'
            >
                Learn More
            </button>

            <Modal open={open} onClose={onCloseModal} center>
                <ModalContainer onCloseModal={onCloseModal} />
            </Modal>
        </div>
    );
}

