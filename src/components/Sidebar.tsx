import { _add, _do } from "@/app/lib/hook-system";

_add("menu1", (items: MenuItem[]) => {
  items.push({
    label: "test2",
    href: "test2"
  })

  console.log("1 add menu1", items);

})

// _add("menu1", (items: MenuItem[]) => {
//   items.push({
//     label: "test3",
//     href: "test3"
//   })

//   console.log("2 add menu1", items);

// })

export interface MenuItem {
  label: string; 
  href: string;
}
export default async function Sidebar() {
  let menuItems: MenuItem[] = [{
    label: "test",
    href: "test"
  }];

  await _do("menu1", menuItems);

  return (
    <div className="text-white text-xl">
      SIDEBAR
      <ul>
        {menuItems.map((mi) => (
          <li key={mi.label}>{mi.label}</li>
        ))}
      </ul>
    </div>
  )
}