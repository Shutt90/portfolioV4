import { motion } from 'framer-motion';
import Backdrop from './Backdrop';
import ContactForm from './ContactForm'
const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

const Modal = ({ handleClose, text, type }) => {

    return (
        type === 'login' ? 
        <Backdrop onClick={handleClose}>
            <motion.div
            onClick={(e) => e.stopPropagation()}  
            className="modal orange-gradient"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
            <button onClick={handleClose}>Close</button>
            </motion.div>
        </Backdrop>
        :
        <Backdrop onClick={handleClose}>
        <motion.div
        onClick={(e) => e.stopPropagation()}  
        className="modal orange-gradient"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        >
        <button onClick={handleClose}>Close</button>
        </motion.div>
    </Backdrop>

    );
};


export async function getServerSideProps() {
    const projects = await prisma.projects.findOne(id);
    return {
      props: {
        projects: projects,
      },
    };
  }

export default Modal;
