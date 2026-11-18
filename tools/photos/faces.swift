import Foundation
import Vision
import ImageIO

// Usage: swift faces.swift <dir>  -> prints JSON {name: {w,h,faces:[[x0,y0,x1,y1]...]}} with top-left normalized coords
let dir = CommandLine.arguments[1]
let files = try FileManager.default.contentsOfDirectory(atPath: dir).filter { $0.hasSuffix(".jpg") }.sorted()
var out: [String: Any] = [:]
for f in files {
    let url = URL(fileURLWithPath: dir).appendingPathComponent(f)
    guard let src = CGImageSourceCreateWithURL(url as CFURL, nil),
          let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else { continue }
    let req = VNDetectFaceRectanglesRequest()
    let body = VNDetectHumanRectanglesRequest()
    body.upperBodyOnly = false
    let handler = VNImageRequestHandler(cgImage: img, orientation: .up, options: [:])
    try? handler.perform([req, body])
    let people = (body.results ?? []).filter { $0.confidence > 0.3 }.map { o -> [Double] in
        let b = o.boundingBox
        return [b.minX, 1 - b.maxY, b.maxX, 1 - b.minY].map { (Double($0) * 1000).rounded() / 1000 }
    }
    let faces = (req.results ?? []).filter { $0.confidence > 0.5 }.map { o -> [Double] in
        let b = o.boundingBox
        return [b.minX, 1 - b.maxY, b.maxX, 1 - b.minY].map { (Double($0) * 1000).rounded() / 1000 }
    }
    out[String(f.dropLast(4))] = ["w": img.width, "h": img.height, "faces": faces, "people": people]
}
let data = try JSONSerialization.data(withJSONObject: out, options: [.sortedKeys])
print(String(data: data, encoding: .utf8)!)
