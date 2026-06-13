import { FilterPanel }   from '@components/catalog/FilterPanel'
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
        <FilterPanel />
        <ProductGrid />
      </div>
    </>
  )
}
