import "./globals.css"

import ReactDOM from "react-dom/client"
import { assert } from "tsafe"

import { App } from "@/components/App"

const rootElement = document.getElementById("root")
assert(rootElement, "Root element not found")

ReactDOM.createRoot(rootElement).render(<App />)
