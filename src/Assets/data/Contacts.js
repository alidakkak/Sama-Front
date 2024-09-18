import { BsWhatsapp } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import { FaTelegramPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const PrimaryActions = [
  {
    name: "whatsapp",
    placeholder: "https://wa.me/profileID",
    image: <BsWhatsapp />,
  },
  {
    name: "mobile",
    placeholder: "+XX XXXXX XXXXX",
    image: <FaPhone />,
  },
  {
    name: "Home",
    placeholder: "+XX XXXXX XXXXX",
    image: <FaPhone />,
  },
  {
    name: "office",
    placeholder: "+XX XXXXX XXXXX",
    image: <FaPhone />,
  },
  {
    name: "website",
    placeholder: "https://wa.me/profileID",
    image: <CgWebsite />,
  },
  {
    name: "telegram",
    placeholder: "username",
    image: <FaTelegramPlane />,
  },
  {
    type: "email",
    placeholder: "info@example.com",
    icon: <MdEmail />,
  },
];
