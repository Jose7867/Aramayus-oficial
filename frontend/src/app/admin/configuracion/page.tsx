'use client'
import { useState } from 'react'
import { Save, Info, Truck, CreditCard, Bell } from 'lucide-react'

export default function ConfiguracionPage() {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    storeName: 'Aramayus Art',
    supportEmail: 'contacto@aramayusart.com',
    supportPhone: '+51 987 654 321',
    freeShippingThreshold: '200',
    standardShippingCost: '15',
    enableNotifications: true,
    maintenanceMode: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      alert('Configuración guardada correctamente')
    } catch (error) {
      alert('Error al guardar configuración')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-display text-andean-black">Configuración</h1>
        <p className="text-sm text-gray-500 mt-1">Ajustes generales, envíos y preferencias de la tienda.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 p-6 bg-gray-50/50">
            <h2 className="text-sm font-semibold text-andean-black uppercase tracking-widest flex items-center gap-2">
              <Info className="w-4 h-4 text-inca-gold" /> Información de la Tienda
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Nombre de la Tienda</label>
              <input type="text" name="storeName" value={settings.storeName} onChange={handleChange} className="input-base w-full" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Correo de Soporte</label>
              <input type="email" name="supportEmail" value={settings.supportEmail} onChange={handleChange} className="input-base w-full" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Teléfono de Contacto</label>
              <input type="text" name="supportPhone" value={settings.supportPhone} onChange={handleChange} className="input-base w-full" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 p-6 bg-gray-50/50">
            <h2 className="text-sm font-semibold text-andean-black uppercase tracking-widest flex items-center gap-2">
              <Truck className="w-4 h-4 text-inca-gold" /> Configuración de Envíos
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Costo de Envío Estándar (S/)</label>
              <input type="number" name="standardShippingCost" value={settings.standardShippingCost} onChange={handleChange} className="input-base w-full" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Envío Gratis a partir de (S/)</label>
              <input type="number" name="freeShippingThreshold" value={settings.freeShippingThreshold} onChange={handleChange} className="input-base w-full" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 p-6 bg-gray-50/50">
            <h2 className="text-sm font-semibold text-andean-black uppercase tracking-widest flex items-center gap-2">
              <Bell className="w-4 h-4 text-inca-gold" /> Preferencias y Sistema
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="flex items-center h-5">
                <input type="checkbox" name="enableNotifications" checked={settings.enableNotifications} onChange={handleChange} className="rounded text-inca-gold focus:ring-inca-gold w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Notificaciones por correo</p>
                <p className="text-xs text-gray-500">Recibe un correo cada vez que se realice un nuevo pedido.</p>
              </div>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="flex items-center h-5">
                <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} className="rounded text-red-500 focus:ring-red-500 w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Modo Mantenimiento</p>
                <p className="text-xs text-gray-500">Activa esto para ocultar temporalmente la tienda a los clientes.</p>
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={loading} className="btn-dark flex items-center gap-2 px-8">
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            Guardar Configuración
          </button>
        </div>
      </form>
    </div>
  )
}
