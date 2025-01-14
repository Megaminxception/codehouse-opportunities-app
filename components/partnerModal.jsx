import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { Flex } from "@chakra-ui/react";

const sectionStyle = { 
  display: "grid",
  gridTemplateColumns: "repeat(2, auto)",
  // gridTemplateRows: "repeat(6, 1fr)",
  gridColumnGap: "10px",
  gridRowGap: "10px", };

const h2Style = { fontSize: "40px", fontWeight: "bold" };
const h3Style = { fontSize: "20px", fontWeight: "bold", paddingLeft: "100px" };
const pStyle = { fontSize: "14px", color: "#555", paddingRight: "100px" };

export const PartnerModal = ({ open, onCloseModal, title, partnerTypes, tier, involvedInPrograms, location, about, website }) => {
  return (
    <Flex>
      <Modal open={open} onClose={onCloseModal} center
        styles={{
          modal: {
            // display: "grid",

            // marginBottom: "16px",
            // alignItems: "start",
            background: "#FFFFFF",
            borderRadius: "8px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            fontFamily: "'Arial', sans-serif",
          },
        }}
      >
        <h2 style={h2Style}>{title}</h2>
        <section style={sectionStyle}>

          <h3 style={h3Style}>Partner Type:</h3>
          <p style={pStyle}>{partnerTypes}</p>

          <h3 style={h3Style}>Tier:</h3>
          <p style={pStyle}>{tier}</p>

          <h3 style={h3Style}>Involved in Programs:</h3>
          <p style={pStyle}>{involvedInPrograms}</p>

          <h3 style={h3Style}>Location:</h3>
          <p style={pStyle}>{location}</p>

          <h3 style={h3Style}>About:</h3>
          <p style={pStyle}>{about}</p>

          <h3 style={h3Style}>Website:</h3>
          <p style={pStyle}>{website}</p>
        </section>
        <Link href="/talent/opportunities" style={{display:"flex", justifyContent:"center"}}>
          <Button bg="#2C2C2C" color="white" >
            View Opportunites
          </Button>
        </Link>
      </Modal>
    </Flex >
  )
}

