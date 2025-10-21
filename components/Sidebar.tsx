import { BarChart3, Package, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { it } from "node:test";
import React from "react";

function Sidebar({ currentPath = "/dashboard" }: { currentPath: string }) {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Add Product", href: "/add-product", icon: Plus },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-10 ">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-8 h-8 " />
          <span className="text-lg font-semibold">Inventory App</span>
        </div>
      </div>
      <nav className="space-y-1">
        <div className="text-sm font-semibold text-gray-500 uppercase">
          Inventory
        </div>
        {navigation.map((item, key) => {
          const IconComponent = item.icon;
          return (
            <Link
              className="flex items-center space-x-6"
              href={item.href}
              key={key}
            >
              <IconComponent className="mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
