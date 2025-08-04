import { SciChartSurface } from "scichart"

// SciChart license configuration with better error handling
export const initializeSciChart = async () => {
  try {
    // For development, SciChart works without a license key (with watermark)
    if (process.env.NODE_ENV === "development") {
      console.log("SciChart running in development mode with watermark")
    } else {
      // Production mode - set your license key
      const licenseKey = process.env.NEXT_PUBLIC_SCICHART_LICENSE_KEY
      if (licenseKey) {
        SciChartSurface.setRuntimeLicenseKey(licenseKey)
      } else {
        console.warn("SciChart license key not found. Charts will show watermark.")
      }
    }

    // Configure SciChart with multiple fallback options
    try {
      // Try CDN first (more reliable)
      SciChartSurface.configure({
        wasmUrl: "https://cdn.jsdelivr.net/npm/scichart@3.4.615/_wasm/scichart2d.wasm",
        dataUrl: "https://cdn.jsdelivr.net/npm/scichart@3.4.615/_wasm/scichart2d.data",
      })
      console.log("SciChart configured with CDN WASM files")
    } catch (cdnError) {
      console.warn("CDN WASM failed, trying local:", cdnError)
      try {
        // Fallback to local WASM
        SciChartSurface.configure({
          wasmUrl: "/_next/static/chunks/scichart2d.wasm",
          dataUrl: "/_next/static/chunks/scichart2d.data",
        })
        console.log("SciChart configured with local WASM files")
      } catch (localError) {
        console.error("Both CDN and local WASM failed:", localError)
        throw new Error("Failed to configure SciChart WASM")
      }
    }

    return true
  } catch (error) {
    console.error("Failed to initialize SciChart:", error)
    return false
  }
}

// Chart theme configuration
export const getChartTheme = (isDark: boolean) => ({
  sciChartBackground: isDark ? "#1a1a1a" : "#ffffff",
  plotAreaBackground: isDark ? "#1a1a1a" : "#ffffff",
  majorGridLineColor: isDark ? "#333333" : "#e5e5e5",
  minorGridLineColor: isDark ? "#2a2a2a" : "#f0f0f0",
  textColor: isDark ? "#ffffff" : "#000000",
  axisColor: isDark ? "#666666" : "#999999",
})

// Enhanced error handling for different error types
export const handleChartError = (error: any) => {
  const errorMessage = error?.message || error?.toString() || "Unknown error"

  if (errorMessage.includes("Content Security Policy")) {
    console.error("CSP blocked SciChart loading. Check your Content Security Policy settings.")
    return "CSP_ERROR"
  }
  if (errorMessage.includes("WASM") || errorMessage.includes("WebAssembly")) {
    console.error("WASM loading failed. This might be due to MIME type or CSP issues.")
    return "WASM_ERROR"
  }
  if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
    console.error("Network error loading SciChart resources.")
    return "NETWORK_ERROR"
  }
  if (errorMessage.includes("timeout")) {
    console.error("Timeout loading SciChart resources.")
    return "TIMEOUT_ERROR"
  }

  console.error("Unknown SciChart error:", error)
  return "UNKNOWN_ERROR"
}

// Fallback chart data generator
export const generateMockChartData = () => {
  const timeSeriesData = []
  const startDate = new Date(2024, 0, 1)
  let price = 100

  for (let i = 0; i < 50; i++) {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
    price += (Math.random() - 0.5) * 5
    timeSeriesData.push({
      date: date.toLocaleDateString(),
      price: price.toFixed(2),
      change: ((Math.random() - 0.5) * 2).toFixed(2),
    })
  }

  return timeSeriesData
}
