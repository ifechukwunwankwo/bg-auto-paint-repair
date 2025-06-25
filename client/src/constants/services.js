// bng-auto/client/src/constants/services.js
import {
  FaPaintRoller,
  FaWrench,
  FaOilCan,
  FaShower,
  FaCogs,
  FaTools,
} from "react-icons/fa";

export const services = [
  { title: "Painting Services", icon: <FaPaintRoller />, link: "/services" },
  { title: "Engine Repair", icon: <FaWrench />, link: "/services" },
  { title: "Oil Change", icon: <FaOilCan />, link: "/services" },
  { title: "Car Wash", icon: <FaShower />, link: "/services" },
  { title: "Repair Parts", icon: <FaCogs />, link: "/services" },
  { title: "Modification", icon: <FaTools />, link: "/services" },
];