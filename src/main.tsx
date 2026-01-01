import ReactDOM from "react-dom/client"
import { App } from "@/components/App"
import "./globals.css"
import { assert } from "tsafe"

const rootElement = document.getElementById("root")
assert(rootElement, "Root element not found")

ReactDOM.createRoot(rootElement).render(<App />)
