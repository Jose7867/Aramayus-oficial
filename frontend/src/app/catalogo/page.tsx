import { Suspense } from 'react'
import { SidebarMegaMenu } from '@components/catalog/SidebarMegaMenu'
import { ProductGrid }   from '@components/catalog/ProductGrid'
import { CatalogHeader } from '@components/catalog/CatalogHeader'
import { AndeanDivider } from '@components/shared/AndeanDivider'

export const metadata = { title: 'Catálogo — Aramayus Art' }

export default function CatalogoPage() {
  return (
    <>
      <CatalogHeader />
      <AndeanDivider />
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        <SidebarMegaMenu />
        <Suspense fallback={<div className="flex-1 text-center py-20 text-gray-500">Cargando catálogo...</div>}>
          <ProductGrid />
        </Suspense>
      </div>
    </>
  )
}
