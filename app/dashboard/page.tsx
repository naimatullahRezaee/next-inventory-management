import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const userId = user.id;

  const [totalPorducts, lowStock, allProducts] = await Promise.all([
    prisma.product.count({
      where: { userId },
    }),
    prisma.product.count({
      where: { userId, lowStockAt: { not: null }, quantity: { lte: 5 } },
    }),
    prisma.product.findMany({
      where: { userId },
      select: { price: true, quantity: true, createdAt: true },
    }),
  ]);

  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  const totalValue = allProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0
  );

  return (
    <div>
      <Sidebar currentPath="/dashboard" />
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 text-2xl font-semibold">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back! Here is an overview of your inventory
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Key Metrics */}
          <div className="bg-white rounded-lg  border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Key Metrics
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {/* first price */}
              <div className="text-center ">
                <div className="text-3xl font-bold text-gray-900">
                  {totalPorducts}
                </div>
                <div className="text-sm text-gray-600 ">Total Products</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    +{totalPorducts}
                  </span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>
              {/* Second price */}
              <div className="text-center ">
                <div className="text-3xl font-bold text-gray-900">
                  ${Number(totalValue).toFixed(0)}
                </div>
                <div className="text-sm text-gray-600 ">Total value</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    +${Number(totalValue).toFixed(0)}
                  </span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>
              {/* Third price */}
              <div className="text-center ">
                <div className="text-3xl font-bold text-gray-900">
                  {lowStock}
                </div>
                <div className="text-sm text-gray-600 ">Low Stock</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">+{lowStock}</span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
