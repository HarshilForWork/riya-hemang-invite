import Foundation
import ImageIO
import UniformTypeIdentifiers

// Usage: swift upright.swift <srcDir> <outDir> <name>...
// Re-encodes each <srcDir>/<name>.* as <outDir>/<name>.jpg with the rotation baked into the pixels
// (no orientation tag left), longest side 1600px.
let args = CommandLine.arguments
let srcDir = URL(fileURLWithPath: args[1])
let outDir = URL(fileURLWithPath: args[2])
let names = Array(args.dropFirst(3))
let all = try FileManager.default.contentsOfDirectory(atPath: srcDir.path)

for name in names {
    guard let file = all.first(where: { ($0 as NSString).deletingPathExtension == name }) else {
        print("missing \(name)"); continue
    }
    let url = srcDir.appendingPathComponent(file)
    guard let src = CGImageSourceCreateWithURL(url as CFURL, nil) else { print("unreadable \(name)"); continue }
    let props = CGImageSourceCopyPropertiesAtIndex(src, 0, nil) as? [CFString: Any]
    let orient = props?[kCGImagePropertyOrientation] as? Int ?? 1
    let opts: [CFString: Any] = [
        kCGImageSourceCreateThumbnailFromImageAlways: true,
        kCGImageSourceCreateThumbnailWithTransform: true,
        kCGImageSourceThumbnailMaxPixelSize: 1600,
    ]
    guard let img = CGImageSourceCreateThumbnailAtIndex(src, 0, opts as CFDictionary) else { print("fail \(name)"); continue }
    let out = outDir.appendingPathComponent("\(name).jpg")
    guard let dest = CGImageDestinationCreateWithURL(out as CFURL, UTType.jpeg.identifier as CFString, 1, nil) else { continue }
    CGImageDestinationAddImage(dest, img, [kCGImageDestinationLossyCompressionQuality: 0.78] as CFDictionary)
    CGImageDestinationFinalize(dest)
    print("\(name) orient=\(orient) -> \(img.width)x\(img.height)")
}
