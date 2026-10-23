import { useState } from "react"
import ProductForm from "@/components/ProductForm"
import ProductTable from "@/components/ProductTable"

const PRODUCTOS_INICIALES = [
  { codigo: "P-001", descripcion: "Laptop Lenovo IdeaPad", precio: 2499.9, categoria: "Tecnología" },
  { codigo: "P-002", descripcion: "Mouse inalámbrico", precio: 59.5, categoria: "Accesorios" },
  { codigo: "P-003", descripcion: "Teclado mecánico", precio: 189, categoria: "Accesorios" },
  { codigo: "P-004", descripcion: "Monitor 24 pulgadas", precio: 699, categoria: "Tecnología" },
  { codigo: "P-005", descripcion: "Silla ergonómica", precio: 450, categoria: "Muebles" },
]

// Toma el mayor número usado y suma 1: nunca repite códigos
const generarCodigo = (lista) => {
  const max = lista.reduce((m, p) => Math.max(m, parseInt(p.codigo.split("-")[1], 10)), 0)
  return `P-${String(max + 1).padStart(3, "0")}`
}

export default function App() {
  const [productos, setProductos] = useState(PRODUCTOS_INICIALES)

  const registrarProducto = (datos) => {
    setProductos((prev) => [...prev, { codigo: generarCodigo(prev), ...datos }])
  }

  return (
    <div className="min-h-screen bg-violet-50">
      <header className="border-b border-violet-200 bg-gradient-to-r from-violet-200 to-pink-200">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="text-3xl font-bold text-violet-900">Gestión de productos</h1>
          <p className="text-violet-700">Catálogo de productos · Prototipo</p>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProductForm onRegistrar={registrarProducto} />
        </div>
        <div className="lg:col-span-2">
          <ProductTable productos={productos} />
        </div>
      </main>
    </div>
  )
}