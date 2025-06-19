import { useState } from "react";

const ProductStats = () => {
  const [soldToday, setSoldToday] = useState(0);

  const handleInputChange = (e) => {
    setSoldToday(Number(e.target.value));
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2"> Statystyki sprzedaży</h2>
      <input
        type="number"
        value={soldToday}
        onChange={handleInputChange}
        className="border px-3 py-2 rounded w-64"
        placeholder="Produkty sprzedane dziś"
      />
      <div className="mt-4 bg-gray-100 p-4 rounded">
        {/* Tu można wstawić wykres, np. react-chartjs-2 */}
        <p>Wykres sprzedaży (prototyp)</p>
      </div>
    </div>
  );
};

export default ProductStats;
