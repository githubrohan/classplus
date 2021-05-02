import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Popup = styled.div`
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
  }
  .backdrop img {
    display: block;
    max-width: 60%;
    max-height: 80%;
    margin: 60px auto;
    box-shadow: 3px 5px 7px rgba(0, 0, 0, 0.5);
    border: 2px solid white;
  }
`;

export default function Model({ selectedImage, setSelectedImage }) {
  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) setSelectedImage(null);
  };
  return (
    <Popup>
      <motion.div
        className="backdrop"
        onClick={handleClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.img
          src={selectedImage}
          alt="model"
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
        />
      </motion.div>
    </Popup>
  );
}
