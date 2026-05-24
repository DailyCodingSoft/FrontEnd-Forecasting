import { useEffect, useState } from "react";
import { getProducts } from "@/services/sales";
import PillSelect from "@/components/ui/PillSelect";
import FilterCard from "@/components/ui/FilterCard";

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
    <FilterCard title="Seleccionar Producto">
      <PillSelect
        value={selectedProduct}
        onChange={(e) => handleChange([e.target.value, products[e.target.selectedIndex-1].productName])}
      >
        <option value="">-- Selecciona --</option>

        {products.map((p) => (
          <option key={p.identificator} value={p.identificator}>
            {p.productName}
          </option>
        ))}
      </PillSelect>
    </FilterCard>
  );
}