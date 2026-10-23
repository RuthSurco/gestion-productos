import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const CATEGORIAS = ["Tecnología", "Accesorios", "Muebles", "Otros"]
const estiloInput = "focus-visible:border-violet-400 focus-visible:ring-violet-200"

export default function ProductForm({ onRegistrar }) {
  const [descripcion, setDescripcion] = useState("")
  const [precio, setPrecio] = useState("")
  const [categoria, setCategoria] = useState("")
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState("")

  const validar = () => {
    const e = {}
    if (descripcion.trim().length < 3) {
      e.descripcion = "La descripción es obligatoria y debe tener al menos 3 caracteres."
    }
    if (precio === "" || isNaN(Number(precio)) || Number(precio) <= 0) {
      e.precio = "El precio es obligatorio y debe ser un número mayor que cero."
    }
    if (!categoria) {
      e.categoria = "Debes seleccionar una categoría."
    }
    return e
  }

  const limpiar = () => {
    setDescripcion("")
    setPrecio("")
    setCategoria("")
    setErrores({})
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validar()
    setErrores(e)
    if (Object.keys(e).length > 0) {
      setMensaje("")
      return
    }
    onRegistrar({ descripcion: descripcion.trim(), precio: Number(precio), categoria })
    limpiar()
    setMensaje("Producto registrado correctamente (solo durante esta sesión).")
  }

  return (
    <Card className="border-violet-200">
      <CardHeader>
        <CardTitle className="text-violet-900">Registrar producto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input id="descripcion" value={descripcion} className={estiloInput}
              onChange={(e) => setDescripcion(e.target.value)} placeholder="Ej. Auriculares" />
            {errores.descripcion && <p className="text-sm text-red-600">{errores.descripcion}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="precio">Precio de venta</Label>
            <Input id="precio" type="number" step="0.01" value={precio} className={estiloInput}
              onChange={(e) => setPrecio(e.target.value)} placeholder="0.00" />
            {errores.precio && <p className="text-sm text-red-600">{errores.precio}</p>}
          </div>

          <div className="space-y-2">
            <Label>Categoría</Label>
            <Select value={categoria} onValueChange={setCategoria}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIAS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            {errores.categoria && <p className="text-sm text-red-600">{errores.categoria}</p>}
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="bg-violet-500 text-white hover:bg-violet-600">
              Registrar producto
            </Button>
            <Button type="button" variant="outline" onClick={limpiar}
              className="border-pink-300 text-pink-600 hover:bg-pink-50 hover:text-pink-700">
              Limpiar
            </Button>
          </div>

          {mensaje && <p className="text-sm text-green-600">{mensaje}</p>}
        </form>
      </CardContent>
    </Card>
  )
}