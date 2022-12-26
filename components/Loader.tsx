import { Center } from "@chakra-ui/react";
import styles from "../styles/Loader.module.css";
const Loader = () => {
  return (
    <Center bgColor='gray.200' h='100vh'>
      <div className={styles.loader5}></div>
    </Center>
  );
};

export default Loader;
