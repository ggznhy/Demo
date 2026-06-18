export type LocationType = 'education' | 'research' | 'conference' | 'fieldwork'

export interface GeoLocation {
  id: string
  name: string
  institution?: string
  type: LocationType
  coordinates: [number, number]
  period: string
  description: string
  tags: string[]
}

export interface Publication {
  id: string
  title: string
  venue: string
  year: number
  citations?: number
  doi?: string
}

export interface Skill {
  name: string
  level: number
  category: 'gis' | 'remote-sensing' | 'programming' | 'analysis'
}

export interface Profile {
  name: string
  title: string
  email: string
  summary: string
  orcid?: string
  github?: string
}

export interface CloudSpec {
  id: string
  offsetLon: number
  offsetLat: number
  height: number
  scaleX: number
  scaleY: number
  slice: number
  driftSpeed: number
}
