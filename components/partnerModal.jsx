import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import {Flex} from "@chakra-ui/react";

export const PartnerModal = ({ open, onCloseModal, title, partnerTypes, tier, involvedInPrograms, location, about, website }) => {
  return (
    <Flex>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>{title}</h2>
        <p>{partnerTypes}</p>
        <p>{tier}</p>
        <p>{involvedInPrograms}</p>
        <p>{location}</p>
        <p>{about}</p>
        <p>{website}</p>
        <Link href="/talent/opportunities">
          <Button bg="#2C2C2C" color="white">
            View Opportunites
          </Button>
        </Link>
      </Modal>
    </Flex>
  )
}

