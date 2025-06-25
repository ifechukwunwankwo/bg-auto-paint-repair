// bng-auto/client/src/constants/aboutData.js
import { Cloudinary } from "@cloudinary/url-gen";

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "your-cloud-name",
  },
});

export const metrics = [
  { label: "Service Quality", value: 100 },
  { label: "Support Quality", value: 87 },
  { label: "Long Term Warranty", value: 80 },
];

export const team = [
  {
    name: "Anike Chukwuka",
    title: "General Manager",
    image: cld.image("CEO").format("auto").quality("auto").toURL(),
    alt: "Anike Chukwuka",
    id: "anike-chukwuka",
  },
  {
    name: "Abalo Ayodele",
    title: "Lead Technician",
    image: cld.image("Abalo_Ayodele").format("auto").quality("auto").toURL(),
    alt: "Abalo Ayodele",
    id: "abalo-ayodele",
  },
  {
    name: "Chikadibia Chinenye",
    title: "Customer Support",
    image: cld.image("Customer_support").format("auto").quality("auto").toURL(),
    alt: "Chikadibia Chinenye",
    id: "chikadibia-chinenye",
  },
];