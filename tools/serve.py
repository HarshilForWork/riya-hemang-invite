"""Local server for this site: Python's http.server plus the one rewrite in vercel.json.

    python tools/serve.py [port]      (default 5182; works from any folder)

Like on Vercel, /riya serves index.html (Riya's link: her family as the contacts), and /riya/ redirects to /riya
(vercel.json has "trailingSlash": false). Everything else is plain http.server.
"""
import functools
import http.server
import os
import sys
import urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REWRITES = {"/riya": "/index.html"}  # keep in step with "rewrites" in vercel.json


class Handler(http.server.SimpleHTTPRequestHandler):
    def _route(self):
        """Apply the redirect/rewrite. Returns True when a redirect was sent."""
        url = urllib.parse.urlsplit(self.path)
        query = "?" + url.query if url.query else ""
        if url.path != "/" and url.path.endswith("/") and url.path.rstrip("/") in REWRITES:
            self.send_response(308)
            self.send_header("Location", url.path.rstrip("/") + query)
            self.end_headers()
            return True
        if url.path in REWRITES:
            self.path = REWRITES[url.path] + query
        return False

    def do_GET(self):
        if not self._route():
            super().do_GET()

    def do_HEAD(self):
        if not self._route():
            super().do_HEAD()


class Server(http.server.ThreadingHTTPServer):
    # On Windows, SO_REUSEADDR lets a second server bind a port that's already in use, and the two then
    # share requests at random. Fail with "address in use" instead.
    allow_reuse_address = sys.platform != "win32"


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5182
    server = Server(("", port), functools.partial(Handler, directory=ROOT))
    print(f"Serving {ROOT} on http://localhost:{port}/  (Riya's link: http://localhost:{port}/riya)")
    server.serve_forever()
