import { _add } from "@/lib/hook-system";
import { MenuItem } from "@/components/Sidebar";
import { Metadata } from "next";

export const register = () => {
_add("menu1", (items: MenuItem[]) => {
  items.push({
    label: "module 1",
    href: "test2"
  })

  console.log("1 add menu1", items);

})
  
  _add("basic:html_head", (metadata: Metadata) => {
    metadata.title = "CRM";

    console.log("1 add basic:html_head", metadata);
  });

}
