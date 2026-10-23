import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const colores = {
  "Tecnología": "bg-violet-100 text-violet-700",
  "Accesorios": "bg-pink-100 text-pink-700",
  "Muebles": "bg-fuchsia-100 text-fuchsia-700",
  "Otros": "bg-slate-100 text-slate-600",
}

export default function ProductTable({ productos }) {
  return (
    <Card className="border-violet-200">
      <CardHeader>
        <CardTitle className="text-violet-900">Productos registrados</CardTitle>
        <CardDescription>
          Datos temporales: se pierden al recargar la página.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-violet-100/60 hover:bg-violet-100/60">
              <TableHead className="text-violet-900">Código</TableHead>
              <TableHead className="text-violet-900">Descripción</TableHead>
              <TableHead className="text-violet-900">Precio</TableHead>
              <TableHead className="text-violet-900">Categoría</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((p) => (
              <TableRow key={p.codigo} className="hover:bg-pink-50">
                <TableCell className="font-medium">{p.codigo}</TableCell>
                <TableCell>{p.descripcion}</TableCell>
                <TableCell>S/ {p.precio.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${colores[p.categoria]}`}>
                    {p.categoria}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}