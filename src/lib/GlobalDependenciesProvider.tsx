import { type ReactNode } from "react"
import { GlobalDependenciesContext, type GlobalDependencies } from "./GlobalDependencies"

interface GlobalDependenciesProviderProps {
  dependencies: GlobalDependencies
  children: ReactNode
}

export const GlobalDependenciesProvider = ({ dependencies, children }: GlobalDependenciesProviderProps) => (
  <GlobalDependenciesContext.Provider value={dependencies}>{children}</GlobalDependenciesContext.Provider>
)
