import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

const settingsPath = path.join(__dirname, '..', 'data', 'settings.json')

export async function getSettings(req: Request, res: Response) {
  try {
    if (fs.existsSync(settingsPath)) {
      const data = fs.readFileSync(settingsPath, 'utf8')
      res.json(JSON.parse(data))
    } else {
      res.json({
        title: 'Nuestra historia',
        subtitle: 'Tejiendo cultura desde 1990',
        description: 'Prendas artesanales únicas, elaboradas por manos peruanas con técnicas ancestrales transmitidas de generación en generación.',
        mission: 'Preservar y revalorar el arte textil andino creando prendas de alta calidad que conecten nuestra herencia cultural con el mundo moderno.',
        vision: 'Ser la marca referente a nivel global en moda ética y sostenible inspirada en la cosmovisión andina.',
        image: '/images/nosotros-hero.jpeg'
      })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error loading settings' })
  }
}

export async function updateSettings(req: Request, res: Response) {
  try {
    const data = req.body
    const current = fs.existsSync(settingsPath) ? JSON.parse(fs.readFileSync(settingsPath, 'utf8')) : {}
    const updated = { ...current, ...data }
    
    fs.mkdirSync(path.dirname(settingsPath), { recursive: true })
    fs.writeFileSync(settingsPath, JSON.stringify(updated, null, 2))
    
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: 'Error saving settings' })
  }
}
