import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
    try {
        const wasmPath = params.path.join("/")

        // Fetch the WASM file from CDN
        const wasmUrl = `https://cdn.jsdelivr.net/npm/scichart@3.4.615/_wasm/${wasmPath}`
        const response = await fetch(wasmUrl)

        if (!response.ok) {
            return new NextResponse("WASM file not found", { status: 404 })
        }

        const wasmBuffer = await response.arrayBuffer()

        return new NextResponse(wasmBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/wasm",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cross-Origin-Opener-Policy": "same-origin",
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        })
    } catch (error) {
        console.error("Error serving WASM file:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
