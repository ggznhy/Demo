import {
  Cartesian2,
  Cartesian3,
  CloudCollection,
  Color,
  EllipsoidTerrainProvider,
  ImageryLayer,
  Ion,
  JulianDate,
  Math as CesiumMath,
  OpenStreetMapImageryProvider,
  Viewer,
} from 'cesium'
import { locations, pkuCenter, skyCloudSpecs } from '@/data/resume'
import type { CloudSpec } from '@/types/resume'

export interface ManagedCloud {
  spec: CloudSpec
  cloud: ReturnType<CloudCollection['add']>
  baseLon: number
  baseLat: number
}

export interface CesiumSceneContext {
  viewer: Viewer
  cloudCollection: CloudCollection
  managedClouds: ManagedCloud[]
  removeTickListener: () => void
}

const ionToken = import.meta.env.VITE_CESIUM_ION_TOKEN
if (ionToken) {
  Ion.defaultAccessToken = ionToken
}

export async function createCesiumViewer(container: HTMLElement): Promise<CesiumSceneContext> {
  const viewer = new Viewer(container, {
    animation: false,
    timeline: false,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: true,
    sceneModePicker: true,
    navigationHelpButton: false,
    fullscreenButton: true,
    vrButton: false,
    infoBox: true,
    selectionIndicator: true,
    terrainProvider: new EllipsoidTerrainProvider(),
    baseLayer: new ImageryLayer(
      new OpenStreetMapImageryProvider({
        url: 'https://tile.openstreetmap.org/',
      }),
    ),
  })

  viewer.scene.globe.enableLighting = true
  if (viewer.scene.skyAtmosphere) {
    viewer.scene.skyAtmosphere.show = true
  }
  viewer.scene.fog.enabled = true
  viewer.scene.fog.density = 0.00015
  viewer.scene.highDynamicRange = true

  viewer.clock.currentTime = JulianDate.now()
  viewer.clock.shouldAnimate = true

  if (ionToken) {
    try {
      const { createWorldTerrainAsync, createOsmBuildingsAsync } = await import('cesium')
      viewer.terrainProvider = await createWorldTerrainAsync()
      const buildings = await createOsmBuildingsAsync()
      viewer.scene.primitives.add(buildings)
    } catch {
      // Fall back to ellipsoid terrain + OSM imagery when Ion assets are unavailable.
    }
  }

  addCampusEntities(viewer)
  addLocationEntities(viewer)

  const cloudCollection = new CloudCollection()
  viewer.scene.primitives.add(cloudCollection)

  const managedClouds = skyCloudSpecs.map((spec) => {
    const baseLon = pkuCenter[0] + spec.offsetLon
    const baseLat = pkuCenter[1] + spec.offsetLat
    const cloud = cloudCollection.add({
      show: true,
      position: Cartesian3.fromDegrees(baseLon, baseLat, spec.height),
      scale: new Cartesian2(spec.scaleX, spec.scaleY),
      maximumSize: new Cartesian3(28, 14, 16),
      slice: spec.slice,
      brightness: 1.05,
    })
    return { spec, cloud, baseLon, baseLat }
  })

  const removeTickListener = startCloudDrift(viewer, managedClouds)

  return { viewer, cloudCollection, managedClouds, removeTickListener }
}

function addCampusEntities(viewer: Viewer) {
  const [lon, lat] = pkuCenter

  viewer.entities.add({
    id: 'pku-campus',
    name: 'Peking University Campus',
    position: Cartesian3.fromDegrees(lon, lat, 0),
    ellipse: {
      semiMajorAxis: 850,
      semiMinorAxis: 650,
      material: Color.fromCssColorString('#0d9488').withAlpha(0.18),
      outline: true,
      outlineColor: Color.fromCssColorString('#5eead4').withAlpha(0.55),
      outlineWidth: 2,
      height: 0,
    },
    label: {
      text: 'Peking University\n北大 · Wudaokou',
      font: '600 15px "DM Sans", sans-serif',
      fillColor: Color.WHITE,
      outlineColor: Color.fromCssColorString('#042f2e'),
      outlineWidth: 3,
      style: 0,
      verticalOrigin: 1,
      pixelOffset: new Cartesian2(0, -28),
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
    },
  })
}

function addLocationEntities(viewer: Viewer) {
  for (const location of locations) {
    const [lon, lat] = location.coordinates
    viewer.entities.add({
      id: location.id,
      name: location.name,
      position: Cartesian3.fromDegrees(lon, lat, 0),
      point: {
        pixelSize: location.id === 'pku' ? 16 : 12,
        color: Color.fromCssColorString(location.id === 'pku' ? '#5eead4' : '#94a3b8'),
        outlineColor: Color.WHITE,
        outlineWidth: 2,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
      label: {
        text: location.name,
        font: '500 13px "DM Sans", sans-serif',
        fillColor: Color.WHITE,
        outlineColor: Color.fromCssColorString('#0f172a'),
        outlineWidth: 2,
        style: 0,
        verticalOrigin: 1,
        pixelOffset: new Cartesian2(0, -18),
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        show: location.id === 'pku',
      },
      description: `
        <div style="font-family: system-ui, sans-serif; max-width: 280px;">
          <p style="margin: 0 0 6px; color: #5eead4; font-weight: 600;">${location.institution ?? ''}</p>
          <p style="margin: 0 0 6px; font-size: 12px; color: #94a3b8;">${location.period}</p>
          <p style="margin: 0; font-size: 13px; line-height: 1.5;">${location.description}</p>
        </div>
      `,
    })
  }
}

function startCloudDrift(viewer: Viewer, managedClouds: ManagedCloud[]) {
  const tick = () => {
    const t = JulianDate.toDate(viewer.clock.currentTime).getTime() / 1000
    for (const { spec, cloud, baseLon, baseLat } of managedClouds) {
      const lon = baseLon + Math.sin(t * spec.driftSpeed * 800) * 0.004
      const lat = baseLat + Math.cos(t * spec.driftSpeed * 600) * 0.002
      cloud.position = Cartesian3.fromDegrees(lon, lat, spec.height)
    }
  }

  viewer.clock.onTick.addEventListener(tick)
  return () => viewer.clock.onTick.removeEventListener(tick)
}

export function flyToLocation(viewer: Viewer, lon: number, lat: number, highlightSky = false) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(lon, lat, highlightSky ? 3200 : 1800),
    orientation: {
      heading: CesiumMath.toRadians(15),
      pitch: CesiumMath.toRadians(highlightSky ? -18 : -45),
      roll: 0,
    },
    duration: 2.4,
  })
}

export function flyToPkuSky(viewer: Viewer) {
  const [lon, lat] = pkuCenter
  flyToLocation(viewer, lon, lat, true)
}

export function setCloudsVisible(cloudCollection: CloudCollection, visible: boolean) {
  cloudCollection.show = visible
}

export function setCloudDensity(managedClouds: ManagedCloud[], density: number) {
  const count = Math.max(1, Math.round((density / 100) * managedClouds.length))
  managedClouds.forEach((entry, index) => {
    entry.cloud.show = index < count
  })
}

export function setTimeOfDay(viewer: Viewer, hour: number) {
  const date = new Date()
  date.setHours(hour, 30, 0, 0)
  viewer.clock.currentTime = JulianDate.fromDate(date)
}
