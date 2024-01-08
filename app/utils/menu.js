import { list, check, todo, home, edit } from "./icons";

const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "Important!",
    icon: list,
    link: "/important",
  },
  {
    id: 3,
    title: "Completed!",
    icon: check,
    link: "/completed",
  },
  {
    id: 4,
    title: "Do It Now",
    icon: edit,
    link: "/incomplete",
  },
  {
    id: 5,
    title: "Calendar",
    icon: todo,
    link: "/calendar",
  },
  {
    id: 6,
    title: "Chat",
    icon: todo,
    link: "/chat",
  },
];

export default menu;
