import { Link } from "./Link";
import { Social } from "./Social";

export interface Data {
    name: string;
    avatar: string;
    links: Link[];
    socials: Social[];
  }