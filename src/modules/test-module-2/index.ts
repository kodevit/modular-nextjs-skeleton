import { _add } from "@/app/lib/hook-system";
import { MenuItem } from "@/components/Sidebar";

export const register = () => {
_add("menu1", (items: MenuItem[]) => {
  items.push({
    label: "module 2",
    href: "test2"
  })

  console.log("1 add menu1", items);

})

_add("menu1", (items: MenuItem[]) => {
  items.push({
    label: "module 2-2",
    href: "test3"
  })

  console.log("2 add menu1", items);

})
}
