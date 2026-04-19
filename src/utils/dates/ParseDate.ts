const parseDate = (value: any) => {
  // ✅ Caso 1: Date válido
  if (value instanceof Date && !isNaN(value.getTime())) {
    return value.toISOString();
  }

  // 🔥 Caso 2: objeto Excel con result
  if (typeof value === "object" && value?.result) {
    const resultDate = new Date(value.result);

    if (!isNaN(resultDate.getTime())) {
      return resultDate.toISOString();
    }
  }

  // 🔥 Caso 3: string tipo "03/11/2026"
  if (typeof value === "string") {
    const parts = value.split("/");

    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}T00:00:00Z`;
    }
  }

  // ✅ Caso 4: número (Excel serial)
  if (typeof value === "number") {
    const excelEpoch = new Date(1899, 11, 30);
    const result = new Date(excelEpoch.getTime() + value * 86400000);
    return result.toISOString();
  }

  console.warn("❌ Fecha inválida:", value);

  // ⚠️ fallback (último recurso)
  return new Date().toISOString();
};

export default parseDate;