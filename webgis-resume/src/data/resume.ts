import type { GeoLocation, Profile, Publication, Skill } from '@/types/resume'

export const profile: Profile = {
  name: 'Zhongguan Wen',
  title: 'Master Student · Geospatial AI & Remote Sensing',
  email: 'ryan.wen@stu.pku.edu.cn',
  summary:
    'A Master Student specializing in Atmospheric Remote Sensing and Environmental Health',
  orcid: '0009-0003-6700-9122',
  github: 'ggznhy',
}

export const locations: GeoLocation[] = [
  {
    id: 'pku',
    name: 'Peking University',
    institution: 'College of Environmental Sciences and Engineering',
    type: 'education',
    // WGS-84 [longitude, latitude]
    coordinates: [116.3042806, 39.9905278],
    period: '2024 – Present',
    description:
      'M.S. in Environmental Health. Thesis on Remote Sensing of Cloud',
    tags: ['M.S.', 'Remote Sensing', 'Environmental Health'],
  },
  {
    id: 'yzu',
    name: 'Yangtze University',
    institution: 'School of Geosciences · Wuhan Campus',
    type: 'education',
    // WGS-84 [longitude, latitude] — 武汉市蔡甸区大学路111号
    coordinates: [114.0231917, 30.5316583],
    period: '2019 – 2023',
    description:
      'B.S. in Geographical Information Science (Wuhan Campus). Thesis on Spatial-Temporal Fusion of Remote Sensing and Infrared Remote Sensing',
    tags: ['B.S.', 'GIS', 'Computer Science'],
  },
]

export const publications: Publication[] = [
  {
    id: 'pub1',
    title: 'Research on Agricultural and Animal Husbandry Ecological Evolution in North China Based on Computer Machine Learning and GIS Spatial Analysis',
    venue: '2024 International Conference on Power, Electrical Engineering, Electronics and Control (PEEEC)',
    year: 2024,
    citations: 0,
    doi: '10.1109/PEEEC63877.2024.00208',
  },
  {
    id: 'pub2',
    title: 'Comparison of gap-filling methods for generating landsat-like land surface temperatures under all-weather conditions',
    venue: 'ISPRS Journal of Photogrammetry and Remote Sensing',
    year: 2025,
    citations: 5,
    doi: '10.1016/j.isprsjprs.2025.04.029',
  },
]

export const skills: Skill[] = [
  { name: 'MapLibre GL / Leaflet / OpenLayers', level: 95, category: 'gis' },
  { name: 'PostGIS & GeoServer', level: 88, category: 'gis' },
  { name: 'GDAL / Rasterio / GeoPandas', level: 92, category: 'gis' },
  { name: 'Sentinel Hub / Google Earth Engine', level: 85, category: 'remote-sensing' },
  { name: 'PyTorch / TensorFlow (GeoAI)', level: 80, category: 'remote-sensing' },
  { name: 'Vue 3 / TypeScript / Vite', level: 90, category: 'programming' },
  { name: 'Python / R / SQL', level: 93, category: 'programming' },
  { name: 'Spatial Statistics & ML', level: 87, category: 'analysis' },
]

export const mapStyles = {
  streets: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  voyager: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
} as const

export type MapStyleKey = keyof typeof mapStyles

export const typeColors: Record<GeoLocation['type'], string> = {
  education: '#0d9488',
  research: '#6366f1',
  conference: '#f59e0b',
  fieldwork: '#ef4444',
}

export const typeLabels: Record<GeoLocation['type'], string> = {
  education: 'Education',
  research: 'Research',
  conference: 'Conference',
  fieldwork: 'Fieldwork',
}
