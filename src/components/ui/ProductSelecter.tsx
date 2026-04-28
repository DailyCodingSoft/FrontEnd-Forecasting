import { useEffect, useState } from "react";
import { getProducts } from "@/services/sales";

type Product = {
  identificator: string;
  productName: string;
};

type Props = {
  onSelect: (value: string) => void;
};

export default function ProductSelecter( { onSelect }: Props ) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
        console.log("Productos obtenidos del backend:", response); // 👈 revisar respuesta del backend
      const mapped = response.products.map((item: any) => ({
        identificator: item.identificator,
        productName: item.productName,
      }));
      console.log("Productos mapeados para el select:", mapped); // 👈 revisar datos mapeados
      setProducts(mapped);
    };

    fetchProducts();
  }, []);

   const handleChange = (value: string) => {
    setSelectedProduct(value);
    onSelect(value); // 👈 aquí “envías” el dato al padre
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-md w-fit">
      <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
        Seleccionar Producto
      </h2>

      <select
        value={selectedProduct}
        onChange={(e) => handleChange(e.target.value)}
        className="border rounded-lg px-3 py-2"
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