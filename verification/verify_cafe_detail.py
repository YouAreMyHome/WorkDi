from playwright.sync_api import sync_playwright

def verify_cafe_detail():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use mobile viewport
        context = browser.new_context(viewport={'width': 390, 'height': 844})
        page = context.new_page()

        print("Navigating directly to Cafe 1...")
        try:
            page.goto("http://localhost:3000/cafe/1", timeout=60000)
        except Exception as e:
            print(f"Navigation failed: {e}")
            return

        print("Waiting for page load...")
        # Wait for something simple
        page.wait_for_load_state("networkidle")

        print("Page content length:", len(page.content()))

        print("Taking screenshot...")
        page.screenshot(path="verification/cafe_detail.png", full_page=True)

        print("Navigating to Map Page...")
        page.goto("http://localhost:3000/map")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/map_view.png")

        browser.close()

if __name__ == "__main__":
    verify_cafe_detail()
