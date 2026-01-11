import { createOptionalContext, useService } from "@/utils/providerish/serviceHooks"

import { type Clock } from "./Clock"

export interface GlobalDependencies {
  clock: Clock
}

export const GlobalDependenciesContext = createOptionalContext<GlobalDependencies>()

export const useGlobalDependencies = (): GlobalDependencies => useService(GlobalDependenciesContext)

export const useClock = (): Clock => useGlobalDependencies().clock
