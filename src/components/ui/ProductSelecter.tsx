import { useEffect, useState } from "react";
import { getProducts } from "@/services/sales";

type Product = {
  identificator: string;
  productName: string;
};

type Props = {
  onSelect: (product: [string, string]) => void;
};

export default function ProductSelector( { onSelect }: Props ) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const pillSelect = "bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium text-sm rounded-full px-4 py-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer transition-colors duration-150";

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      const mapped = response.map((item: any) => ({
        identificator: item.identificator,
        productName: item.productName,
      }));
      setProducts(mapped);
    };

    fetchProducts();
  }, []);

   const handleChange = (product: [string, string]) => {
    setSelectedProduct(product[0]);
    onSelect(product); // 👈 aquí “envías” el dato al padre
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-md w-fit">
      <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
        Seleccionar Producto
      </h2>

      <select
        value={selectedProduct}
        onChange={(e) => handleChange([e.target.value, products[e.target.selectedIndex-1].productName])}
        className={pillSelect}
      >
        <option value="">-- Selecciona --</option>

        {products.map((p) => (
          <option key={p.identificator} value={p.identificator}>
            {p.productName}
          </option>
        ))}
      </select>
    </div>
  );
}