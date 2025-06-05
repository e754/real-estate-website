import fs from "fs"
import path from "path"
import type { Property } from "@/types/property"

// In a real application, you would use a database instead of a JSON file
const DATA_FILE_PATH = path.join(process.cwd(), "data", "properties.json")

// Generate a simple ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Ensure the data directory exists
const ensureDataDir = () => {
  const dir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Read properties from the JSON file
export async function getProperties(): Promise<Property[]> {
  ensureDataDir()

  if (!fs.existsSync(DATA_FILE_PATH)) {
    return []
  }

  const data = await fs.promises.readFile(DATA_FILE_PATH, "utf8")
  return JSON.parse(data)
}

// Get a single property by ID
export async function getPropertyById(id: string): Promise<Property | null> {
  const properties = await getProperties()
  return properties.find((property) => property.id === id) || null
}

// Create a new property
export async function createProperty(propertyData: Omit<Property, "id">): Promise<Property> {
  const properties = await getProperties()

  const newProperty: Property = {
    id: generateId(),
    ...propertyData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  properties.push(newProperty)
  await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(properties, null, 2))

  return newProperty
}

// Update an existing property
export async function updateProperty(id: string, propertyData: Partial<Property>): Promise<Property | null> {
  const properties = await getProperties()
  const index = properties.findIndex((property) => property.id === id)

  if (index === -1) {
    return null
  }

  const updatedProperty = {
    ...properties[index],
    ...propertyData,
    updatedAt: new Date().toISOString(),
  }

  properties[index] = updatedProperty
  await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(properties, null, 2))

  return updatedProperty
}

// Delete a property
export async function deleteProperty(id: string): Promise<boolean> {
  const properties = await getProperties()
  const filteredProperties = properties.filter((property) => property.id !== id)

  if (filteredProperties.length === properties.length) {
    return false
  }

  await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(filteredProperties, null, 2))
  return true
}
