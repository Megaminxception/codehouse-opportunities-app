import ModalData from "./modelData";
import ModalHeader from "./modelHeader";
import ModalButton from "./learnMoreButton";
import { CloseButton } from "@/components/ui/close-button";

const ModalContainer = ({ onCloseModal }) => {

    return (
        <div className="absolute top-[20%] left-[40%] shadow-md border-solid border-[1px] border-[#B3B3B3] border-[filter: blur(4px)] p-10 bg-white">
            <div className="flex justify-end">
                <CloseButton className="text-black" onClick={onCloseModal} />
            </div>

            <ModalHeader />
            <div className=" place-items-center">
                <ModalData />
                <ModalButton />
            </div>
        </div>
    )

}

export default ModalContainer;