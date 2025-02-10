import { _add } from "@/app/lib/hook-system";
import { MenuItem } from "@/components/Sidebar";

export const register = () => {
_add("menu1", (items: MenuItem[]) => {
  items.push({
    label: "module 1",
    href: "test2"
  })

  console.log("1 add menu1", items);

})

}
